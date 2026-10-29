import { TagContainer } from './style'

export interface TagProps {
  children: string
}

export default function Tag({ children }: TagProps) {
  return <TagContainer>{children}</TagContainer>
}
