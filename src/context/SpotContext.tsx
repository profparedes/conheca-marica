import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { ItemSpotType, SpotCategoryType, SpotType } from 'types/SpotType'

interface IContextProps {
  spots: SpotType[]
  spotCategory: SpotCategoryType[]
  isLoading: boolean
  error: string | null
  fetchSearchSpots: (busca?: string) => Promise<void>
  fetchSpots: () => Promise<void>
  fetchSpot: (id: number | string) => Promise<void>
  fetchSpotsCategory: (id?: number) => Promise<void>
}

interface ISpotsProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const SpotsProvider: React.FC<ISpotsProviderProps> = ({ children }) => {
  const [spots, setSpots] = useState<SpotType[]>([])
  const [spot, setSpot] = useState<ItemSpotType | null>(null)
  const [spotCategory, setSpotCategory] = useState<SpotCategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSpots = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get('/pontos')
      setSpots(response.data.collection)
      setSpotCategory(response.data.categorias)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSpot = useCallback(
    async (id: number | string) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await Api.get(`/pontos/${id}`)
        setSpot(response.data)
        console.log('Spot item', spot)
      } catch {
        // eslint-disable-next-line no-console
        setError('Algo de errado não está certo!')
      } finally {
        setIsLoading(false)
      }
    },
    [spot],
  )

  const fetchSearchSpots = useCallback(async (busca?: string) => {
    setIsLoading(true)
    setError(null)

    const params = {
      busca,
    }

    try {
      const response = await Api.get('/pontos/busca', {
        params,
      })
      setSpots(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSpotsCategory = useCallback(async (id?: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get(`/pontos/categorias/${id}`)
      setSpots(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSpots()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          spots,
          isLoading,
          error,
          spotCategory,
          fetchSpots,
          fetchSpot,
          fetchSearchSpots,
          fetchSpotsCategory,
        }),
        [
          spots,
          spotCategory,
          isLoading,
          error,
          fetchSpots,
          fetchSpot,
          fetchSearchSpots,
          fetchSpotsCategory,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useSpots = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usePontosHook must be within PontosProvider')
  }

  return context
}
