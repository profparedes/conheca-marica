import { memo } from 'react'

import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'

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
      <h2 className="text-center">{title}</h2>
      <p className="d-none d-md-flex text-center mb-3 flex-grow-1">
        {description}
      </p>
      <button type="button">
        <Link className="" to={`${link}`}>
          Acessar
        </Link>
      </button>
    </BgCard>
  )
}

export default memo(IconCard)
