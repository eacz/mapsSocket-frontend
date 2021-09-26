import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const useMapbox = (initalPosition) => {
  //map reference and a function to set it
  //MapRef is a reference to DOM element where the map should render
  const mapRef = useRef();
  const setRef = useCallback(node => {
    mapRef.current = node
  }, [])
  
  //map is an instance of mapboxgl 
  const map = useRef()
  const [coords, setCoords] = useState(initalPosition)

  //create the map instance on first load of the hook
  useEffect(() => {
    const mapGl = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initalPosition.lng, initalPosition.lat],
      zoom: initalPosition.zoom
    });
    map.current = mapGl
  }, [initalPosition])

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

  return {
    coords,
    setRef
  }
}

export default useMapbox
