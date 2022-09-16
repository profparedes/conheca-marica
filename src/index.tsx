import React from 'react'

import ReactDOM from 'react-dom/client'

import 'services/i18n'

import 'bootstrap/dist/css/bootstrap.min.css'

import { AboutProvider } from 'context/AboutContext'
import { BannersProvider } from 'context/BannerContext'
import { EventsProvider } from 'context/EventContext'
import { HotelsProvider } from 'context/HotelContext'
import { RestaurantsProvider } from 'context/RestaurantContext'
import { SpacesProvider } from 'context/SpaceContext'
import { SpotsProvider } from 'context/SpotContext'
import { StoresProvider } from 'context/StoreContext'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AboutProvider>
      <EventsProvider>
        <SpacesProvider>
          <StoresProvider>
            <RestaurantsProvider>
              <HotelsProvider>
                <SpotsProvider>
                  <BannersProvider>
                    <App />
                  </BannersProvider>
                </SpotsProvider>
              </HotelsProvider>
            </RestaurantsProvider>
          </StoresProvider>
        </SpacesProvider>
      </EventsProvider>
    </AboutProvider>
  </React.StrictMode>,
)
