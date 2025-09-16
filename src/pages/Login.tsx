import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabaseClient";

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
    if (!supabase) return setAuthError("Supabase is not configured.");

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

  const handleMagicLink = async () => {
    setAuthError("");
    if (!loginEmail) return setAuthError("Please enter your email.");
    if (!supabase) return setAuthError('Supabase not configured');

    const { error } = await supabase.auth.signInWithOtp({
      email: loginEmail,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });

    if (error) {
      setAuthError(error.message);
    } else {
      alert("Magic link sent. Check your email.");
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                className="bg-gradient-to-r from-space-blue to-space-cyan font-orbitron w-full"
                onClick={handleMagicLink}
              >
                Send Magic Link
              </Button>
              <Button
                variant="outline"
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">We’ll email you a sign-in link, or you can sign in with email + password.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
