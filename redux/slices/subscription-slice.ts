import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Subscription {
  id: string;
  app: string;
  amount: number;
  category: string;
  startDate: string;
  frequency: "Weekly" | "Monthly" | "Yearly";
  remindMe: string;
  active: boolean;
  logo?: string;
}

interface SubscriptionState {
  subscriptions: Subscription[];
}

const initialState: SubscriptionState = {
  subscriptions: [
    {
      id: "1",
      app: "Netflix",
      amount: 50.0,
      category: "Loan",
      startDate: "2025-04-12",
      frequency: "Weekly",
      remindMe: "2 days before",
      active: true,
    },
  ],
};

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    addSubscription: (
      state,
      action: PayloadAction<Omit<Subscription, "id">>
    ) => {
      const newSubscription: Subscription = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.subscriptions.push(newSubscription);
    },
    updateSubscription: (state, action: PayloadAction<Subscription>) => {
      const index = state.subscriptions.findIndex(
        (sub) => sub.id === action.payload.id
      );
      if (index !== -1) {
        state.subscriptions[index] = action.payload;
      }
    },
    deleteSubscription: (state, action: PayloadAction<string>) => {
      state.subscriptions = state.subscriptions.filter(
        (sub) => sub.id !== action.payload
      );
    },
  },
});

export const { addSubscription, updateSubscription, deleteSubscription } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;

