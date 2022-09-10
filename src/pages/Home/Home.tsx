import { memo, useEffect } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { AiFillHome } from 'react-icons/ai'
import { BiRestaurant } from 'react-icons/bi'
import { BsCalendarWeek } from 'react-icons/bs'
import {
  FaUmbrellaBeach,
  FaBed,
  FaMotorcycle,
  FaTicketAlt,
  FaRoute,
} from 'react-icons/fa'
import { GiMicrophone } from 'react-icons/gi'
import { MdStoreMallDirectory } from 'react-icons/md'
import { SiSnapcraft } from 'react-icons/si'

import Footer from 'components/Footer'
import Header from 'components/Header'
import IconCard from 'components/IconCard'

import useTitle from 'hooks/useTitle'

import { BgPage } from './style'

const Home: React.FC = () => {
  const setTitle = useTitle()

  useEffect(() => {
    setTitle('Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <BgPage>
        <Container className="flex-grow-1">
          <Row className="row-cols-2 row-cols-md-3 g-3 my-4 justify-content-center">
            <Col className="">
              <IconCard
                icon={FaUmbrellaBeach}
                title="Pontos Turísticos"
                description="Conheça nossas praias, lagoas, grutas e outros pontos turísticos"
              />
            </Col>
            <Col>
              <IconCard
                icon={FaBed}
                title="Hotéis e Pousadas"
                description="Saiba onde se hospedar em Maricá"
              />
            </Col>
            <Col>
              <IconCard
                icon={BiRestaurant}
                title="Bares e Restaurantes"
                description="Aprecie a gastronomia de Maricá"
              />
            </Col>
            <Col>
              <IconCard
                icon={FaMotorcycle}
                title="Delivery"
                description="Receba o melhor de Maricá no conforto da sua casa"
              />
            </Col>
            <Col>
              <IconCard
                icon={MdStoreMallDirectory}
                title="Comércio Local"
                description="Veja onde fazer as suas compras"
              />
            </Col>
            <Col>
              <IconCard
                icon={FaTicketAlt}
                title="Cupons de Desconto"
                description="As melhores promoções para curtir a cidade"
              />
            </Col>
            <Col>
              <IconCard
                icon={GiMicrophone}
                title="Espaços para Eventos"
                description="Locais para fazer suas festas ou reuniões"
              />
            </Col>
            <Col>
              <IconCard
                icon={BsCalendarWeek}
                title="Eventos"
                description="Confira o calendário de eventos da cidade"
              />
            </Col>
            <Col>
              <IconCard
                icon={FaRoute}
                title="Roteiros turísticos"
                description="Conheca diversas trilhas ecológicas e de aventura, com váriados níveis de dificuldade"
              />
            </Col>
            <Col>
              <IconCard
                icon={SiSnapcraft}
                title="Artesanato"
                description="Conheça e compre as criações dos artesãos de Maricá/RJ"
              />
            </Col>
            <Col>
              <IconCard
                icon={AiFillHome}
                title="Sobre a cidade"
                description="Conheça mais sobre Maricá"
              />
            </Col>
          </Row>
        </Container>
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(Home)
