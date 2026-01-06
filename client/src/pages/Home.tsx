import { useEffect, useState } from "react";
import LeaderboardPanel from "../components/LeaderboardPanel";
import MapView from "../components/MapView";
import api from "../api/client";
import { Bathroom } from "../types";
import { useAuth } from "../context/AuthContext";

interface Props {
  query: string;
  onRequireAuth: () => void;
}

const Home: React.FC<Props> = ({ query, onRequireAuth }) => {
  const { user } = useAuth();
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
  const [topBathrooms, setTopBathrooms] = useState<Bathroom[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      const { data } = await api.get("/bathrooms", { params: { q: query || undefined } });
      setBathrooms(data.bathrooms);
    } catch (err) {
      console.error("Failed to load bathrooms", err);
    }
  };

  const fetchTop = async () => {
    try {
      const { data } = await api.get("/bathrooms/top10");
      setTopBathrooms(data.bathrooms);
    } catch (err) {
      console.error("Failed to load leaderboard", err);
    }
  };

  useEffect(() => {
    fetchTop();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [query]);

  const handleRefresh = () => {
    fetchAll();
    fetchTop();
  };

  const handleSelect = (bathroom: Bathroom) => {
    setSelectedId(bathroom._id);
  };

  return (
    <div className="layout">
      <LeaderboardPanel bathrooms={topBathrooms} onSelect={handleSelect} />
      <MapView
        bathrooms={bathrooms.length ? bathrooms : topBathrooms}
        selectedId={selectedId}
        onSelect={handleSelect}
        user={user}
        onRequireAuth={onRequireAuth}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default Home;
