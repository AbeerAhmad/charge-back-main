export type SubscriptionFormValues = {
  app: string;
  amount: number;
  category: string;
  startDate: string;
  frequency: "Weekly" | "Monthly" | "Yearly";
  remindMe: string;
  active: boolean;
};

