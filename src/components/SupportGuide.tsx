
import { motion } from "framer-motion";
import { useState } from "react";
import { supportData } from "../data/symptoms";
import OrganSelector from "./support-guide/OrganSelector";
import SupportDetails from "./support-guide/SupportDetails";
import PrintView from "./support-guide/PrintView";
import PrintButton from "./support-guide/PrintButton";
import { useToast } from "@/hooks/use-toast";
import { useOrganSelection } from "@/hooks/use-organ-selection";
import { getHighScoringOrgans, getAllOrgansWithScores, sendEmail } from "@/services/email-service";

type SupportGuideProps = {
  scores: { [key: string]: number };
};

const SupportGuide = ({ scores }: SupportGuideProps) => {
  const { toast } = useToast();
  const { 
    selectedOrgan, 
    setSelectedOrgan,
    sortedOrgans, 
    getOrgansWithScores,
    getSelectedData
  } = useOrganSelection(scores);
  
  const selectedData = getSelectedData();
  
  const handleSendEmail = async (email: string) => {
    try {
      await sendEmail(email, scores);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
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
        highScoringOrgans={getHighScoringOrgans(scores)} 
        supportData={supportData}
      />
      
      <PrintButton onSendEmail={handleSendEmail} />
    </motion.div>
  );
};

export default SupportGuide;
