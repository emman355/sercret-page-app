'use client';
import { useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export const useSupabaseUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  // --- Fetch current user ---
  const fetchUser = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setUser(null);
      } else {
        setUser(data?.user ?? null);
      }
    } catch (err) {
      setError('Unexpected error fetching user:' + (err instanceof Error ? err.message : String(err)));
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUser();
      } else {
        setUser(null);
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchUser, supabase]);

  // --- Auth submit (login/register) ---
  const handleAuthSubmit = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setError(null);
      setIsLoading(true);

      try {
        if (isLoginView) {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error || !data.session) throw new Error(error?.message || 'Login failed. No session returned.');

          alert('Login successful!');
          await new Promise(resolve => setTimeout(resolve, 500));
          router.push('/');
          router.refresh();
        } else {
          const { data: { user }, error: signUpError } = await supabase.auth.signUp({ email, password });
          if (signUpError || !user) throw new Error(signUpError?.message || 'Sign-up failed. No user returned.');

          const response = await fetch('/api/users', { method: 'POST' });
          const result = await response.json();
          if (!response.ok || !result.success) throw new Error(result.message || 'Failed to register account.');

          alert('Account registered successfully!');
          await new Promise(resolve => setTimeout(resolve, 500));
          router.push('/');
          router.refresh();
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error occurred.';
        setError(`Authentication failed: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoginView, supabase, router]
  );

  // --- OAuth login ---
const handleOAuthLogin = useCallback(
  async (provider: 'google' | 'github') => {
    alert(`Starting OAuth login with ${provider}...`);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setError(`OAuth failed: ${error.message}`);
      return;
    }

    // Wait for session after redirect
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
          });
          const result = await response.json();
          if (!response.ok || !result.success) throw new Error(result.message || 'Failed to register account.');

          alert('OAuth login successful!');
          router.push('/');
          router.refresh();
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error occurred.';
          setError(`OAuth registration failed: ${errorMessage}`);
        }
      }
    });
  },
  [supabase, router]
);

  return {
    user,
    loading,
    error,
    isLoginView,
    setIsLoginView,
    isLoading,
    handleAuthSubmit,
    handleOAuthLogin,
  };
};
