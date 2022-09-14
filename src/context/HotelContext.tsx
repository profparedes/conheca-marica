import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { HotelCategoryType, HotelType } from 'types/HotelType'

interface IContextProps {
  hotels: HotelType[]
  hotelCategory: HotelCategoryType[]
  isLoading: boolean
  error: string | null
  fetchSearchHotels: (busca?: string) => Promise<void>
  fetchHotels: () => Promise<void>
  fetchHotelsCategory: (id?: number) => Promise<void>
}

interface IHotelProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const HotelsProvider: React.FC<IHotelProviderProps> = ({ children }) => {
  const [hotels, setHotels] = useState<HotelType[]>([])
  const [hotelCategory, setHotelCategory] = useState<HotelCategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHotels = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get('/hoteis-e-pousadas')
      setHotels(response.data.collection)
      setHotelCategory(response.data.categorias)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSearchHotels = useCallback(async (busca?: string) => {
    setIsLoading(true)
    setError(null)

    const params = {
      busca,
    }

    try {
      const response = await Api.get('/hoteis-e-pousadas/busca', {
        params,
      })
      setHotels(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchHotelsCategory = useCallback(async (id?: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get(`/hoteis-e-pousadas/categorias/${id}`)
      setHotels(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHotels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          hotels,
          isLoading,
          error,
          hotelCategory,
          fetchHotels,
          fetchSearchHotels,
          fetchHotelsCategory,
        }),
        [
          hotels,
          hotelCategory,
          isLoading,
          error,
          fetchHotels,
          fetchSearchHotels,
          fetchHotelsCategory,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useHotels = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usePontosHook must be within PontosProvider')
  }

  return context
}
