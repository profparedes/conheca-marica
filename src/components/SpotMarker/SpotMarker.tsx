import { memo } from 'react'

import { ImLocation } from 'react-icons/im'

import { SpotCorrection } from './style'

interface IMarkerProps {
  lat: number
  lng: number
}

const SpotMarker: React.FC<IMarkerProps> = () => (
  <SpotCorrection>
    <ImLocation color="red" size={30} />
  </SpotCorrection>
)

export default memo(SpotMarker)
