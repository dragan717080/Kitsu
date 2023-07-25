'use client';
import { FC, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Toolbar from './Toolbar';
import toolbarContent from '../../constants/ToolbarContent';
import { signOut } from 'next-auth/react';

const Navbar: FC = () => {

  const toggleToolbar = () => setIsOpen(!isOpen);

  const session = useSession();

  return (
    <>
      <nav className="bg-main t-main text-gray-500 h-30 px-14 flex">
        <div className="flex items-center w-full ">
          <button className="">☰</button>
          <a href="/" className="inline-h flex items-center">
            <Image height="28" width="32" alt="Logo" className="h-7 mx-auto" src="/images/kitsu-logo.png" />
            <div className="t-main u text-white text-2xl leading-10 tracking-wide mx-2">Kitsu</div>
          </a>
          <div className="inline-flex ml-5">
            {toolbarContent.map((item, index) => (
              <Toolbar key={index} {...item} />
            ))}
          </div>
          <div className="ml-auto">
            {session.status === 'authenticated'
              ? <div className='inline-flex'>
                <div className='t-red'>{session.data.user.name}</div>
                <button className='t-cornflowerblue ml-3' onClick={async () => await signOut()} >Logout</button>
              </div>
              : <a href='auth'>Login</a>
            }
          </div>
        </div>
      </nav >
    </>
  );
};

export default Navbar;
