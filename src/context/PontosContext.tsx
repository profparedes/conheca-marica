import { createContext, useContext, useMemo, useState } from 'react'

import { PontoType } from 'types/PontoType'

interface IContextProps {
  something: string
}

interface IPontosProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const PontosProvider: React.FC<IPontosProviderProps> = ({
  children,
}) => {
  const [pontos, setPontos] = useState<PontoType[]>([])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          something: '',
        }),
        [],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const usePontosHook = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usePontosHook must be within PontosProvider')
  }

  return context
}
