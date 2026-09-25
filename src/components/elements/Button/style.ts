import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';
import { Link } from 'react-router-dom';

const buttonStyles = css`
  font-size: 0.875rem;
  background-color: ${colors.orange};
  color: ${colors.white};
  width: 5.125rem;
  height: 1.75rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  ${buttonStyles}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;
