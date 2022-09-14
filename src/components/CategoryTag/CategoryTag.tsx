import { memo, useCallback, useState } from 'react'

import { useSpots } from 'context/SpotContext'

import { SpotCategoryType } from 'types/SpotType'

import { CategoryTag } from './style'

interface ICategoryTageProps {
  category: SpotCategoryType
}

const CategoryTage: React.FC<ICategoryTageProps> = ({ category }) => {
  // const { fetchSpotsCategory } = useSpots()
  // const [id, setId] = useState('')

  // const handleCategory = useCallback(
  //   () => fetchSpotsCategory(id),
  //   [fetchSpotsCategory, id],
  // )
  return <CategoryTag>{category.label}</CategoryTag>
}

export default memo(CategoryTage)
