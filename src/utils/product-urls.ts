
/**
 * Returns the product URL for a given organ system
 */
export const getProductUrl = (organ: string): string => {
  switch (organ) {
    case "Liver":
      return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=liver";
    case "Digestion":
      return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=digestive";
    case "Kidneys":
      return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=kidney";
    case "Skin/Lymph":
      return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=lymph";
    case "Lungs":
      return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=hist";
    default:
      return "https://healingfromscratch.gethealthy.store";
  }
};
