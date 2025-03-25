
import { useState } from "react";
import { motion } from "framer-motion";
import { supportData } from "../data/symptoms";
import OrganSelector from "./support-guide/OrganSelector";
import SupportDetails from "./support-guide/SupportDetails";
import PrintView from "./support-guide/PrintView";
import PrintButton from "./support-guide/PrintButton";

type SupportGuideProps = {
  scores: { [key: string]: number };
};

const SupportGuide = ({ scores }: SupportGuideProps) => {
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

  const selectedData = getSelectedData();
  
  const getHighScoringOrgans = () => {
    return Object.entries(scores)
      .filter(([_, score]) => score >= 5)
      .sort(([, a], [, b]) => b - a)
      .map(([organ, score]) => ({ organ, score }));
  };

  return (
    <motion.div 
      className="mt-16 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif text-sage-800 mb-3">Your Support Guide</h2>
        <p className="text-sage-700 max-w-2xl mx-auto">
          Use your top-scoring areas to guide your healing journey. Below are tools to support each organ of elimination using lifestyle practices, nourishing foods, and herbal allies.
        </p>
      </div>
      
      <OrganSelector 
        organsWithScores={getOrgansWithScores()}
        selectedOrgan={selectedOrgan}
        defaultOrgan={sortedOrgans[0]}
        onSelectOrgan={setSelectedOrgan}
      />
      
      <SupportDetails data={selectedData} />
      
      <PrintView 
        highScoringOrgans={getHighScoringOrgans()} 
        supportData={supportData}
      />
      
      <PrintButton />
    </motion.div>
  );
};

export default SupportGuide;
