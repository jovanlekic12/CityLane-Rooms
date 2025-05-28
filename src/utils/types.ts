import { User } from "@supabase/supabase-js";
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
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export type newUser = {
  userPassword: string;
  userEmail: string;
  userFullname: string;
  confirmPassword: string;
};

export type UserProps = {
  user: User | null;
};
