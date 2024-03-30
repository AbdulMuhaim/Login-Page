import { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

const locations = [
//   { latitude: 12.9716, longitude: 77.5946, name: 'Bangalore' },
  { latitude: 10.0159, longitude: 76.3419, name: 'Kochi' },
//   { latitude: 11.2588, longitude: 75.7804, name: 'Calicut' },
//   { latitude: 13.0827, longitude: 80.2707, name: 'Chennai' },
];

const MapComponent = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibXVoYWltMjUiLCJhIjoiY2xua2dyMm5oMGwxYjJycnp1anFlaGQ2ZCJ9.YmYBTuY9ozBqujUmiUa-Kw';

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [locations[0].longitude, locations[0].latitude],
      zoom: 11, 
    });

    locations.forEach(location => {
      new mapboxgl.Marker({ color: 'red' }).setLngLat([location.longitude, location.latitude]).addTo(map);
    });

    return () => map.remove();
  }, [locations]);

  return (
    <div className="relative w-full">
      <div id="map-container" className="h-[50vh]"></div>
    </div>
  );
};

const YourComponent = () => {
  return (
    <div className="flex justify-center items-center p-2 lg:p-6">
      <MapComponent locations={locations} />
    </div>
  );
};

export default YourComponent;