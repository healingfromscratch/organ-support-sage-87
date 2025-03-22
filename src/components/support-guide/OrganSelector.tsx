
import { motion } from "framer-motion";

type OrganSelectorProps = {
  organsWithScores: { organ: string; score: number }[];
  selectedOrgan: string | null;
  defaultOrgan: string;
  onSelectOrgan: (organ: string) => void;
};

const OrganSelector = ({ 
  organsWithScores, 
  selectedOrgan, 
  defaultOrgan,
  onSelectOrgan 
}: OrganSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 no-print">
      {organsWithScores.map(({ organ, score }, index) => (
        <motion.button
          key={organ}
          className={`py-3 px-4 rounded-lg border transition-all duration-300 ${
            (selectedOrgan || defaultOrgan) === organ
              ? "bg-sage-400 text-white border-sage-500"
              : "bg-white text-sage-700 border-sage-200 hover:bg-sage-50"
          }`}
          onClick={() => onSelectOrgan(organ)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
        >
          <div className="font-medium">{organ}</div>
          <div className="text-sm mt-1 opacity-80">Score: {score}</div>
        </motion.button>
      ))}
    </div>
  );
};

export default OrganSelector;
