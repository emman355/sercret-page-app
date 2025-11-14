'use client';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import AuthPage from '@/modules/auth-page';
import HomePage from '@/modules/home-page';
import Navbar from '@/components/navigation/Navbar';

const Page = () => {
  const { user, loading, error } = useSupabaseUser();

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return user && !error ? (
    <>
      <Navbar />
      <HomePage />
    </>
  ) : (
    <AuthPage />
  );
};

export default Page;
