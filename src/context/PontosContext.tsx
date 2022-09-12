import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { PontoType } from 'types/PontoType'

interface IContextProps {
  pontos: PontoType[]
  isLoading: boolean
  error: string | null
  fetchPontos: (search?: string) => Promise<void>
}

interface IPontosProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const PontosProvider: React.FC<IPontosProviderProps> = ({
  children,
}) => {
  const [pontos, setPontos] = useState<PontoType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPontos = useCallback(async (search?: string) => {
    setIsLoading(true)
    setError(null)

    const params = {
      // search???
    }

    try {
      const response = await Api.get('/pontos', {
        params,
      })
      setPontos(response.data.collection)
      console.log('response', response)
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
          fetchPontos,
        }),
        [pontos, isLoading, error, fetchPontos],
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
