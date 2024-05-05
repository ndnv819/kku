export type IcPawStates = 'active' | 'inactive';

export interface IcPawProps {
  states?: IcPawStates;
  width?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
}
