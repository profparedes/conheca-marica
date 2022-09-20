import { memo } from 'react'

import { Ratio } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { EventType } from 'types/EventType'
import { HotelType } from 'types/HotelType'
import { RestaurantType } from 'types/RestaurantType'
import { SpaceType } from 'types/SpaceType'
import { SpotType } from 'types/SpotType'
import { StoreType } from 'types/StoreType'

import { CardContainer, CategoryStyle, CoverImg } from './style'

interface IItemCardProps {
  item:
    | SpotType
    | EventType
    | HotelType
    | RestaurantType
    | SpaceType
    | StoreType
  endPoint?: string
}

const ItemCard: React.FC<IItemCardProps> = ({ item, endPoint }) => {
  return (
    <CardContainer className="w-100 position-relative">
      <Ratio aspectRatio="16x9">
        <CoverImg capa={item.capa} />
        {/* <img src={item.capa} alt={item.nome} /> */}
      </Ratio>
      <div className="p-3">
        <Link to={`/${endPoint}/${item.id}`} className="stretched-link">
          <h2 className="">{item.nome}</h2>
        </Link>
        <div className="d-flex flex-wrap">
          {item.categorias.slice(0, 4).map((category) => (
            <CategoryStyle key={category.id}>{category.label}</CategoryStyle>
          ))}
        </div>
        <div className="flex-grow-1">
          {item.enderecos.map((address) => (
            <p key={address.id} className="fs-5 text-muted">
              {address.label}
            </p>
          ))}
        </div>
      </div>
    </CardContainer>
  )
}

export default memo(ItemCard)
