export type Option = { value: string; label: string };


const DEFAULT_COUNTRIES: Option[] = [
  { value: "US", label: "United States" },
  { value: "PK", label: "Pakistan" },
  { value: "GB", label: "United Kingdom" },
  { value: "IN", label: "India" },
  { value: "AU", label: "Australia" },
];

const DEFAULT_STATES: Option[] = [
  { value: "default", label: "Select state / province" },
  { value: "CA", label: "California" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
];

const COUNTRY_CODES: Option[] = [
  { value: "+1", label: "+1 (US)" },
  { value: "+92", label: "+92 (PK)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+91", label: "+91 (IN)" },
  { value: "+61", label: "+61 (AU)" },
];


export { DEFAULT_COUNTRIES, DEFAULT_STATES, COUNTRY_CODES };