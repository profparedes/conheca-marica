import { memo, useEffect } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'

import useTitle from 'hooks/useTitle'

const Home: React.FC = () => {
  const setTitle = useTitle()

  useEffect(() => {
    setTitle('Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <main className="flex-grow-1">Pagina inicial</main>
      <Footer />
    </>
  )
}

export default memo(Home)
