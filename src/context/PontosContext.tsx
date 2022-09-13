import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { SpotCategoryType, SpotType } from 'types/SpotType'

interface IContextProps {
  pontos: SpotType[]
  spotCategory: SpotCategoryType[]
  isLoading: boolean
  error: string | null
  fetchBuscaPontos: (busca?: string) => Promise<void>
  fetchPontos: () => Promise<void>
}

interface IPontosProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const PontosProvider: React.FC<IPontosProviderProps> = ({
  children,
}) => {
  const [pontos, setPontos] = useState<SpotType[]>([])
  const [spotCategory, setSpotCategory] = useState<SpotCategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPontos = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    // const params = {
    //   busca,
    // }

    try {
      const response = await Api.get('/pontos', {})
      setPontos(response.data.collection)
      setSpotCategory(response.data.categorias)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchBuscaPontos = useCallback(async (busca?: string) => {
    setIsLoading(true)
    setError(null)

    const params = {
      busca,
    }

    try {
      const response = await Api.get('/pontos/busca', {
        params,
      })
      setPontos(response.data.collection)
      console.log('busca', response)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPontos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          pontos,
          isLoading,
          error,
          spotCategory,
          fetchPontos,
          fetchBuscaPontos,
        }),
        [pontos, spotCategory, isLoading, error, fetchPontos, fetchBuscaPontos],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const usePontos = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usePontosHook must be within PontosProvider')
  }

  return context
}
