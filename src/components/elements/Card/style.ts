import styled from 'styled-components';
import colors from '../../../styles/colors';
import { TagContainer } from '../Tags/style';

export const CardContainer = styled.div`
  border: 0.0625rem solid ${colors.orange};
  color: ${colors.orange};
  /* height: 24.875rem; */
  display: flex;
  flex-direction: column;
  column-gap: 0.5rem;
  position: relative;
  img {
    max-width: 29.5rem;
    width: 100%;
    height: 13.5rem;
    object-fit: cover;
  }
`;

export const CardTags = styled.div`
  width: 11.25rem;
  height: 1.625rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  justify-content: flex-end;
  right: 0.5rem;
  top: 0.5rem;
  gap: 0.5rem;
`;

export const TagCustom = styled(TagContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;
export const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  div {
    display: flex;
    gap: 0.5rem;
  }
`;
export const CardInfos = styled.div`
  padding: 0.5rem;
  height: 100%;
`;
