import { memo } from 'react'

import { Ratio } from 'react-bootstrap'

import { SpotType } from 'types/SpotType'

import { CardContainer, CategoryStyle, CoverImg } from './style'

interface IItemCardProps {
  item: SpotType
}

const ItemCard: React.FC<IItemCardProps> = ({ item }) => {
  return (
    <CardContainer className="w-100">
      <Ratio aspectRatio="16x9">
        <CoverImg capa={item.capa} />
        {/* <img src={item.capa} alt={item.nome} /> */}
      </Ratio>
      <div className="p-3">
        <h2 className="">{item.nome}</h2>
        <div className="d-flex flex-wrap">
          {item.categorias.map((categoria) => (
            <CategoryStyle>{categoria.label}</CategoryStyle>
          ))}
        </div>
        <div className="flex-grow-1">
          {item.enderecos.map((endereco) => (
            <p className="fs-5 text-muted">{endereco.label}</p>
          ))}
        </div>
      </div>
    </CardContainer>
  )
}

export default memo(ItemCard)
