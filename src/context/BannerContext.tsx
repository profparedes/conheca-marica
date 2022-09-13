import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { BannerType } from 'types/BannerType'

interface IContextProps {
  banners: BannerType[]
  isLoading: boolean
  error: string | null
  fetchBanners: (search?: string) => Promise<void>
}

interface IBannersProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const BannersProvider: React.FC<IBannersProviderProps> = ({
  children,
}) => {
  const [banners, setBanners] = useState<BannerType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBanners = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get('/banners')
      setBanners(response.data)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBanners()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          banners,
          isLoading,
          error,
          fetchBanners,
        }),
        [banners, isLoading, error, fetchBanners],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useBanners = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useBanners must be within BannersProvider')
  }

  return context
}
