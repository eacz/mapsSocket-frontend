import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import useMapbox from '../hooks/useMapbox';

const initalPosition = {
  lng: -58.9855,
  lat: -27.4491,
  zoom: 15
}

const MapPage = () => {
  const { coords, setRef, newMarker$, markerMovement$ } = useMapbox(initalPosition)
  const { socket } = useContext(SocketContext)
  
  //TODO BIG: move all this on a custom hooks
  useEffect(() => {
    newMarker$.subscribe(marker => {
      socket.emit('new-marker', marker)
    })
    return () => newMarker$.unsubscribe()
  }, [newMarker$, socket])
  
  useEffect(() => {
    markerMovement$.subscribe(marker => {
      console.log(marker);
      //TODO: emit marker position change socket event
    })
    return () => markerMovement$.unsubscribe()
  }, [markerMovement$])

  // listening on new-marker event
  useEffect(() => {
    socket.on('new-marker', marker => {
      console.log(marker);
    })
  }, [socket])

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
