import * as Yup from "yup";

export const subscriptionValidationSchema = Yup.object().shape({
  app: Yup.string()
    .required("App name is required")
    .min(2, "App name must be at least 2 characters")
    .max(50, "App name must be less than 50 characters"),
  amount: Yup.number()
    .required("Amount is required")
    .min(0.01, "Amount must be greater than 0")
    .max(100000, "Amount must be less than 100,000"),
  category: Yup.string().required("Category is required"),
  startDate: Yup.string().required("Start date is required"),
  frequency: Yup.string()
    .oneOf(["Weekly", "Monthly", "Yearly"], "Invalid frequency")
    .required("Frequency is required"),
  remindMe: Yup.string().required("Remind me option is required"),
  active: Yup.boolean(),
});

export type SubscriptionFormValues = {
  app: string;
  amount: number;
  category: string;
  startDate: string;
  frequency: "Weekly" | "Monthly" | "Yearly";
  remindMe: string;
  active: boolean;
};

