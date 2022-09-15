import { memo, useEffect } from 'react'

import App from 'App'
import { Carousel, Col, Container, Ratio, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import AppleStore from 'assets/AppleStore.png'
import GooglePlay from 'assets/GooglePlay.png'

import { useSpots } from 'context/SpotContext'

import CategoryTag from 'components/CategoryTag'
import Footer from 'components/Footer'
import Header from 'components/Header'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import { BgPage, CategoryStyled, ImageCarousel, ImgApp } from './style'

const SobreACidade: React.FC = () => {
  const setTitle = useTitle()
  const { spot, isLoading, error, fetchSpot } = useSpots()
  const { id } = useParams()

  useEffect(() => {
    setTitle('Sobre a Cidade | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (id) fetchSpot(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  console.log('Spot selecionado', spot)

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        {isLoading && <p>Loading...</p>}
        {error && <h2>Falha de carregamento</h2>}
        <Carousel className="mb-4">
          {!isLoading &&
            !error &&
            Array.isArray(spot?.images) &&
            spot?.images.map((i) => (
              <Carousel.Item key={i.id}>
                <ImageCarousel
                  className="d-block w-100"
                  src={i.src}
                  alt="Imagem do carrosel"
                />
              </Carousel.Item>
            ))}
        </Carousel>
        <Container>
          <Row>
            <Col className="col-8">
              <TitlePage title={spot?.nome} />
              <div className="d-flex mt-3">
                {!isLoading &&
                  !error &&
                  Array.isArray(spot?.categorias) &&
                  spot?.categorias.map((category) => (
                    <CategoryStyled className="me-3" key={category.id}>
                      <p>{category.label}</p>
                    </CategoryStyled>
                  ))}
              </div>
              <div className="mt-3">
                <p className="fs-4">{spot?.descricao_t}</p>
              </div>
              <div className="mt-5">
                <h2>Sobre</h2>
              </div>
              <div className="border-bottom border-secondary" />
            </Col>
            <Col className="col-4">
              <h2 className="fs-3 fw-bold mb-3">Localizaçao</h2>
              <Ratio aspectRatio="1x1">
                <p style={{ backgroundColor: '#888' }}>Mapa 1x1</p>
              </Ratio>
              <h2 className="fs-3 fw-bold mt-3">Conheca nosso app</h2>
              <div className="d-flex mt-3">
                <ImgApp
                  className="img-fluid me-3"
                  src={GooglePlay}
                  alt="Google Play"
                />
                <ImgApp
                  className="img-fluid"
                  src={AppleStore}
                  alt="Apple Store"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(SobreACidade)
