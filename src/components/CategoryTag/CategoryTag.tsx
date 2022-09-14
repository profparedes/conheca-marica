import { memo } from 'react'

import { SpotCategoryType } from 'types/SpotType'

import { CategoryTag } from './style'

interface ICategoryTageProps {
  category: SpotCategoryType
  // onClick: () => void
}

const CategoryTage: React.FC<ICategoryTageProps> = ({ category }) => {
  return <CategoryTag>{category.label}</CategoryTag>
}

export default memo(CategoryTage)
