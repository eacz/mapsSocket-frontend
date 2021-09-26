import { useCallback, useEffect, useRef, useState } from 'react';
import {v4 as uuid} from 'uuid'
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
  //markers reference
  const markers = useRef({})

  const addMarker = useCallback((e) => {
    const { lng, lat } = e.lngLat 
    const marker = new mapboxgl.Marker()
    marker.id = uuid() //TODO: check if the marker already has an id
    marker
      .setLngLat([lng,lat])
      .addTo(map.current)
      .setDraggable(true);
    markers.current[marker.id] = marker;
  }, [])

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

  //add markers on click
  useEffect(() => {
    map.current?.on('click',addMarker)
  }, [addMarker])

  return {
    coords,
    setRef,
    markers,
    addMarker
  }
}

export default useMapbox