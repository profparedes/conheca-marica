import { memo } from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { ItemEventType } from 'types/EventType'
import { ItemHotelType } from 'types/HotelType'
import { ItemRestaurantType } from 'types/RestaurantType'
import { ItemSpaceType } from 'types/SpaceType'
import { ItemSpotType } from 'types/SpotType'
import { ItemStoreType } from 'types/StoreType'

import { CoverBanner } from './style'

interface IBannerSliderProps {
  banner:
    | ItemEventType
    | ItemStoreType
    | ItemSpotType
    | ItemHotelType
    | ItemSpaceType
    | ItemRestaurantType
}

const BannerSlider: React.FC<IBannerSliderProps> = ({ banner }) => {
  const responsive = [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ]

  return (
    <Slider
      className="mb-4"
      dots
      infinite
      speed={500}
      autoplay
      autoplaySpeed={3000}
      slidesToShow={4}
      slidesToScroll={2}
      initialSlide={0}
      responsive={responsive}
      pauseOnHover
    >
      {banner.images.map((img) => (
        <div key={img.id}>
          <CoverBanner style={{ backgroundImage: `url(${img.src})` }} />
        </div>
      ))}
    </Slider>
  )
}

export default memo(BannerSlider)
