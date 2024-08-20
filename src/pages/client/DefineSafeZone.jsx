import React, { useState, useEffect } from "react";
import PetService from "../../service/PetService";
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../maps.css";
const DefineSafeZone = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [safeZoneType, setSafeZoneType] = useState("HOME");
  const [petId, setPetId] = useState(null);


  useEffect(() => {
    const storedPetId = localStorage.getItem("petId");
    if (storedPetId) {
      setPetId(storedPetId);
    } else {
      console.error("Pet ID not found in localStorage"); }
  }, []);


  function LocationMarker() {
    useMapEvents({   click(e) {  setSelectedPosition(e.latlng); }, });
    return selectedPosition ? (<Circle center={selectedPosition} radius={100} />) : null; }

  const handleSaveZone = async () => {
    if (!selectedPosition || !safeZoneType || !petId) {
      alert("Veuillez sélectionner une position, un type de zone de sécurité et vérifier que petId est défini.");
      return;  }

    const safeZoneRequest = { type: safeZoneType, positionDto: {  lat: selectedPosition.lat, lng: selectedPosition.lng}  };
    try {
      const response = await PetService.addSinglePositionToSafeZone(petId, safeZoneRequest);
      console.log("Zone de sécurité enregistrée :", response);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la zone de sécurité :", error);
    }
  };
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", padding: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Define your safe zone for your pet</h2>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
            <label style={{ margin: "5px" }}>
              <input type="radio" value="HOME"
                checked={safeZoneType === "HOME"}
                onChange={(e) => setSafeZoneType(e.target.value)}/>
              Home
            </label>
            <label>
              <input type="radio" value="VET" checked={safeZoneType === "VET"}
                onChange={(e) => setSafeZoneType(e.target.value)} />
              Vet
            </label>
            <label>
              <input type="radio" value="PARK" checked={safeZoneType === "PARK"}
                onChange={(e) => setSafeZoneType(e.target.value)} />
              Park
            </label>
          </div>
            <div className="left-offset right-offset leflet-map-container ">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              className="map-container-style-safe">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
              <LocationMarker />
            </MapContainer>
          </div>
          <button onClick={handleSaveZone}>SAVE YOUR SAFE ZONE</button>
        </div>  );  };
export default DefineSafeZone;
