import { memo, useCallback, useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { AiOutlineSearch, AiOutlineClear } from 'react-icons/ai'

import { useEvents } from 'context/EventContext'

import CategoryTag from 'components/CategoryTag'
import Footer from 'components/Footer'
import Header from 'components/Header'
import ItemCard from 'components/ItemCard'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import { BgPage, SearchContainer } from './style'

const Eventos: React.FC = () => {
  const setTitle = useTitle()
  const [search, setSearch] = useState('')

  const {
    events,
    isLoading,
    error,
    eventCategory,
    fetchEvents,
    fetchSearchEvents,
  } = useEvents()

  useEffect(() => {
    setTitle('Eventos | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = useCallback(
    () => fetchSearchEvents(search),
    [fetchSearchEvents, search],
  )

  const handleClear = useCallback(() => {
    fetchEvents()
    setSearch('')
  }, [fetchEvents])

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <TitlePage title="Eventos" />
            <SearchContainer className="d-flex align-items-center">
              <input
                className="w-100 py-2"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar eventos"
                aria-label="Buscar eventos"
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
              Array.isArray(eventCategory) &&
              eventCategory.map((category) => (
                <div key={category.id}>
                  <CategoryTag category={category} />
                </div>
              ))}
          </div>

          <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {!isLoading &&
              !error &&
              Array.isArray(events) &&
              events.map((item) => (
                <Col key={item.id} className="d-flex">
                  <ItemCard endPoint="eventos" item={item} />
                </Col>
              ))}
          </Row>
        </Container>
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(Eventos)
