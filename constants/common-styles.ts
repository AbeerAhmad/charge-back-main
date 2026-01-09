import { StyleSheet } from "react-native";
import { Colors } from "./colors";

/**
 * Common reusable styles used across multiple components
 * Import these styles to avoid duplication
 */

export const CommonStyles = StyleSheet.create({
  // Card/Section styles
  card: {
    backgroundColor: Colors.sectionBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },
  cardWithShadow: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  sectionContainer: {
    backgroundColor: Colors.sectionBackground,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },

  // Header styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },

  // Button styles
  primaryButton: {
    padding: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  circularButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  // Field/Form styles
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  fieldLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
  fieldValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
    marginRight: 8,
  },
  fieldError: {
    borderBottomColor: Colors.error,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 0,
  },

  // Pill/Badge styles
  pill: {
    backgroundColor: Colors.datePillBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pillText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },

  // Text styles
  textPrimary: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
  textSecondary: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
  textLarge: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  textXLarge: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
  },

  // Arrow indicator
  arrow: {
    fontSize: 12,
    color: Colors.text,
  },
});
