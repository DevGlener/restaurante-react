import type { ReactNode } from 'react';
import { CardContainer, CardTags, CardTitle, TagCustom, CardInfos } from './style';

export interface CardProps {
  title: string;
  image: string;
  icon?: string;
  nota?: number;
  infos?: string[];
  children: ReactNode;
  className?: string;
}

export default function Card({
  className,
  title,
  image,
  nota,
  children,
  icon,
  infos = [],
}: CardProps) {
  return (
    <CardContainer className={className}>
      <img src={image} alt={title} />
      <CardTags>
        {infos.map((info) => (
          <TagCustom key={info}>{info}</TagCustom>
        ))}
      </CardTags>
      <CardInfos>
        <CardTitle>
          <h3>{title}</h3>
          <div>
            <h3>{nota}</h3>
            {icon && <img src="{icon}" alt={'imagem do icone'} />}
          </div>
        </CardTitle>
        <span>{children}</span>
      </CardInfos>
    </CardContainer>
  );
}
