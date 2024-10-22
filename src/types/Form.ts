export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string; // Optional
  address: {
    street: string;
    country: Country | null;
    city: City | null;
  };
  billingAddress?: {
    street: string;
    country: Country | null;
    city: City | null;
  };
  nameOnCard: string;
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
