import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const Rotas = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'perfil/:id',
    element: <Profile />,
  },
]);

export default Rotas;
