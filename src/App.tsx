import { RouterProvider } from 'react-router-dom';

import router from './routes';
import GlobalStyle from './styles/Globals';
import Cart from './components/elements/Cart';
import { Provider } from 'react-redux';
import { store } from './store/index';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <GlobalStyle />
      <Cart />
    </Provider>
  );
}

export default App;
