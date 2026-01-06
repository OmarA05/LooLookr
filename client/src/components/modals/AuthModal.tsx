import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface Props {
  open: boolean;
  mode: "login" | "register";
  onClose: () => void;
  onSwitch: (mode: "login" | "register") => void;
}

const AuthModal: React.FC<Props> = ({ open, mode, onClose, onSwitch }) => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password, username);
      }
      onClose();
    } catch (err: any) {
      console.error("Auth error", err);
      const apiError = err?.response?.data?.error;
      if (typeof apiError === "string") {
        setError(apiError);
      } else if (apiError?.formErrors) {
        setError(apiError.formErrors.join(", "));
      } else {
        setError("Network or server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="tabs">
          <div className={`tab ${mode === "login" ? "active" : ""}`} onClick={() => onSwitch("login")}>
            Login
          </div>
          <div
            className={`tab ${mode === "register" ? "active" : ""}`}
            onClick={() => onSwitch("register")}
          >
            Register
          </div>
        </div>
        <h2>{mode === "login" ? "Welcome back" : "Join loolookr"}</h2>
        <p className="muted">Rate and track the best bathrooms on campus.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              className="input"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {mode === "register" && (
            <div className="form-row">
              <input
                className="input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="form-row">
            <input
              className="input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: "#f43f5e", marginTop: 8 }}>{error}</div>}
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 12 }} disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ width: "100%", marginTop: 8 }}
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
