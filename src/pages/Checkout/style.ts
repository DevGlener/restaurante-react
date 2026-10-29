import styled from 'styled-components'
import colors from '../../styles/colors'

type InputGroups = {
  maxWidth?: string
}

export const CheckoutContainer = styled.div`
  width: 100%;

  > div {
    margin-top: 24px;
  }

  .butons {
    margin-top: 24px;
  }

  .tiltles {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  form {
    color: ${colors.white};
  }

  button {
    width: 100%;
    height: 24px;
    color: ${colors.orange};
    background-color: ${colors.orangeCard};
    border: none;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 8px;
  }
`

export const InputGroup = styled.div<InputGroups>`
  flex: auto;
  max-width: ${(props) => props.maxWidth || 'auto'};
  display: block;

  label {
    font-weight: bold;
    font-size: 14px;
  }

  input {
    margin-top: 8px;
    display: block;
    width: 100%;
    padding: 0 8px;
    height: 32px;
    outline: none;
  }
  .error {
    border: 3px solid black;
    //deixei na cor pret e mais grossa a
    //borda pq meio que estava impossivel
    //notar diferenca com o do projeto
  }
`

export const Row = styled.div`
  display: flex;
  column-gap: 34px;
  margin-bottom: 8px;
`

export const PersonInfo = styled.div``

export const OrdemConcluida = styled.div`
  color: ${colors.white};

  h2 {
    font-size: 16px;
    font-weight: bold;
  }
  p {
    margin-top: 16px;
    line-height: 22px;
    font-size: 0.875rem;
    font-weight: normal;
  }
  button {
    margin-top: 24px;
    color: ${colors.orange};
    background-color: ${colors.orangeCard};
    font-size: 14px;
    font-weight: bold;
  }
`
