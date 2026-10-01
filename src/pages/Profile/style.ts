import styled from 'styled-components';
import Card from '../../components/elements/Card';
import colors from '../../styles/colors';
import Button from '../../components/elements/Button';

import Header from '../../components/ui/Header';
import { ContainerBanner } from '../../components/elements/Banner/style';
import { breakpoints } from '../../styles/responsividade';

export const ProfileContainer = styled.div`
  position: relative;

  ${ContainerBanner} {
    position: absolute;
    top: 10.125rem;
    left: 0;
    width: 100%;
    font-size: 2rem;
    font-family: unset;

    h5 {
      font-weight: 100;
    }
    h4 {
      font-weight: bold;
    }
  }
`;
export const ListCards = styled.ul`
  margin: 112px auto 7.5rem auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  @media (max-width: ${breakpoints.smartphone}) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const CardEdit = styled(Card)`
  padding: 0.5rem;
  background-color: ${colors.orange};
  color: ${colors.white};

  img {
    height: 10.375rem;
  }
`;
export const ButonEdit = styled(Button)`
  color: ${colors.orange};
  background-color: ${colors.orangeCard};
  width: 100%;
  height: 24px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const HeaderEdit = styled(Header)`
  height: 11.625rem;
`;

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.73);
`;

export const ModalContainer = styled.div`
  padding: 2rem;
  width: 100%;

  background-color: ${colors.orange};
  position: absolute;
  z-index: 1;
  display: flex;
  color: ${colors.white};
  font-family: unset;

  div {
    display: flex;
    gap: 24px;

    img {
      width: 280px;
      object-fit: cover;
    }
  }

  @media (max-width: ${breakpoints.smartphone}) {
    div {
      display: flex;
      flex-direction: column;
      gap: 24px;
      img {
        width: 100%;
        height: 100px;
      }
    }
  }
`;

export const Fechar = styled.img`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 18px;
    font-weight: 900;
    font-style: black;
  }
  h5 {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    font-style: normal;
  }
  button {
    background-color: ${colors.orangeCard};
    color: ${colors.orange};
    height: 24px;
    width: 218px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    border: none;

    @media (max-width: ${breakpoints.smartphone}) {
      width: 100%;
    }
  }
`;
