export type Cabin = {
  id: string;
  name: string;
  capacity: number;
  price: number;
  discount: number;
  description: string;
};

export type SettingsType = {
  minimumNights: number;
  maximumNights: number;
  maximumGuests: number;
  breakfastPrice: number;
};
