import styled from 'styled-components'
import type { TagProps } from '.'
import colors from '../../../styles/colors'

export const TagContainer = styled.div<TagProps>`
  background-color: ${colors.orange};
  color: ${colors.white};
  font-size: 0.75rem;
  font-family: unset;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.25rem;
`
