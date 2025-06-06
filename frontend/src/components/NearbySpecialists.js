import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Card } from "react-bootstrap";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "10px",
  marginTop: "20px"
};

const centerDefault = {
  lat: 33.6844,  // Fallback: Islamabad
  lng: 73.0479
};

const libraries = ["places"];

function NearbySpecialists() {
  const [userLocation, setUserLocation] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCpcZY6olMd9FwTZUcIZDL9TX0_2C7plco", // ✅ REPLACE THIS
    libraries
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        getNearbyClinics(latitude, longitude);
      },
      () => {
        alert("Location permission denied. Using default location.");
        setUserLocation(centerDefault);
        getNearbyClinics(centerDefault.lat, centerDefault.lng);
      }
    );
  }, []);

  const getNearbyClinics = (lat, lng) => {
    const service = new window.google.maps.places.PlacesService(document.createElement("div"));
    const request = {
      location: { lat, lng },
      radius: 5000,
      keyword: "physiotherapist clinic"
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setClinics(results);
      }
    });
  };

  if (loadError) return <p>Map failed to load</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <Card className="p-3 mt-4 shadow-sm">
      <h5>📍 Nearby Physiotherapists / Clinics</h5>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || centerDefault}
        zoom={13}
      >
        {clinics.map((place, idx) => (
          <Marker
            key={idx}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }}
            onClick={() => setSelected(place)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{
              lat: selected.geometry.location.lat(),
              lng: selected.geometry.location.lng()
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <strong>{selected.name}</strong>
              <br />
              <small>{selected.vicinity}</small>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </Card>
  );
}

export default NearbySpecialists;
