import styled from 'styled-components'

import BgBanner from 'assets/BgBanner.png'

export const BgPage = styled.main`
  background-color: #eee;
`
export const FooterBanner = styled.div`
  background-image: url(${BgBanner});
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
  padding-top: 30px;

  h2 {
    color: #fff;
    font-size: 60px;

    @media (max-width: 768px) {
      font-size: 36px;
    }
  }

  p {
    color: #fff;
    font-size: 24px;
  }

  img {
    @media (max-width: 768px) {
      max-width: 120px;
    }
  }
`

// export const BlueBanner = styled.div`
//   position: relative;
//   background-color: #2e677f;
//   height: 500px;
//   max-width: 800px;
// `

// export const WhiteBanner = styled.div`
//   position: relative;
//   left: 800px;
//   top: 0px;
//   background-color: #fff;
//   height: 500px;
//   max-width: 800px;
// `

// export const BlueTriangle = styled.div`
//   position: absolute;
//   width: 0;
//   height: 0;
//   z-index: 1;
//   border-style: solid;
//   border-width: 500px 0 0 240px;
//   border-color: transparent transparent transparent #2e677f;
// `
