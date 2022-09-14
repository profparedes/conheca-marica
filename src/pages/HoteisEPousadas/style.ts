import styled from 'styled-components'

export const BgPage = styled.main`
  background-color: #eee;
`

export const SearchContainer = styled.div`
  background-color: #fff;
  border: 1px solid;
  border-radius: 24px;
  padding: 0px 8px 4px 20px;
  width: 400px;

  @media (max-width: 768px) {
    width: 200px;
  }

  input {
    border: none;
    padding: 0;
  }

  input:focus {
    outline: none;
  }

  button {
    background-color: #fff;
    border: none;
  }
`
