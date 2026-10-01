import { createGlobalStyle } from 'styled-components';
import { breakpoints } from './responsividade';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    list-style: none;
  }

  body {

    .container {
      max-width: 64rem;
      width: 100%;
      margin: 0 auto;

      @media (max-width:${breakpoints.desktop}){
        width: 80% ;
      }
    }
  }
`;

export default GlobalStyle;
