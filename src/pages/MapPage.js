import { useEffect } from 'react';
import useMapbox from '../hooks/useMapbox';

const initalPosition = {
  lng: -58.9855,
  lat: -27.4491,
  zoom: 15
}

const MapPage = () => {
  const { coords, setRef, newMarker$, markerMovement$ } = useMapbox(initalPosition)
  
  useEffect(() => {
    newMarker$.subscribe(marker => {
      console.log(marker);
      //TODO: emit new marker socket event
    })
    return () => newMarker$.unsubscribe()
  }, [newMarker$])
  
  useEffect(() => {
    markerMovement$.subscribe(marker => {
      console.log(marker);
      //TODO: emit marker position change socket event
    })
    return () => markerMovement$.unsubscribe()
  }, [markerMovement$])

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
