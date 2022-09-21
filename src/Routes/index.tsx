import { memo } from 'react'

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'

import Artesanato from 'pages/Artesanato'
import BarERestaurantSelecionado from 'pages/BarERestaurantSelecionado'
import BaresERestaurantes from 'pages/BaresERestaurantes'
import ComercioLocal from 'pages/ComercioLocal'
import ComercioLocalSelecionado from 'pages/ComercioLocalSelecionado'
import CuponsDeDesconto from 'pages/CuponsDeDesconto'
import Delivery from 'pages/Delivery'
import EspacoParaEventoSelecionado from 'pages/EspacoParaEventoSelecionado'
import EspacosParaEventos from 'pages/EspacosParaEventos'
import Eventos from 'pages/Eventos'
import Home from 'pages/Home'
import HoteisEPousadas from 'pages/HoteisEPousadas'
import HoteisEPousadasSelecionado from 'pages/HoteisEPousadasSelecionado'
import NotFound from 'pages/NotFound'
import PontosTuristicos from 'pages/PontosTuristicos'
import PontoTuristicoSelecionado from 'pages/PontoTuristicoSelecionado'
import RoteirosTuristicos from 'pages/RoteirosTuristicos'
import SobreACidade from 'pages/SobreACidade'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/artesanato" element={<Artesanato />} />
        <Route path="/bares-e-restaurantes" element={<BaresERestaurantes />} />
        <Route
          path="/bares-e-restaurantes/:id"
          element={<BarERestaurantSelecionado />}
        />
        <Route path="/comercio-local" element={<ComercioLocal />} />
        <Route
          path="/comercio-local/:id"
          element={<ComercioLocalSelecionado />}
        />
        <Route path="/cupons-de-desconto" element={<CuponsDeDesconto />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/espacos-para-eventos" element={<EspacosParaEventos />} />
        <Route
          path="/espacos-para-eventos/:id"
          element={<EspacoParaEventoSelecionado />}
        />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/hoteis-e-pousadas" element={<HoteisEPousadas />} />
        <Route
          path="/hoteis-e-pousadas/:id"
          element={<HoteisEPousadasSelecionado />}
        />
        <Route path="/pontos-turisticos" element={<PontosTuristicos />} />
        <Route
          path="/pontos-turisticos/:id"
          element={<PontoTuristicoSelecionado />}
        />
        <Route path="/roteiros-turisticos" element={<RoteirosTuristicos />} />
        <Route path="/sobre" element={<SobreACidade />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  )
}

export default memo(Routes)
