import { memo } from 'react'

import { Card, Ratio } from 'react-bootstrap'

import { SpotType } from 'types/SpotType'

interface IItemCardProps {
  item: SpotType
}

const ItemCard: React.FC<IItemCardProps> = ({ item }) => {
  return (
    <Card className="w-100">
      <Ratio aspectRatio="1x1">
        <img src={item.capa} alt={item.nome} />
      </Ratio>
      <Card.Body>
        <Card.Title className="flex-grow-1">{item.nome}</Card.Title>
        {/* <Card.Text>{item.enderecos[1].label}</Card.Text> */}
      </Card.Body>
    </Card>
  )
}

export default memo(ItemCard)
