/**
 * Maps display frequency (Annually) to internal frequency (Yearly)
 */
export const mapFrequencyToInternal = (
  freq: string
): "Weekly" | "Monthly" | "Yearly" => {
  if (freq === "Annually") return "Yearly";
  return freq as "Weekly" | "Monthly" | "Yearly";
};

/**
 * Maps internal frequency (Yearly) to display frequency (Annually)
 */
export const mapFrequencyToDisplay = (freq: string): string => {
  if (freq === "Yearly") return "Annually";
  return freq;
};

