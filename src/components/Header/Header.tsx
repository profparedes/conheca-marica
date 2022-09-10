import { memo, useState } from 'react'

import { Container, Offcanvas } from 'react-bootstrap'
import { AiOutlineMenu, AiFillHome, AiOutlineInfoCircle } from 'react-icons/ai'
import { BiRestaurant } from 'react-icons/bi'
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsCalendarWeek,
} from 'react-icons/bs'
import {
  FaUmbrellaBeach,
  FaBed,
  FaMotorcycle,
  FaTicketAlt,
  FaRoute,
} from 'react-icons/fa'
import { GiMicrophone } from 'react-icons/gi'
import { MdStoreMallDirectory } from 'react-icons/md'
import { SiSnapcraft } from 'react-icons/si'
import { Link } from 'react-router-dom'

import LogoConhecaMarica from 'assets/LogoConhecaMarica.png'
import LogoMarica from 'assets/LogoMarica.png'

import { CanvasContainer, HeaderContainer, MenuStyle } from './style'

const Header: React.FC = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <HeaderContainer>
        <Container className="d-flex align-items-center justify-content-md-between">
          <MenuStyle
            className="d-none d-md-flex align-items-center"
            onClick={() => setShow(true)}
          >
            <div className="mb-1 me-2">
              <AiOutlineMenu />
            </div>
            <p>Menu</p>
          </MenuStyle>
          <Link to="/" className="d-none d-md-flex">
            <img
              src={LogoConhecaMarica}
              alt="Conheça Marica"
              className="img-fluid"
            />
          </Link>
          <div className="d-none d-md-flex">
            <BsFacebook color="fff" size={24} className="me-3" />
            <BsInstagram color="fff" size={24} className="me-3" />
            <BsTwitter color="fff" size={24} className="me-3" />
            <BsYoutube color="fff" size={24} />
          </div>
        </Container>
        <div className="d-flex d-md-none align-items-center">
          <MenuStyle className="" onClick={() => setShow(true)}>
            <div className="ms-3">
              <AiOutlineMenu />
            </div>
          </MenuStyle>
          <Link to="/" className="mx-auto">
            <img src={LogoMarica} alt="Marica" className="img-fluid" />
          </Link>
        </div>
      </HeaderContainer>
      <CanvasContainer show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton className="justify-content-end" />
        <Offcanvas.Body>
          <ul>
            <li className="d-flex algin-items-center">
              <AiFillHome className="mt-1 me-3" />
              Inícial
            </li>
            <li className="d-flex algin-items-center">
              <AiOutlineInfoCircle className="mt-1 me-3" />
              Sobre a cidade
            </li>
            <li className="d-flex algin-items-center">
              <FaUmbrellaBeach className="mt-1 me-3" />
              Pontos Turísticos
            </li>
            <li className="d-flex algin-items-center">
              <FaBed className="mt-1 me-3" />
              Hotéis e Pousadas
            </li>
            <li className="d-flex algin-items-center">
              <BiRestaurant className="mt-1 me-3" />
              Bares e Restaurantes
            </li>
            <li className="d-flex algin-items-center">
              <FaMotorcycle className="mt-1 me-3" />
              Delivery
            </li>
            <li className="d-flex algin-items-center">
              <MdStoreMallDirectory className="mt-1 me-3" />
              Comércio Local
            </li>
            <li className="d-flex algin-items-center">
              <FaTicketAlt className="mt-1 me-3" />
              Cupons de Desconto
            </li>
            <li className="d-flex algin-items-center">
              <GiMicrophone className="mt-1 me-3" />
              Espaços para Eventos
            </li>
            <li className="d-flex algin-items-center">
              <BsCalendarWeek className="mt-1 me-3" />
              Eventos
            </li>
            <li className="d-flex algin-items-center">
              <FaRoute className="mt-1 me-3" />
              Roteiros Turísticos
            </li>
            <li className="d-flex algin-items-center">
              <SiSnapcraft className="mt-1 me-3" />
              Artesanato
            </li>
          </ul>
        </Offcanvas.Body>
      </CanvasContainer>
    </>
  )
}

export default memo(Header)
