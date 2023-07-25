'use client';

import { FC, useState } from 'react';
import NavbarToolbarProps from '@/app/interfaces/props/NavbarToolbarProps';

const Toolbar: FC = ({ title, content, url}: NavbarToolbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="toolbar h-10 relative mr-6">
      <button className="button mt-2 hover-logo" onMouseEnter={toggleSubMenu} onMouseLeave={toggleSubMenu}>
        <a href={url ? url : `/${title.toLowerCase()}s`}>{title}</a>
      </button>
      {isOpen && (
        <div className="submenu bg-white mt-2 rounded-lg px-3.5 absolute whitespace-nowrap -ml-4">
          {content}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
