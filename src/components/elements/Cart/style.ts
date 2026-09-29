import styled from 'styled-components';
import colors from '../../../styles/colors';
import Button from '../Button';

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.73);
  z-index: 1;
`;

export const CartContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;

  &.is-open {
    display: flex;
  }
`;

export const Sidebar = styled.aside`
  background-color: ${colors.orange};
  width: 22.5rem;
  height: 101.5rem;
  z-index: 1;
  padding: 2rem 0.5rem 0 0.5rem;
`;

export const CardCar = styled.div`
  margin-bottom: 1rem;
  position: relative;
  background-color: ${colors.orangeCard};
  width: 100%;
  height: 6.25rem;
  display: flex;
  padding: 8px;
  gap: 8px;
  color: ${colors.orange};
  h3 {
    margin-bottom: 16px;
  }

  .productImage {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
  }
`;

export const LixeiraImg = styled.img`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 16px;
  height: 16px;
  object-fit: contain;
  cursor: pointer;
`;
export const Precos = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${colors.orangeCard};
`;
export const CartButton = styled(Button)`
  display: block;
  background-color: ${colors.orangeCard};
  color: ${colors.orange};
  width: 100%;
  height: 24px;
  text-align: center;
  cursor: pointer;
  padding: 4px 0;
`;
