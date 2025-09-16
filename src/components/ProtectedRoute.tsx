import { useEffect, useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import getSupabase from '@/lib/supabaseClient';
import { type Session } from '@supabase/supabase-js';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabase();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  const allowedAdmins = useMemo(() => ["readyupgsl@gmail.com"], []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const userEmail = session.user?.email;
  const isAuthorized = userEmail && allowedAdmins.includes(userEmail);

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
