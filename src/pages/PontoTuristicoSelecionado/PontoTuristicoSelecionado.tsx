import { memo, useEffect } from 'react'

import { Col, Container, Ratio, Row } from 'react-bootstrap'
import { BsCheckCircle } from 'react-icons/bs'
import { HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi'
import SVG from 'react-inlinesvg'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'

import AppleStore from 'assets/AppleStore.png'
import GooglePlay from 'assets/GooglePlay.png'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useSpots } from 'context/SpotContext'

import Footer from 'components/Footer'
import Header from 'components/Header'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import { BgPage, CategoryStyled, CoverBanner, IconStyle, ImgApp } from './style'

const SobreACidade: React.FC = () => {
  const setTitle = useTitle()
  const { spot, isLoading, error, fetchSpot } = useSpots()
  const { id } = useParams()
  const responsive = [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ]

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
        {!isLoading && !error && spot && (
          <>
            {Array.isArray(spot.images) && spot.images.length > 0 && (
              <Slider
                className="mb-4"
                dots
                infinite
                speed={500}
                autoplay
                autoplaySpeed={3000}
                slidesToShow={4}
                slidesToScroll={2}
                initialSlide={0}
                responsive={responsive}
                pauseOnHover
              >
                {spot.images.map((img) => (
                  <div key={img.id}>
                    <CoverBanner
                      style={{ backgroundImage: `url(${img.src})` }}
                    />
                  </div>
                ))}
              </Slider>
            )}
            {/* <Carousel className="mb-4">
              {!isLoading &&
                !error &&
                Array.isArray(spot.images) &&
                spot.images.map((i) => (
                  <Carousel.Item key={i.id}>
                    <ImageCarousel
                      className="d-block w-100"
                      src={i.src}
                      alt="Imagem do carrosel"
                    />
                  </Carousel.Item>
                ))}
            </Carousel> */}
            <Container>
              <Row className="mb-5">
                <Col className="col-12 col-lg-8">
                  <TitlePage title={spot.nome} />
                  <div className="d-flex flex-wrap mt-3">
                    {!isLoading &&
                      !error &&
                      Array.isArray(spot.categorias) &&
                      spot.categorias.map((category) => (
                        <CategoryStyled className="me-3" key={category.id}>
                          <p>{category.label}</p>
                        </CategoryStyled>
                      ))}
                  </div>
                  <div className="mt-3">
                    <p className="fs-5">{spot.descricao_t}</p>
                  </div>
                  {Array.isArray(spot.addresses) && (
                    <div className="mt-5">
                      <h2>Sobre</h2>
                      <div className="border-bottom border-secondary mb-3" />
                      {spot.addresses.map((i) => (
                        <p
                          key={i.id}
                          className="fs-5 d-flex align-items-center mt-2"
                        >
                          <IconStyle className="me-3">
                            <HiOutlineLocationMarker size={30} />
                          </IconStyle>
                          {i.label}
                        </p>
                      ))}

                      {spot.phones.map((i) => (
                        <p
                          key={i.id}
                          className="fs-5 d-flex align-items-center mt-2"
                        >
                          <IconStyle className="me-3">
                            <HiOutlinePhone size={30} />
                          </IconStyle>
                          {i.nome}: {i.number}
                        </p>
                      ))}
                    </div>
                  )}
                  {Array.isArray(spot.dicas_t) && (
                    <div className="mt-4">
                      <h2>Dicas</h2>
                      <div className="border-bottom border-secondary mb-3" />
                      <p>{spot?.dicas_t}</p>
                    </div>
                  )}
                  {Array.isArray(spot.viajantes) && (
                    <div className="mt-4">
                      <h2>Tipos de Viajantes</h2>
                      <div className="border-bottom border-secondary mb-3" />
                      <Row className="row-cols-3">
                        {spot.viajantes.map((i) => (
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
                  )}
                  {Array.isArray(spot.estruturas) &&
                    spot.estruturas.length > 0 && (
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
                    )}
                  {Array.isArray(spot.restricoes) &&
                    spot.restricoes.length > 0 && (
                      <div className="mt-4">
                        <h2>Restricoes</h2>
                        <div className="border-bottom border-secondary mb-3" />
                        <Row className="row-cols-3">
                          {spot?.restricoes.map((i) => (
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
                    )}
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
          </>
        )}
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(SobreACidade)
