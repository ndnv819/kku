export type CardCategory = 'large' | 'medium' | 'small';
export interface Buttons {
  ghostButtonTitle: string;
  filledButtonTitle: string;
  ghostButtonOnClick: () => void;
  filledButtonOnClick: () => void;
}

export interface CardProps {
  category?: CardCategory;
  thumbUrl?: string;
  alt?: string;
  title?: string;
  subTitle?: string;
  description: string;
  caption?: string;
  buttons?: Buttons;
}
