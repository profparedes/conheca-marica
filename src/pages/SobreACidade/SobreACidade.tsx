import { memo, useEffect } from 'react'

import { Container } from 'react-bootstrap'

import BannerAbout from 'assets/BannerAbout.jpg'

import { useAbout } from 'context/AboutContext'

import Footer from 'components/Footer'
import Header from 'components/Header'
import TitlePage from 'components/TitlePage'

import useTitle from 'hooks/useTitle'

import { AboutContainer, BannerMarica, BgPage } from './style'

const SobreACidade: React.FC = () => {
  const setTitle = useTitle()
  const { about, isLoading, error, fetchAbout } = useAbout()

  useEffect(() => {
    setTitle('Sobre a Cidade | Conheça Maricá | Guia Turistico')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchAbout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <BannerMarica banner={BannerAbout} />
        <Container>
          <AboutContainer>
            <TitlePage title="Conheça Maricá" />
            {isLoading && <p>Loading...</p>}
            {error && <p>Falha no Carregamento</p>}
            {!isLoading && !error && about && (
              <div
                className="mt-4"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: about.sobre.content }}
              />
            )}
          </AboutContainer>
        </Container>
      </BgPage>
      <Footer />
    </>
  )
}

export default memo(SobreACidade)
