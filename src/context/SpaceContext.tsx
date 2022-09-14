import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { SpaceCategoryType, SpaceType } from 'types/SpaceType'

interface IContextProps {
  spaces: SpaceType[]
  spaceCategory: SpaceCategoryType[]
  isLoading: boolean
  error: string | null
  fetchSearchSpaces: (busca?: string) => Promise<void>
  fetchSpaces: () => Promise<void>
  fetchSpacesCategory: (id?: number) => Promise<void>
}

interface ISpaceProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const SpacesProvider: React.FC<ISpaceProviderProps> = ({ children }) => {
  const [spaces, setSpaces] = useState<SpaceType[]>([])
  const [spaceCategory, setSpaceCategory] = useState<SpaceCategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSpaces = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get('/espacos')
      setSpaces(response.data.collection)
      setSpaceCategory(response.data.categorias)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSearchSpaces = useCallback(async (busca?: string) => {
    setIsLoading(true)
    setError(null)

    const params = {
      busca,
    }

    try {
      const response = await Api.get('/espacos/busca', {
        params,
      })
      setSpaces(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSpacesCategory = useCallback(async (id?: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get(`/espacos/categorias/${id}`)
      setSpaces(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSpaces()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          spaces,
          isLoading,
          error,
          spaceCategory,
          fetchSpaces,
          fetchSearchSpaces,
          fetchSpacesCategory,
        }),
        [
          spaces,
          spaceCategory,
          isLoading,
          error,
          fetchSpaces,
          fetchSearchSpaces,
          fetchSpacesCategory,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useSpaces = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useSpacesHook must be within SpacesProvider')
  }

  return context
}
