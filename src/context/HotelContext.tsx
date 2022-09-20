import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { HotelCategoryType, HotelType, ItemHotelType } from 'types/HotelType'

interface IContextProps {
  hotels: HotelType[]
  hotel: ItemHotelType | null
  hotelCategory: HotelCategoryType[]
  isLoading: boolean
  error: string | null
  fetchSearchHotels: (busca?: string) => Promise<void>
  fetchHotels: () => Promise<void>
  fetchHotel: (id: number | string) => Promise<void>
  fetchHotelsCategory: (id?: number) => Promise<void>
}

interface IHotelProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const HotelsProvider: React.FC<IHotelProviderProps> = ({ children }) => {
  const [hotels, setHotels] = useState<HotelType[]>([])
  const [hotel, setHotel] = useState<ItemHotelType | null>(null)
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

  const fetchHotel = useCallback(async (id: number | string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get(`/hoteis-e-pousadas/${id}`)
      setHotel(response.data.item)
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
          hotel,
          isLoading,
          error,
          hotelCategory,
          fetchHotels,
          fetchHotel,
          fetchSearchHotels,
          fetchHotelsCategory,
        }),
        [
          hotels,
          hotel,
          hotelCategory,
          isLoading,
          error,
          fetchHotels,
          fetchHotel,
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
