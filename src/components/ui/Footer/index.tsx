import { FooterContainer, Redes, LogoFooter } from './style'

import Logo from '../../../assets/images/logo.svg'

import Facebook from '../../../assets/images/iconeFacebook.png'
import Insta from '../../../assets/images/iconeInsta.png'
import Twitter from '../../../assets/images/iconeTwitter.png'

export default function Footer() {
  return (
    <FooterContainer>
      <div className="container">
        <LogoFooter src={Logo} alt="Logo" />
        <Redes>
          <img src={Facebook} alt="Facebook" />
          <img src={Insta} alt="Instagram" />
          <img src={Twitter} alt="Twitter" />
        </Redes>
        <p>
          A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela
          entrega, qualidade dos produtos é toda do estabelecimento contratado.{' '}
        </p>
      </div>
    </FooterContainer>
  )
}
