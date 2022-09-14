import { memo, useCallback, useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { AiOutlineSearch, AiOutlineClear } from 'react-icons/ai'

import { useSpaces } from 'context/SpaceContext'

import CategoryTag from 'components/CategoryTag'
import Footer from 'components/Footer'
import Header from 'components/Header'
import ItemCard from 'components/ItemCard'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import { BgPage, SearchContainer } from './style'

const EspacosParaEventos: React.FC = () => {
  const setTitle = useTitle()
  const [search, setSearch] = useState('')

  const {
    spaces,
    isLoading,
    error,
    spaceCategory,
    fetchSpaces,
    fetchSearchSpaces,
  } = useSpaces()

  useEffect(() => {
    setTitle('Espacos para Eventos | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = useCallback(
    () => fetchSearchSpaces(search),
    [fetchSearchSpaces, search],
  )

  const handleClear = useCallback(() => {
    fetchSpaces()
    setSearch('')
  }, [fetchSpaces])

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <TitlePage title="Espacos para Eventos" />
            <SearchContainer className="d-flex align-items-center">
              <input
                className="w-100 py-2"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar espacos para eventos"
                aria-label="Buscar espacos para eventos"
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

                {search.length > 0 && (
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
              Array.isArray(spaceCategory) &&
              spaceCategory.map((category) => (
                <div key={category.id}>
                  <CategoryTag category={category} />
                </div>
              ))}
          </div>

          <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {!isLoading &&
              !error &&
              Array.isArray(spaces) &&
              spaces.map((item) => (
                <Col key={item.id} className="d-flex">
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

export default memo(EspacosParaEventos)
