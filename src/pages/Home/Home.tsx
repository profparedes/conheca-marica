import { memo, useEffect } from 'react'

import { Carousel, Col, Container, Row } from 'react-bootstrap'
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

import AppleStore from 'assets/AppleStore.png'
import GooglePlay from 'assets/GooglePlay.png'
import MaricaApp from 'assets/MaricaApp.png'

import { useBanners } from 'context/BannerContext'

import Footer from 'components/Footer'
import Header from 'components/Header'
import IconCard from 'components/IconCard'
import IconWebCard from 'components/IconWebCard'

import useTitle from 'hooks/useTitle'

import { BgPage, FooterBanner } from './style'

const Home: React.FC = () => {
  const { banners, isLoading, error } = useBanners()
  const setTitle = useTitle()

  useEffect(() => {
    setTitle('Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <BgPage>
        <Carousel>
          {isLoading && <p className="text-center">Loading...</p>}
          {error && <h2>Falha no carregamento</h2>}
          {!isLoading &&
            !error &&
            Array.isArray(banners) &&
            banners.map((banner) => (
              <Carousel.Item key={banner.id}>
                <img
                  className="d-none d-lg-block w-100"
                  src={banner.image_l}
                  alt="Imagem do slide"
                />
                <img
                  className="d-block d-lg-none w-100"
                  src={banner.image_s}
                  alt="Imagem do slide"
                />
              </Carousel.Item>
            ))}
        </Carousel>
        <Container className="flex-grow-1">
          <Row className="row-cols-2 row-cols-md-3 g-3 my-4 justify-content-center">
            <Col className="">
              <IconCard
                icon={FaUmbrellaBeach}
                title="Pontos Turísticos"
                description="Conheça nossas praias, lagoas, grutas e outros spots turísticos"
                link="/pontos-turisticos"
              />
            </Col>
            <Col>
              <IconCard
                icon={FaBed}
                title="Hotéis e Pousadas"
                description="Saiba onde se hospedar em Maricá"
                link="/hoteis-e-pousadas"
              />
            </Col>
            <Col>
              <IconCard
                icon={BiRestaurant}
                title="Bares e Restaurantes"
                description="Aprecie a gastronomia de Maricá"
                link="/bares-e-restaurantes"
              />
            </Col>
            <Col>
              <IconCard
                icon={FaMotorcycle}
                title="Delivery"
                description="Receba o melhor de Maricá no conforto da sua casa"
                link="/delivery"
              />
            </Col>
            <Col>
              <IconCard
                icon={MdStoreMallDirectory}
                title="Comércio Local"
                description="Veja onde fazer as suas compras"
                link="/comercio-local"
              />
            </Col>
            <Col>
              <IconCard
                icon={FaTicketAlt}
                title="Cupons de Desconto"
                description="As melhores promoções para curtir a cidade"
                link="/cupons-de-desconto"
              />
            </Col>
            <Col>
              <IconCard
                icon={GiMicrophone}
                title="Espaços para Eventos"
                description="Locais para fazer suas festas ou reuniões"
                link="/espacos-para-eventos"
              />
            </Col>
            <Col>
              <IconCard
                icon={BsCalendarWeek}
                title="Eventos"
                description="Confira o calendário de eventos da cidade"
                link="/eventos"
              />
            </Col>
            <Col>
              <IconWebCard
                icon={FaRoute}
                title="Roteiros turísticos"
                description="Conheca diversas trilhas ecológicas e de aventura, com váriados níveis de dificuldade"
                link="https://contato.site/5d9bab8/marica-cvb3/paginaprincipal"
              />
            </Col>
            <Col>
              <IconWebCard
                icon={SiSnapcraft}
                title="Artesanato"
                description="Conheça e compre as criações dos artesãos de Maricá/RJ"
                link="https://www.feirartemarica.com.br/"
              />
            </Col>
            <Col>
              <IconCard
                icon={AiFillHome}
                title="Sobre a cidade"
                description="Conheça mais sobre Maricá"
                link="/sobre"
              />
            </Col>
          </Row>
        </Container>
        <FooterBanner>
          <Container>
            <Row>
              <Col className="col-12 col-md-8">
                <h2 className="mb-5">Conheca nosso aplicativo</h2>
                <p>
                  Tenha o Guia Oficial de Turismo de Maricá a qualquer momento,
                  na palma das suas mãos!
                </p>
                <div className="mt-5">
                  <img
                    className="me-4 img-fluid"
                    src={GooglePlay}
                    alt="Google Play"
                  />
                  <img
                    className="img-fluid"
                    src={AppleStore}
                    alt="Apple Store"
                  />
                </div>
              </Col>
              <Col className="d-none d-md-flex col-md-4">
                <img src={MaricaApp} alt="Aplicativo no celular" />
              </Col>
            </Row>
          </Container>
        </FooterBanner>
        {/* <BlueBanner>
          <WhiteBanner>
            <BlueTriangle />
          </WhiteBanner>
        </BlueBanner> */}
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(Home)
