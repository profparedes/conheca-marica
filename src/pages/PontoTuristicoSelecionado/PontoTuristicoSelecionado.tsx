import { memo, useEffect } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { BsCheckCircle } from 'react-icons/bs'
import { HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi'
import SVG from 'react-inlinesvg'
import { useParams } from 'react-router-dom'

import AppleStore from 'assets/AppleStore.png'
import GooglePlay from 'assets/GooglePlay.png'

import 'react-loading-skeleton/dist/skeleton.css'

import { useSpots } from 'context/SpotContext'

import BannerSlider from 'components/BannerSlider'
import Footer from 'components/Footer'
import Header from 'components/Header'
import MapLocation from 'components/MapLocation'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import { BgPage, CategoryStyled, IconStyle, ImgApp } from './style'

const PontoTuristicoSelecionado: React.FC = () => {
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
        {!isLoading && !error && spot && (
          <>
            {Array.isArray(spot.images) && spot.images.length > 4 && (
              <BannerSlider banner={spot} />
            )}
            {Array.isArray(spot.images) && spot.images.length <= 3 && (
              <div className="d-flex justify-content-center">
                {spot.images.map((image) => (
                  <img
                    style={{ maxWidth: 500 }}
                    key={image.id}
                    src={image.src}
                    alt="Imagem"
                  />
                ))}
              </div>
            )}
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
                          <Col
                            key={i.label}
                            className="d-flex align-items-center"
                          >
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
                          {spot.estruturas.map((i) => (
                            <Col
                              key={i.label}
                              className="d-flex align-items-center"
                            >
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
                          {spot.restricoes.map((i) => (
                            <Col
                              key={i.label}
                              className="d-flex align-items-center"
                            >
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
                  {Array.isArray(spot.addresses) &&
                    spot.addresses.length > 0 && <MapLocation item={spot} />}
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

export default memo(PontoTuristicoSelecionado)
