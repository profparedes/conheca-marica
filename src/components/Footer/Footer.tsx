import { memo } from 'react'

import { Container } from 'react-bootstrap'
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'

import MaricaRecebe from 'assets/MaricaRecebe.png'
import MaricaTurismo from 'assets/MaricaTurismo.png'

import { FooterContainer, ImgMaricaRecebe } from './style'

const Footer: React.FC = () => {
  return (
    <FooterContainer className="py-4">
      <Container className="d-flex flex-column flex-xl-row justify-content-between">
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <BsFacebook color="fff" size={18} className="me-2" />
            <p className="d-none d-sm-flex me-3 text-light">Facebook</p>
            <BsInstagram color="fff" size={18} className="me-2" />
            <p className="d-none d-sm-flex me-3 text-light">Instagram</p>
            <BsTwitter color="fff" size={18} className="me-2" />
            <p className="d-none d-sm-flex me-3 text-light">Twitter</p>
            <BsYoutube color="fff" size={18} className="me-2" />
            <p className="d-none d-sm-flex me-3 text-light">Youtube</p>
          </div>
          <p className="text-center mt-3 text-light h5">Área do Comerciante</p>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
          <ImgMaricaRecebe
            src={MaricaRecebe}
            className="img-fluid"
            alt="Maricá Recebe"
          />
          <div className="mx-4">
            <p className="text-center mt-3 text-light h5">Manual Gastronomia</p>
            <p className="text-center mt-3 text-light h5">Manual Hospedagem</p>
          </div>
          <img src={MaricaTurismo} className="img-fluid" alt="Maricá Turismo" />
        </div>
      </Container>
    </FooterContainer>
  )
}

export default memo(Footer)
