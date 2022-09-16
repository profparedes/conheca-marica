import styled from 'styled-components'

interface ICoverImgProps {
  banner: string
}

export const BgPage = styled.main`
  background-color: #eee;
`

export const BannerMarica = styled.div<ICoverImgProps>`
  background-image: linear-gradient(to bottom, transparent 75%, #eee 100%),
    url(${({ banner }) => banner});
  height: 500px;
  background-size: cover;
`

export const AboutContainer = styled.div`
  margin-top: -100px;
  padding: 30px 30px 30px 30px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  background-color: #fff;
`
