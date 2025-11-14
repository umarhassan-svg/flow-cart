import type React from "react";
import type { Option } from "../../utils/getCheckoutData";

export type Props = {
  name: string;
  email: string;
  countryCode: string; // e.g. "+1"
  contact: string; // rest of number
  delivery: "delivery" | "pickup";
  country: string;
  state: string;
  zip: string;
  address: string;
  notes: string;

  loading?: boolean;
  disabled?: boolean;
  submitLabel?: string;
  className?: string;

  countryOptions?: Option[];
  stateOptions?: Option[];

  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onCountryCode: (v: string) => void;
  onContact: (v: string) => void;
  onDelivery: (v: "delivery" | "pickup") => void;
  onCountry: (v: string) => void;
  onState: (v: string) => void;
  onZip: (v: string) => void;
  onAddress: (v: string) => void;
  onNotes: (v: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
};
