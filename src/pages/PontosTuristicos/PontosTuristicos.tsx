import { Fragment, memo, useCallback, useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { AiOutlineSearch, AiOutlineClear } from 'react-icons/ai'

import { usePontos } from 'context/PontosContext'

import CategoryTag from 'components/CategoryTag'
import Footer from 'components/Footer'
import Header from 'components/Header'
import ItemCard from 'components/ItemCard'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import { BgPage, SearchContainer } from './style'

const PontosTuristicos: React.FC = () => {
  const setTitle = useTitle()
  const [busca, setBusca] = useState('')

  const {
    pontos,
    isLoading,
    error,
    spotCategory,
    fetchPontos,
    fetchBuscaPontos,
  } = usePontos()

  useEffect(() => {
    setTitle('Pontos Turísticos | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = useCallback(
    () => fetchBuscaPontos(busca),
    [fetchBuscaPontos, busca],
  )

  const handleClear = useCallback(() => {
    fetchPontos()
    setBusca('')
  }, [fetchPontos])

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <TitlePage title="Pontos Turísticos" />
            <SearchContainer className="d-flex align-items-center">
              <input
                className="w-100 py-2"
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar pontos turísticos"
                aria-label="Buscar pontos turísticos"
                aria-describedby="basic-addon2"
              />
              <div className="d-flex mt-2 mt-sm-0">
                <button
                  className="me-3"
                  type="submit"
                  onClick={handleSearch}
                  id="button-addon2"
                >
                  <AiOutlineSearch size={20} />
                </button>

                {busca.length > 0 && (
                  <button
                    type="submit"
                    onClick={handleClear}
                    id="button-addon2"
                  >
                    <AiOutlineClear size={20} />
                  </button>
                )}
              </div>
            </SearchContainer>
          </div>
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

          <Row className="row-cols-3 g-4">
            {!isLoading &&
              !error &&
              Array.isArray(pontos) &&
              pontos.map((item) => (
                <Col className="d-flex" key={item.id}>
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
