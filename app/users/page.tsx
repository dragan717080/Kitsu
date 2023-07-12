'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Users: FC = () => {

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };
  return (
    <button onClick={handleSignOut}>Logout</button>
  )
}

export default Users;
