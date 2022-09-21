import { memo, ReactElement } from 'react'

import GoogleMapReact from 'google-map-react'

import Config from 'Config'

import SpotMarker from 'components/SpotMarker'

import { ItemEventType } from 'types/EventType'
import { ItemHotelType } from 'types/HotelType'
import { ItemRestaurantType } from 'types/RestaurantType'
import { ItemSpaceType } from 'types/SpaceType'
import { ItemSpotType } from 'types/SpotType'
import { ItemStoreType } from 'types/StoreType'

interface IMapLocationProps {
  item:
    | ItemEventType
    | ItemStoreType
    | ItemSpotType
    | ItemHotelType
    | ItemSpaceType
    | ItemRestaurantType
}

const MapLocation: React.FC<IMapLocationProps> = ({ item }) => {
  return (
    <div style={{ height: 300 }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${Config.services.google.mapsAPI.key}`,
        }}
        defaultCenter={{
          lat: item.addresses[0].lat,
          lng: item.addresses[0].lng,
        }}
        defaultZoom={11}
      >
        {item.addresses.map((i) => (
          <SpotMarker lat={i.lat} lng={i.lng} key={i.id} />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default memo(MapLocation)
