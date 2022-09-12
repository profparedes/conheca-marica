import { memo, useEffect } from 'react'

import { Container } from 'react-bootstrap'

import { usePontos } from 'context/PontosContext'

import Footer from 'components/Footer'
import Header from 'components/Header'

import useTitle from 'hooks/useTitle'

import { BgPage } from './style'

const PontosTuristicos: React.FC = () => {
  const setTitle = useTitle()

  const { pontos, isLoading, error, fetchPontos } = usePontos()

  useEffect(() => {
    setTitle('Pontos Turísticos | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('pontos', pontos)

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <Container>
          <div>Pontos Turisticos</div>
        </Container>
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(PontosTuristicos)
