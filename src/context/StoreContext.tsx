import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { StoreCategoryType, StoreType } from 'types/StoreType'

interface IContextProps {
  stores: StoreType[]
  storeCategory: StoreCategoryType[]
  isLoading: boolean
  error: string | null
  fetchSearchStores: (busca?: string) => Promise<void>
  fetchStores: () => Promise<void>
  fetchStoresCategory: (id?: number) => Promise<void>
}

interface IStoreProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const StoresProvider: React.FC<IStoreProviderProps> = ({ children }) => {
  const [stores, setStores] = useState<StoreType[]>([])
  const [storeCategory, setStoreCategory] = useState<StoreCategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStores = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get('/comercios')
      setStores(response.data.collection)
      setStoreCategory(response.data.categorias)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSearchStores = useCallback(async (busca?: string) => {
    setIsLoading(true)
    setError(null)

    const params = {
      busca,
    }

    try {
      const response = await Api.get('/comercios/busca', {
        params,
      })
      setStores(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchStoresCategory = useCallback(async (id?: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get(`/comercios/categorias/${id}`)
      setStores(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStores()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          stores,
          isLoading,
          error,
          storeCategory,
          fetchStores,
          fetchSearchStores,
          fetchStoresCategory,
        }),
        [
          stores,
          storeCategory,
          isLoading,
          error,
          fetchStores,
          fetchSearchStores,
          fetchStoresCategory,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useStores = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usePontosHook must be within PontosProvider')
  }

  return context
}
