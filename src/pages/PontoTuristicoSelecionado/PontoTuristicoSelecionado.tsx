import { memo, useEffect } from 'react'

import { Container } from 'react-bootstrap'

import Footer from 'components/Footer'
import Header from 'components/Header'

import useTitle from 'hooks/useTitle'

import { BgPage } from './style'

const SobreACidade: React.FC = () => {
  const setTitle = useTitle()

  useEffect(() => {
    setTitle('Sobre a Cidade | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <Container>
          <div>Ponto Turistico selecionado</div>
        </Container>
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(SobreACidade)
