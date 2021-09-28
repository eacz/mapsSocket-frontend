import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import useMapbox from '../hooks/useMapbox';
import useMapboxSocketEvents from '../hooks/useMapboxSocketEvents';

const initalPosition = {
  lng: -58.9855,
  lat: -27.4491,
  zoom: 15
}

const MapPage = () => {
  const { coords, setRef, addMarker, newMarker$, markerMovement$, updateMarkersPosition } = useMapbox(initalPosition)
  const { socket } = useContext(SocketContext)
  useMapboxSocketEvents(addMarker, newMarker$, markerMovement$, updateMarkersPosition, socket)
  
  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div 
        ref={setRef}
        className="mapContainer"
      />
    </>
  )
}

export default MapPage
