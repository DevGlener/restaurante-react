import { Banner } from './style';
import logo from '../../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

interface HeaderProps {
  quantity?: number;
  name?: string;
  text?: string;
}

function Header({ quantity, text, name }: HeaderProps) {
  return (
    <Banner>
      <div className="container">
        <h3>{name}</h3>
        <Link to={'/'}>
          <img src={logo} alt={`ìmagem da ${logo}`} />
        </Link>
        <h3>
          {quantity}
          {text}
        </h3>
      </div>
      <p>Viva experiências gastronômicas no conforto da sua casa</p>
    </Banner>
  );
}

export default Header;
