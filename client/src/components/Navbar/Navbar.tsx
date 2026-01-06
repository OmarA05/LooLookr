import { useMemo } from "react";
import { AuthUser } from "../../context/AuthContext";

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  user: AuthUser | null;
}

const Navbar: React.FC<Props> = ({ query, onQueryChange, onLogin, onRegister, onLogout, user }) => {
  const initials = useMemo(() => user?.email?.[0]?.toUpperCase() ?? "U", [user]);

  return (
    <nav className="nav">
      <div className="logo">
        <div className="logo-badge">🧻</div>
        <div>loolookr</div>
      </div>
      <div className="search">
        <span role="img" aria-label="search">
          🔍
        </span>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search building or bathroom..."
        />
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "8px 12px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.14)",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                }}
              >
                {initials}
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{user.username ?? "User"}</span>
                <span style={{ color: "#9ca3af", fontSize: 12 }}>{user.email}</span>
              </div>
            </div>
            <button className="btn btn-ghost" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={onLogin}>
              Login
            </button>
            <button className="btn btn-primary" onClick={onRegister}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
