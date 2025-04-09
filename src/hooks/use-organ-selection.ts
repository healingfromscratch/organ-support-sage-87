
import { useState } from "react";
import { supportData } from "../data/symptoms";

/**
 * Custom hook to handle organ selection and sorting
 */
export const useOrganSelection = (scores: { [key: string]: number }) => {
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  
  const sortedOrgans = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([organ]) => organ);
  
  const getOrgansWithScores = () => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([organ, score]) => ({ organ, score }));
  };
  
  const getSelectedData = () => {
    const organ = selectedOrgan || (sortedOrgans.length > 0 ? sortedOrgans[0] : "Liver");
    return supportData.find(item => item.organ === organ) || supportData[0];
  };

  return {
    selectedOrgan,
    setSelectedOrgan,
    sortedOrgans,
    getOrgansWithScores,
    getSelectedData
  };
};
