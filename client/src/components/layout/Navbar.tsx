import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[var(--uw-black)] text-white border-b border-[var(--uw-gold)] z-40">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold uppercase tracking-[0.14em]">
          <span className="inline-block h-3 w-3 rounded-full bg-[var(--uw-gold)]" />
          loolookr
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="text-gray-200">{user.email}</span>
              <button
                onClick={logout}
                className="rounded-full border border-[var(--uw-gold)] px-3 py-1 text-[var(--uw-gold)] transition hover:bg-[var(--uw-gold)] hover:text-black"
              >
                Logout
              </button>
            </>
          ) : (
            !isAuthPage && (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="rounded-full border border-[var(--uw-gold)] px-3 py-1 text-[var(--uw-gold)] transition hover:bg-[var(--uw-gold)] hover:text-black"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-[var(--uw-gold)] px-3 py-1 text-black font-semibold transition hover:brightness-90"
                >
                  Register
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
