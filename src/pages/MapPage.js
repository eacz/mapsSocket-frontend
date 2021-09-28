import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import useMapbox from '../hooks/useMapbox';

const initalPosition = {
  lng: -58.9855,
  lat: -27.4491,
  zoom: 15
}

const MapPage = () => {
  const { coords, setRef, addMarker, newMarker$, markerMovement$, updateMarkersPosition } = useMapbox(initalPosition)
  const { socket } = useContext(SocketContext)
  
  //TODO BIG: move all this on a custom hooks
  useEffect(() => {
    newMarker$.subscribe(marker => {
      socket.emit('new-marker', marker)
    })
  }, [newMarker$, socket])
  
  //when a marker is moved
  useEffect(() => {
    markerMovement$.subscribe(marker => {
      //emit marker position change socket event
      socket.emit('updated-marker', marker)
    })
  }, [markerMovement$, socket])

  //listen when a marker is moved
  useEffect(() => {
    socket.on('updated-marker', marker => {
      updateMarkersPosition(marker)
    })
  }, [socket, updateMarkersPosition])

  // listening on new-marker event
  useEffect(() => {
    socket.on('new-marker', marker => {
      addMarker(marker, marker.id)
    })
  }, [socket, addMarker])

  //listen active markers event
  useEffect(() => {
    socket.on('active-markers', markers => {
      for(const key of Object.keys(markers)){
        addMarker(markers[key], key)
      }
    })
  }, [socket, addMarker])

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
