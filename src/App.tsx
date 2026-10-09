import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/Globals';
import Cart from './components/elements/Cart';

import { Provider } from 'react-redux';
import { store } from './store';
import Rotas from './routes';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyle />
        <Rotas />
        <Cart />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
