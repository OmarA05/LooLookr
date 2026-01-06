import { Bathroom } from "../types";

interface Props {
  bathrooms: Bathroom[];
  onSelect: (bathroom: Bathroom) => void;
}

const LeaderboardPanel: React.FC<Props> = ({ bathrooms, onSelect }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="card-title">Leaderboard</div>
        <div className="muted">Top 10</div>
      </div>
      <ul className="leaderboard-list">
        {bathrooms.map((bathroom, idx) => (
          <li
            key={bathroom._id}
            className="leaderboard-item"
            onClick={() => onSelect(bathroom)}
            role="button"
          >
            <div className="rank">{idx + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800 }}>{bathroom.name}</div>
              <div className="muted">
                {bathroom.buildingName} · {bathroom.buildingCode}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800 }}>
                {(bathroom.avgRating ?? 0).toFixed(1)} ⭐
              </div>
              <div className="muted">{bathroom.ratingCount ?? 0} ratings</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardPanel;
