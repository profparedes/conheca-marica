import React from 'react'

import ReactDOM from 'react-dom/client'

import 'services/i18n'

import 'bootstrap/dist/css/bootstrap.min.css'

import { BannersProvider } from 'context/BannerContext'
import { HotelsProvider } from 'context/HotelContext'
import { RestaurantsProvider } from 'context/RestaurantContext'
import { SpotsProvider } from 'context/SpotContext'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RestaurantsProvider>
      <HotelsProvider>
        <SpotsProvider>
          <BannersProvider>
            <App />
          </BannersProvider>
        </SpotsProvider>
      </HotelsProvider>
    </RestaurantsProvider>
  </React.StrictMode>,
)
