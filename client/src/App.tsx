import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import AuthModal from "./components/modals/AuthModal";
import WelcomeModal from "./components/modals/WelcomeModal";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("ll_welcome_seen");
    if (!seen) setShowWelcome(true);
  }, []);

  const closeWelcome = () => {
    localStorage.setItem("ll_welcome_seen", "1");
    setShowWelcome(false);
  };

  const openLogin = () => {
    setAuthMode("login");
    setAuthOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setAuthOpen(true);
  };

  return (
    <div className="app-shell">
      <Navbar
        query={query}
        onQueryChange={setQuery}
        onLogin={openLogin}
        onRegister={openRegister}
        onLogout={logout}
        user={user}
      />
      <Home query={query} onRequireAuth={openLogin} />
      <AuthModal open={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} onSwitch={setAuthMode} />
      <WelcomeModal open={showWelcome} onClose={closeWelcome} />
    </div>
  );
};

export default App;
