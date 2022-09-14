import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { RestaurantCategoryType, RestaurantType } from 'types/RestaurantType'

interface IContextProps {
  restaurants: RestaurantType[]
  restaurantCategory: RestaurantCategoryType[]
  isLoading: boolean
  error: string | null
  fetchSearchRestaurants: (busca?: string) => Promise<void>
  fetchRestaurants: () => Promise<void>
  fetchRestaurantsCategory: (id?: number) => Promise<void>
}

interface IRestaurantProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const RestaurantsProvider: React.FC<IRestaurantProviderProps> = ({
  children,
}) => {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([])
  const [restaurantCategory, setRestaurantCategory] = useState<
    RestaurantCategoryType[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRestaurants = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get('/restaurantes')
      setRestaurants(response.data.collection)
      setRestaurantCategory(response.data.categorias)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSearchRestaurants = useCallback(async (busca?: string) => {
    setIsLoading(true)
    setError(null)

    const params = {
      busca,
    }

    try {
      const response = await Api.get('/restaurantes/busca', {
        params,
      })
      setRestaurants(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchRestaurantsCategory = useCallback(async (id?: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get(`/restaurantes/categorias/${id}`)
      setRestaurants(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRestaurants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          restaurants,
          isLoading,
          error,
          restaurantCategory,
          fetchRestaurants,
          fetchSearchRestaurants,
          fetchRestaurantsCategory,
        }),
        [
          restaurants,
          restaurantCategory,
          isLoading,
          error,
          fetchRestaurants,
          fetchSearchRestaurants,
          fetchRestaurantsCategory,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useRestaurants = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useRestaurants must be within RestaurantsProvider')
  }

  return context
}
