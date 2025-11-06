import { useMemo } from "react";
import { PeopleSourceInputs } from "@/components/ConfigurationSidebar/types";

// Convert snake_case to Sentence case
const toSentenceCase = (str: string): string => {
  return str
    .split("_")
    .map((word, index) => {
      // Capitalize first letter of first word, lowercase others
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    })
    .join(" ");
};

// Check if a value is empty (null, undefined, empty array, empty string)
const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
};

// Format a value for display
const formatValue = (value: any): string => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (typeof value === "number") {
    return value.toString();
  }
  return String(value);
};

const useFormattedPeopleFilters = (
  filters: Partial<PeopleSourceInputs>
): Map<string, string> => {
  return useMemo(() => {
    const formattedFilters = new Map<string, string>();

    // Iterate through all entries in the filters object
    for (const [key, value] of Object.entries(filters)) {
      // Skip start_from_method
      if (key === "start_from_method") continue;

      // Skip empty values
      if (isEmpty(value)) continue;

      // Convert key to human-readable label
      const label = toSentenceCase(key);

      // Format the value
      const formattedValue = formatValue(value);

      // Add to map
      formattedFilters.set(label, formattedValue);
    }

    return formattedFilters;
  }, [filters]);
};

export default useFormattedPeopleFilters;
