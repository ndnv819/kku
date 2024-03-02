export interface MenuItem {
  name: string;
  price: string;
}

export interface ShopDTO {
  id: string;
  latitude: string;
  longitude: string;
  name: string;
  category: string;
  openingTime: string;
  address: string;
  tel: string;
  menuList: MenuItem[];
  memo: string;
  introduction: string;
  canParking: boolean;
}
