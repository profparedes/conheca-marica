import { memo, useEffect } from 'react'

import { Container } from 'react-bootstrap'

import Footer from 'components/Footer'
import Header from 'components/Header'

import useTitle from 'hooks/useTitle'

import { BgPage } from './style'

const Delivery: React.FC = () => {
  const setTitle = useTitle()

  useEffect(() => {
    setTitle('Delivery | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <BgPage>
        <Container className="flex-grow-1">
          <div>Delivery</div>
        </Container>
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(Delivery)
