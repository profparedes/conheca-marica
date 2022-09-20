import styled from 'styled-components'

interface ICoverImgProps {
  capa: string
}

export const CoverImg = styled.div<ICoverImgProps>`
  background-image: url(${({ capa }) => capa});
  background-size: cover;
  background-position: center center;
  border-radius: 6px 6px 0 0;
`

export const CardContainer = styled.div`
  background: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 10px 1px #ddd;

  h2 {
    color: #2e677f;
    font-size: 22px;
    font-weight: bold;
  }
`
export const CategoryStyle = styled.p`
  color: #666;
  background: #ddd;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0 18px 0 18px;
  border-radius: 14px;
`
