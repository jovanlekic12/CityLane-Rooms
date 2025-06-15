import { Session, User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";

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

export type LogInFormProps = {
  setToken: Dispatch<SetStateAction<Token | null>>;
};

export type newUser = {
  userPassword: string;
  userEmail: string;
  userFullname: string;
  confirmPassword: string;
};

export type UserProps = {
  token: Token | null;
};

export type Token = {
  user: User | null;
  session: Session | null;
};

export type Booking = {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  cabinId: number;
  guestId: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  numGuests: number;
  cabinName: string;
  guests: {
    email: string;
    fullName: string;
    nationalID?: string;
    countryFlag?: string;
  };
  status: string;
  numNights: number;
  totalPrice: number;
  cabins: {
    name: string;
  };
  cabinPrice: number;
  extrasPrice: number;
};

export type GuestType = {
  countryFlag: string;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string;
  nationality: string;
};

export type StatisticsType = {
  name: string;
  value: number;
  date_range: string;
};
