type IcHeartType = 'filled' | 'outlined';

export interface HeartButtonProps {
  iconType: IcHeartType;
  onClick: () => void;
  className: string;
}
