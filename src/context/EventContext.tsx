import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { EventCategoryType, EventType, ItemEventType } from 'types/EventType'

interface IContextProps {
  events: EventType[]
  event: ItemEventType | null
  eventCategory: EventCategoryType[]
  isLoading: boolean
  error: string | null
  fetchSearchEvents: (busca?: string) => Promise<void>
  fetchEvents: () => Promise<void>
  fetchEvent: (id: number | string) => Promise<void>
  fetchEventsCategory: (id?: number) => Promise<void>
}

interface IEventProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const EventsProvider: React.FC<IEventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<EventType[]>([])
  const [event, setEvent] = useState<ItemEventType | null>(null)
  const [eventCategory, setEventCategory] = useState<EventCategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get('/eventos', {
        params: {
          fields: 'datahora_inicio',
          orderby: 'datahora_inicio',
          order: 'asc',
        },
      })
      setEvents(response.data.collection)
      setEventCategory(response.data.categorias)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchEvent = useCallback(async (id: number | string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get(`/eventos/${id}`)
      setEvent(response.data.item)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSearchEvents = useCallback(async (busca?: string) => {
    setIsLoading(true)
    setError(null)

    const params = {
      busca,
    }

    try {
      const response = await Api.get('/eventos/busca', {
        params,
      })
      setEvents(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchEventsCategory = useCallback(async (id?: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get(`/eventos/categorias/${id}`)
      setEvents(response.data.collection)
    } catch {
      // eslint-disable-next-line no-console
      setError('Algo de errado não está certo!')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          events,
          event,
          isLoading,
          error,
          eventCategory,
          fetchEvents,
          fetchEvent,
          fetchSearchEvents,
          fetchEventsCategory,
        }),
        [
          events,
          event,
          eventCategory,
          isLoading,
          error,
          fetchEvents,
          fetchEvent,
          fetchSearchEvents,
          fetchEventsCategory,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useEvents = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usePontosHook must be within PontosProvider')
  }

  return context
}
