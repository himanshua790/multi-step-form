export type FormValue = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string; // Optional
  country: Country | null; // Store entire Country object
  city: City | null; // Store entire City object
  creditCard: string;
  expiryDate: string;
  cvv: string;
};

// Country Type
export interface Country {
  label: string;
  value: string;
}

// City Type
export interface City {
  id: number;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  population: number;
}
