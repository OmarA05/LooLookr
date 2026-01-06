interface Props {
  open: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Welcome to loolookr</h2>
        <p className="muted">
          Discover the most reliable bathrooms on campus, rate your favorites, and see the leaderboard in
          real time.
        </p>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 12 }} onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
