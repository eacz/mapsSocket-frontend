import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZWFjeiIsImEiOiJja3Uwajg1OXkwaWx5MnZtd3l1YmgycHIwIn0.E4_iIfZU3JQhpZ6t6WU9gg';

const initalPosition = {
  lng: -58.9855,
  lat: -27.4491,
  zoom: 15
}


const MapPage = () => {
  const mapRef = useRef();
  const map = useRef()
  const [coords, setCoords] = useState(initalPosition)

  useEffect(() => {
    const mapGl = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initalPosition.lng, initalPosition.lat],
      zoom: initalPosition.zoom
    });
    map.current = mapGl
  }, [])

  //when the map moves, update the coords
  useEffect(() => {
    map.current?.on('move', () => {
      const { lng,lat } = map.current.getCenter()
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2)
      })
    })
    return map.current?.off('move')
  }, [])
  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div 
        ref={mapRef}
        className="mapContainer"
      />
    </>
  )
}

export default MapPage
