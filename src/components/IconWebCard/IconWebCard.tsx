import { memo } from 'react'

import { IconType } from 'react-icons'

import { BgCard } from './style'

interface IIconCardProps {
  icon: IconType
  title: string
  description: string
  link?: string
}

const IconCard: React.FC<IIconCardProps> = ({
  icon,
  title,
  description,
  link,
}) => {
  const Icon = icon

  return (
    <BgCard className="d-flex flex-column align-items-center h-100">
      <div>
        <Icon size={60} />
      </div>
      <h2>{title}</h2>
      <p className="text-center mb-3 flex-grow-1">{description}</p>
      <button type="button">
        <a className="" href={`${link}`} target="_blank" rel="noreferrer">
          Acessar
        </a>
      </button>
    </BgCard>
  )
}

export default memo(IconCard)
