import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import api from "../api/client";
import { Bathroom } from "../types";
import { AuthUser } from "../context/AuthContext";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

interface Props {
  bathrooms: Bathroom[];
  selectedId?: string | null;
  onSelect: (bathroom: Bathroom) => void;
  user: AuthUser | null;
  onRequireAuth: () => void;
  onRefresh: () => void;
}

const FlyToBathroom: React.FC<{ bathroom?: Bathroom }> = ({ bathroom }) => {
  const map = useMap();
  useEffect(() => {
    if (bathroom) map.flyTo([bathroom.location.lat, bathroom.location.lng], 17, { duration: 0.6 });
  }, [bathroom, map]);
  return null;
};

const MapView: React.FC<Props> = ({ bathrooms, selectedId, onSelect, user, onRequireAuth, onRefresh }) => {
  const [ratingDraft, setRatingDraft] = useState<Record<string, number>>({});

  const selectedBathroom = useMemo(
    () => bathrooms.find((b) => b._id === selectedId),
    [bathrooms, selectedId]
  );

  const submitRating = async (bathroom: Bathroom) => {
    if (!user) {
      onRequireAuth();
      return;
    }
    const stars = ratingDraft[bathroom._id] ?? 5;
    try {
      await api.post("/ratings", { bathroomId: bathroom._id, stars });
      onRefresh();
    } catch (err) {
      console.error("Failed to submit rating", err);
    }
  };

  const center: [number, number] = selectedBathroom
    ? [selectedBathroom.location.lat, selectedBathroom.location.lng]
    : [43.4723, -80.5449];

  return (
    <div className="panel mapbox">
      <div className="panel-header">
        <div className="card-title">Campus Map</div>
        <div className="muted">Tap a marker to rate</div>
      </div>
      <div className="map-wrapper">
        <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }}>
          <FlyToBathroom bathroom={selectedBathroom} />
          <TileLayer
            attribution='&copy; OpenStreetMap contributors, &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {bathrooms.map((bathroom) => (
            <Marker
              key={bathroom._id}
              position={[bathroom.location.lat, bathroom.location.lng]}
              eventHandlers={{ click: () => onSelect(bathroom) }}
            >
              <Popup>
                <div style={{ minWidth: 220 }}>
                  <div style={{ fontWeight: 800 }}>{bathroom.name}</div>
                  <div className="muted">
                    {bathroom.buildingName} · {bathroom.buildingCode}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    {(bathroom.avgRating ?? 0).toFixed(1)} ⭐ ({bathroom.ratingCount ?? 0} ratings)
                  </div>
                  <div className="popup-rating">
                    <span className="muted">Your rating:</span>
                    <select
                      value={ratingDraft[bathroom._id] ?? 5}
                      onChange={(e) =>
                        setRatingDraft((prev) => ({ ...prev, [bathroom._id]: Number(e.target.value) }))
                      }
                    >
                      {[0, 1, 2, 3, 4, 5].map((v) => (
                        <option value={v} key={v}>
                          {v} ⭐
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: 10, width: "100%" }}
                    onClick={() => submitRating(bathroom)}
                  >
                    Submit rating
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
