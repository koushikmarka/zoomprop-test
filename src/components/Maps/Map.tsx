// @ts-nocheck
import useWindowSize from '../../hooks/UseWindowSize'
import DrawControl, { boundsStyle } from './drawControl'
import { MapContainer, dataLayer, MapHoverInfo } from './styles'
import SearchLocation from '@/components/Search/SearchLocation'
import GlobalContext from '@/context/GlobalContext'
import { UseWindowSize } from '@/hooks'
import { getPercentage, isObjEmpty } from '@/utils'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { Box, Modal, Input, Button } from '@mui/material'
import Link from 'next/link'
import Router from 'next/router'
import React, { useEffect, useContext, useState, useCallback } from 'react'
import Map, {
  Marker,
  Popup,
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  AttributionControl,
} from 'react-map-gl'
import styled from 'styled-components'

const infoBounds = '/assets/videos/info-bounds.mp4'

const getColor = (level) => {
  let color =
    level === 'high' ? 'green' : level === 'medium' ? 'blue' : 'yellow'
  return color
}

const layerStyle = (data: any) => {
  return {
    id: 'park-boundary',
    type: 'fill',
    source: 'national-park',
    paint: {
      'fill-color': '#C0FF5A',
      'fill-opacity': 0.4,
    },
    filter: ['==', '$type', 'Polygon'],
  }
}

const pinTypes = [
  {
    key: 'nextMonthApr',
    label: '1 Mo',
  },
  {
    key: 'next3MonthApr',
    label: '3 Mo',
  },
  {
    key: 'next6MonthApr',
    label: '6 Mo',
  },
]

const pinColorEval = (property) => {
  let arr = []
  pinTypes.map((pinType) => {
    arr.push(Math.floor(property[pinType.key] * 100))
  })

  const value = arr.some((el) => el >= 11)
    ? 'high'
    : arr.some((el) => el < 12 && el >= 6)
    ? 'medium'
    : 'low'
  return value
}

const SearchContainer = styled(Box)`
  position: absolute;
  width: 50%;
  left: 5%;
  top: 8px;
`

const InfoContainer = styled(Modal)``

const IconContainer = styled(Box)`
  position: absolute;
  width: 240px;
  right: 1%;
  top: 100px;
  padding: 10px 0;
  border-radius: 40px;
  text-align: center;
  background: #f00;
  .icon {
    margin-bottom: 0px;
    margin-right: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    svg {
      cursor: pointer;
      circle {
        fill: #534bc7;
      }
    }
    &:hover,
    &.active {
      svg {
        cursor: pointer;
        circle {
          fill: #534bc7;
        }
      }
    }
  }
`

export type MapComponentProps = {
  isCollection?: boolean
  geo?: any
  properties?: any
  createNewCollection?: any
  smallHeight?: boolean
  customZoom?: number
  zipcodes?: any
  type?: string
  showGeoMarker?: boolean
  setCollection?: any
  collection?: any
  locationSelected?: any
  setLocationSelected?: any
  locations?: any
  customWidth?: any
  customHeight?: any
}

const MapComponent = ({
  isCollection,
  geo,
  properties,
  createNewCollection,
  smallHeight,
  customZoom,
  zipcodes,
  showGeoMarker,
  type,
  collection,
  customWidth,
  customHeight,
  setCollection,
  locationSelected,
  setLocationSelected,
  locations,
}: MapComponentProps) => {
  const runWindowSize = (index) => {
    const windowSize = useWindowSize()
    return [windowSize[index]]
  }
  const gContext = useContext<any>(GlobalContext)
  const token = gContext.user.authToken
  const [zoom, setZoom] = useState(customZoom ? customZoom : 10)
  const [toggleDraw, setToggleDraw] = useState(false)
  const [toggleInfo, setToggleInfo] = useState(false)
  const [toggleSearch, setToggleSearch] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<any>()
  const [allProperties, setAllProperties] = useState([])
  const [locationCreated, setLocationCreated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [searchVisible, setSearchVisible] = useState(true)
  const [isLocationSearch, setIsLocationSearch] = useState(null)
  const [hoverInfo, setHoverInfo] = useState(null)

  const [features, setFeatures] = useState({})
  const [mapDrawInit, setMapDrawInit] = useState(false)
  const [draw, setDraw] = useState<any>()
  const [mapLocatoins, setMapLocations] = useState<any>([])
  const [width] = customWidth ? useState<any>(customWidth) : runWindowSize(0)
  const [height] = customHeight ? useState<any>(customHeight) : runWindowSize(1)
  const [drawCoords, setDrawCoords] = useState<any>()
  const [locationCoords, setLocationCoords] = useState<any>({
    lng: geo && geo.coords && geo.coords.lng && geo.coords.lng,
    lat: geo && geo.coords && geo.coords.lat && geo.coords.lat,
  })

  const [viewState, setViewState] = React.useState({
    longitude: locationCoords.lng,
    latitude: locationCoords.lat,
    zoom: zoom,
  })

  const [polyObj, setPolyObj] = useState<any>({
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [],
    },
  })

  const onDrawCreate = ({ features }) => {
    setDrawCoords(features[0].geometry.coordinates[0])
    collection.coords = features[0].geometry.coordinates[0]
    setCollection({
      coords: collection.coords,
      location: false,
      collectionType: 'bounds',
    })
    setLocationCreated(true)
    setMapDrawInit(true)
  }

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures }
      for (const f of e.features) {
        newFeatures[f.id] = f
      }
      return newFeatures
    })
  }, [])

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures }
      for (const f of e.features) {
        delete newFeatures[f.id]
      }
      return newFeatures
    })
  }, [])

  const onDrawUpdate = ({ features }) => {
    collection.coords = features[0].geometry.coordinates[0]
    setCollection(collection.coords)
    setSearchVisible(false)
  }

  const onDrawDelete = () => {
    draw?.draw?.deleteAll().getAll()
    setMapDrawInit(false)
    setLocationSelected(false)
    draw?.draw?.changeMode('draw_polygon')
  }

  const onDrawSelectionChange = ({ features }) => {
    if (!features.length && collection.coords.length) {
      setLocationSelected(true)
    } else {
      setLocationSelected(false)
    }
  }

  const addCollectionName = (e) => {
    const obj = {
      name: e.target.value,
      location: collection.location,
      collectionType: 'location',
    }
    setCollection(obj)
  }

  const createACollection = () => {
    let object = {
      ...collection,
      collectionType: 'bounds',
      coords: drawCoords,
    }

    createNewCollection(object)
    onDrawDelete()
    setShowModal(false)
  }

  const updateCoords = (data) => {
    setLocationCoords(data.coords)
    if (data.coords) {
      setCollection({
        name: data.address,
        location: data.address,
        collectionType: 'location',
      })
      setLocationSelected(true)
    }
  }

  useEffect(() => {
    if (!showPopup && selectedProperty) {
      setShowPopup(true)
    }
  }, [selectedProperty])

  useEffect(() => {
    if (draw) {
      draw?.draw?.changeMode('draw_polygon')
    }
  }, [toggleDraw])

  useEffect(() => {
    if (geo?.coords) {
      setLocationCoords([geo.coords.lng, geo.coords.lat])
    }
  }, [geo])

  useEffect(() => {
    if (properties && properties.length) {
      setAllProperties(properties)
    }
  }, [properties])

  useEffect(() => {
    if (gContext.selectedLocation) {
      const coords = {
        lng: gContext.selectedLocation.lng,
        lat: gContext.selectedLocation.lat,
      }
      setViewState({
        longitude: coords.lng,
        latitude: coords.lat,
        zoom: zoom,
      })
    }
  }, [gContext.selectedLocation])

  useEffect(() => {
    if (!isObjEmpty(features)) {
      const polygonParent = Object.values(features)[0]
      setCollection((prevState) => {
        return {
          ...prevState,
          coords: polygonParent.geometry.coordinates[0],
        }
      })
      setLocationSelected(true)

      // setSearchVisible(false)
    }
  }, [features])

  useEffect(() => {
    if (zipcodes) {
      let d = polyObj
      zipcodes.map((zipcode) => {
        if (zipcode.polygon !== null) {
          d.geometry.coordinates = [JSON.parse(zipcode.polygon)]
        }
      })
      setPolyObj(d)
    }
    if (locations) {
      setPolyObj(locations)
    }
  }, [])

  const layerHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event
    const hoveredFeature = features && features[0]
    // prettier-ignore
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, [])

  useEffect(() => {
    setViewState({
      longitude: locationCoords.lng || locationCoords[0],
      latitude: locationCoords.lat || locationCoords[1],
      zoom: 12,
    })
  }, [locationCoords])

  return (
    <MapContainer
      className={`${toggleDraw && 'toggle-draw-active'} ${
        locationCreated && 'collection-selected'
      }${locationCreated && !locationSelected && ' can-delete'}`}
    >
      {locationCoords && viewState.longitude !== undefined && (
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          style={{ width: width, height: height }}
          mapboxAccessToken={process.env.MAPBOX_API_KEY}
          interactiveLayerIds={['map-data']}
          onMouseMove={layerHover}
          attributionControl={false}
        >
          <AttributionControl position="top-left" />
          {isCollection && (
            <DrawControl
              position="top-left"
              displayControlsDefault={false}
              controls={{
                polygon: true,
                trash: true,
              }}
              defaultMode="draw_polygon"
              userProperties={true}
              onCreate={onUpdate}
              onUpdate={onUpdate}
              onDelete={onDelete}
              styles={boundsStyle}
            />
          )}
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl position="top-left" />
          {showPopup && (
            <Popup
              longitude={selectedProperty.lng}
              latitude={selectedProperty.lat}
              anchor="bottom"
              maxWidth="400px"
              className="popup"
              style={{ marginLeft: '5px' }}
              onClose={() => setShowPopup(false)}
            >
              <Box className="row text-center">
                {pinTypes.map((pinType: any) => (
                  <Box className="col-md-4 p-0">
                    <p>{getPercentage(selectedProperty[pinType.key])}</p>
                    <p>{pinType.label}</p>
                  </Box>
                ))}

                <Box className="container-fluid m-0 p-0 mt-3">
                  <Box className="col-md-12">
                    <Button className="btn-dark btn-sm">
                      <Link href={`/property/${selectedProperty.listingId}`}>
                        View Property
                      </Link>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Popup>
          )}

          <Source id={`map-data`} type="geojson" data={polyObj}>
            {locations ? (
              <Layer {...dataLayer()} />
            ) : (
              <Layer {...layerStyle()} />
            )}
          </Source>

          {allProperties?.map((property: any, index) => {
            if (property) {
              const pinColor = pinColorEval(property)
              return (
                <Marker
                  key={index}
                  longitude={property.lng || property.longitude}
                  latitude={property.lat || property.latitude}
                  onClick={() => setSelectedProperty(property)}
                  anchor="bottom"
                >
                  <div className="mapMarkerStyle">
                    <div
                      className="pin"
                      style={{
                        background:
                          type === 'comps' ? '#534bc7' : getColor(pinColor),
                      }}
                    >
                      <div
                        className="pulse"
                        style={{
                          background:
                            type === 'comps' ? '#534bc7' : getColor(pinColor),
                        }}
                      ></div>
                    </div>
                  </div>
                </Marker>
              )
            }
          })}
          {hoverInfo && (
            <MapHoverInfo
              style={{
                left: hoverInfo.x + 20,
                top: hoverInfo.y,
              }}
            >
              <div>County: {hoverInfo.feature.properties.name}</div>
              <div>10 year YoY: {hoverInfo.feature.properties.amount}</div>
            </MapHoverInfo>
          )}
        </Map>
      )}
    </MapContainer>
  )
}

export default MapComponent
