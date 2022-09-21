import { memo, useEffect } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { BsCheckCircle } from 'react-icons/bs'
import { HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi'
import SVG from 'react-inlinesvg'
import { useParams } from 'react-router-dom'

import AppleStore from 'assets/AppleStore.png'
import GooglePlay from 'assets/GooglePlay.png'

import 'react-loading-skeleton/dist/skeleton.css'

import { useSpaces } from 'context/SpaceContext'

import BannerSlider from 'components/BannerSlider'
import Footer from 'components/Footer'
import Header from 'components/Header'
import MapLocation from 'components/MapLocation'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import { BgPage, CategoryStyled, IconStyle, ImgApp } from './style'

const EspacoParaEventoSelecionado: React.FC = () => {
  const setTitle = useTitle()
  const { space, isLoading, error, fetchSpace } = useSpaces()
  const { id } = useParams()

  useEffect(() => {
    setTitle('Sobre a Cidade | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (id) fetchSpace(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        {isLoading && <p>Loading...</p>}
        {error && <h2>Falha de carregamento</h2>}
        {!isLoading && !error && space && (
          <>
            {Array.isArray(space.images) && space.images.length > 0 && (
              <BannerSlider banner={space} />
            )}
            <Container>
              <Row className="mb-5">
                <Col className="col-12 col-lg-8">
                  <TitlePage title={space.nome} />
                  <div className="d-flex flex-wrap mt-3">
                    {!isLoading &&
                      !error &&
                      Array.isArray(space.categorias) &&
                      space.categorias.map((category) => (
                        <CategoryStyled className="me-3" key={category.id}>
                          <p>{category.label}</p>
                        </CategoryStyled>
                      ))}
                  </div>
                  <div className="mt-3">
                    <p className="fs-5">{space.descricao_t}</p>
                  </div>
                  {Array.isArray(space.addresses) && (
                    <div className="mt-5">
                      <h2>Sobre</h2>
                      <div className="border-bottom border-secondary mb-3" />
                      {space.addresses.map((i) => (
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

                      {space.phones.map((i) => (
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
                  {Array.isArray(space.dicas_t) && (
                    <div className="mt-4">
                      <h2>Dicas</h2>
                      <div className="border-bottom border-secondary mb-3" />
                      <p>{space?.dicas_t}</p>
                    </div>
                  )}
                  {Array.isArray(space.viajantes) && (
                    <div className="mt-4">
                      <h2>Tipos de Viajantes</h2>
                      <div className="border-bottom border-secondary mb-3" />
                      <Row className="row-cols-3">
                        {space.viajantes.map((i) => (
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
                  {Array.isArray(space.estruturas) &&
                    space.estruturas.length > 0 && (
                      <div className="mt-4">
                        <h2>Estruturas</h2>
                        <div className="border-bottom border-secondary mb-3" />
                        <Row className="row-cols-3">
                          {space.estruturas.map((i) => (
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
                  {Array.isArray(space.restricoes) &&
                    space.restricoes.length > 0 && (
                      <div className="mt-4">
                        <h2>Restricoes</h2>
                        <div className="border-bottom border-secondary mb-3" />
                        <Row className="row-cols-3">
                          {space.restricoes.map((i) => (
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
                  {/* {Array.isArray(space.addresses) &&
                    space.addresses.length > 0 && <MapLocation item={space} />} */}
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

export default memo(EspacoParaEventoSelecionado)
