import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getSupabase from "@/lib/supabaseClient";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setAuthError("");
    if (!loginEmail || !loginPassword) {
      return setAuthError("Please enter both email and password.");
    }
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setAuthError(error.message);
    } else if (data.session) {
      navigate("/admin");
    }
  };


  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <h1 className="text-4xl font-bold font-orbitron mb-6 bg-gradient-to-r from-space-blue to-space-cyan bg-clip-text text-transparent">Admin Login</h1>
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <label className="block text-sm">Email</label>
            <Input id="email" name="email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="you@example.com" />
            <label className="block text-sm">Password</label>
            <Input id="password" name="password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter your password" />
            {authError ? <p className="text-sm text-red-400">{authError}</p> : null}
            <Button
              className="bg-gradient-to-r from-space-blue to-space-cyan font-orbitron w-full"
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
