import { memo, useEffect } from 'react'

import { Col, Container, Row } from 'react-bootstrap'

import { usePontos } from 'context/PontosContext'

import CategoryTag from 'components/CategoryTag'
import Footer from 'components/Footer'
import Header from 'components/Header'
import ItemCard from 'components/ItemCard'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import { BgPage } from './style'

const PontosTuristicos: React.FC = () => {
  const setTitle = useTitle()

  const { pontos, isLoading, error, spotCategory, fetchPontos } = usePontos()

  useEffect(() => {
    setTitle('Pontos Turísticos | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('spots array', spotCategory)

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <Container>
          <TitlePage title="Pontos Turísticos" />
          {isLoading && <p className="text-center">Loading...</p>}
          {error && <h2>Falha no carregamento</h2>}
          <div className="d-flex flex-wrap mb-5 mt-3">
            {!isLoading &&
              !error &&
              Array.isArray(spotCategory) &&
              spotCategory.map((category) => (
                <div key={category.id}>
                  <CategoryTag category={category} />
                </div>
              ))}
          </div>

          <Row className="row-cols-3">
            {!isLoading &&
              !error &&
              Array.isArray(pontos) &&
              pontos.map((item) => (
                <Col key={item.id}>
                  <ItemCard item={item} />
                </Col>
              ))}
          </Row>
        </Container>
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(PontosTuristicos)
