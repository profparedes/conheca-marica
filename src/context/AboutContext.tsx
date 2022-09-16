import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { AboutType } from 'types/AboutType'

interface IContextProps {
  about: AboutType | null
  isLoading: boolean
  error: string | null
  fetchAbout: () => Promise<void>
}

interface IAboutProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const AboutProvider: React.FC<IAboutProviderProps> = ({ children }) => {
  const [about, setAbout] = useState<AboutType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAbout = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get('/apps/get')
      setAbout(response.data)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          about,
          isLoading,
          error,
          fetchAbout,
        }),
        [about, isLoading, error, fetchAbout],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useAbout = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useAbout must be within AboutProvider')
  }

  return context
}
