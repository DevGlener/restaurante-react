import { BaanerContainer } from './style';

export interface BannerProps {
  name?: string;
  country?: string;
  className?: string;
}

export default function Banner({ name, country, className }: BannerProps) {
  return (
    <BaanerContainer className={className}>
      <div className="container">
        <h5>{country}</h5>
        <h4>{name}</h4>
      </div>
    </BaanerContainer>
  );
}
