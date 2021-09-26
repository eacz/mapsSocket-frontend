import useMapbox from '../hooks/useMapbox';

const initalPosition = {
  lng: -58.9855,
  lat: -27.4491,
  zoom: 15
}

const MapPage = () => {
  const { coords, setRef } = useMapbox(initalPosition) 
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
