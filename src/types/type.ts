

export type FooterOption = {
  label: string;
  icon: React.ReactNode;
  path?: string;
  action?: "logout" | "custom";
  // Optional custom action callback — can be implemented below if needed
};
