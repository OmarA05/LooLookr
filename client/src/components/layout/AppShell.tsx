import React from 'react';
import Navbar from './Navbar';

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--uw-dark)] text-white">
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default AppShell;
