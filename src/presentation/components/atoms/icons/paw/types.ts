export type IcPawStatus = 'active' | 'inactive';

export interface IcPawProps {
  status?: IcPawStatus;
  width?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
}
