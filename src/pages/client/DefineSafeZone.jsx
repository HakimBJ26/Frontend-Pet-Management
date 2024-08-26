import React, { useState, useContext } from "react";
import PetService from "../../service/PetService";
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../maps.css";
import { MAP_ATTRIBUTION, MAP_URL } from '../../common/configuration/constants/MapsConstant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PetContext } from '../../context/PetContext'; 

const DefineSafeZone = () => {
  const { selectedPetId } = useContext(PetContext);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [safeZoneType, setSafeZoneType] = useState("HOME");
  function LocationMarker() {
    useMapEvents({  click(e) { setSelectedPosition(e.latlng);  }, });
    return selectedPosition ? (
      <Circle center={selectedPosition} radius={100} />
    ) : null; }

  const handleSaveZone = async () => {
    console.log("Selected Position:", selectedPosition);
    console.log("Safe Zone Type:", safeZoneType);
    console.log("Pet ID:", selectedPetId);

    if (!selectedPosition || !safeZoneType || !selectedPetId) {
      alert("Veuillez sélectionner une position, un type de zone de sécurité et vérifier que petId est défini.");
      return; }

    const safeZoneRequest = {
      type: safeZoneType,
      positionDto: { lat: selectedPosition.lat, lng: selectedPosition.lng } };

    try {
      const response = await PetService.addSinglePositionToSafeZone(selectedPetId, safeZoneRequest);
      toast.success("Safe zone added successfully!");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la zone de sécurité :", error);
      toast.error("Failed to add safe zone."); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Define your safe zone for your pet</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
        <label style={{ margin: "5px" }}>
          <input type="radio" value="HOME"
            checked={safeZoneType === "HOME"}
            onChange={(e) => setSafeZoneType(e.target.value)} />
          Home
        </label>
        <label>
          <input type="radio" value="VET"
            checked={safeZoneType === "VET"}
            onChange={(e) => setSafeZoneType(e.target.value)} />
          Vet
        </label>
        <label>
          <input type="radio" value="PARK"
            checked={safeZoneType === "PARK"}
            onChange={(e) => setSafeZoneType(e.target.value)} />
          Park
        </label>
      </div>
      <div className="left-offset right-offset leflet-map-container">
        <MapContainer center={[51.505, -0.09]} zoom={13} className="map-container-style-safe">
          <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
          <LocationMarker />
        </MapContainer>
      </div>
      <button onClick={handleSaveZone}>SAVE YOUR SAFE ZONE</button>
      <ToastContainer />
    </div>
  );
};
export default DefineSafeZone;
