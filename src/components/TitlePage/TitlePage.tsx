import { memo } from 'react'

import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'

interface IBaseComponentProps {
  title: string
}

const BaseComponent: React.FC<IBaseComponentProps> = ({ title }) => (
  <div className="d-flex align-items-center mt-3">
    <Link to="/" className="me-3">
      <BiArrowBack size={28} />
    </Link>
    <h2 className="h1">{title}</h2>
  </div>
)

export default memo(BaseComponent)
