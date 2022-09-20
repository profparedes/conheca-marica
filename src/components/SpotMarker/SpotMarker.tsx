import { memo } from 'react'

import { ImLocation } from 'react-icons/im'

interface IMarkerProps {
  lat: number
  lng: number
}

const SpotMarker: React.FC<IMarkerProps> = () => (
  <div>
    <ImLocation color="red" size={30} />
  </div>
)

export default memo(SpotMarker)
