import { memo, useEffect } from 'react'

import { Carousel, Col, Container, Ratio, Row } from 'react-bootstrap'
import { BsCheckCircle } from 'react-icons/bs'
import { HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi'
import SVG from 'react-inlinesvg'
import { useParams } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import AppleStore from 'assets/AppleStore.png'
import GooglePlay from 'assets/GooglePlay.png'

import { useSpots } from 'context/SpotContext'

import Footer from 'components/Footer'
import Header from 'components/Header'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import {
  BgPage,
  CategoryStyled,
  IconStyle,
  ImageCarousel,
  ImgApp,
} from './style'

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
          <Row className="mb-5">
            <Col className="col-12 col-lg-8">
              <TitlePage title={spot?.nome} />
              <div className="d-flex flex-wrap mt-3">
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
                <p className="fs-5">{spot?.descricao_t}</p>
              </div>
              <div className="mt-5">
                <h2>Sobre</h2>
                <div className="border-bottom border-secondary mb-3" />
                {spot?.addresses.map((i) => (
                  <p key={i.id} className="fs-5 d-flex align-items-center mt-2">
                    <IconStyle className="me-3">
                      <HiOutlineLocationMarker size={30} />
                    </IconStyle>
                    {i.label}
                  </p>
                ))}
                {spot?.phones.map((i) => (
                  <p key={i.id} className="fs-5 d-flex align-items-center mt-2">
                    <IconStyle className="me-3">
                      <HiOutlinePhone size={30} />
                    </IconStyle>
                    {i.nome}: {i.number}
                  </p>
                ))}
              </div>
              <div className="mt-4">
                <h2>Dicas</h2>
                <div className="border-bottom border-secondary mb-3" />
                <p>{spot?.dicas_t}</p>
              </div>
              <div className="mt-4">
                <h2>Tipos de Viajantes</h2>
                <div className="border-bottom border-secondary mb-3" />
                <Row className="row-cols-3">
                  {spot?.viajantes.map((i) => (
                    <Col className="d-flex align-items-center">
                      <p className="mb-3">
                        <IconStyle className="me-3">
                          <BsCheckCircle size={26} />
                        </IconStyle>
                        {i.label}
                      </p>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="mt-4">
                <h2>Estruturas</h2>
                <div className="border-bottom border-secondary mb-3" />
                <Row className="row-cols-3">
                  {spot?.estruturas.map((i) => (
                    <Col className="d-flex align-items-center">
                      <SVG
                        src={`${i.icone}/menu.svg`}
                        width={22}
                        title="Menu"
                        className="me-3"
                        fill="#6ebd00"
                      />
                      <p className="mb-3">{i.label}</p>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="mt-4">
                <h2>Restricoes</h2>
                <div className="border-bottom border-secondary mb-3" />
                <Row className="row-cols-3">
                  {spot?.restricoes.map((i) => (
                    <Col className="d-flex align-items-center">
                      <ReactSVG src={i.icone} />
                      <p className="mb-3">{i.label}</p>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col className="col-12 col-lg-4">
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
