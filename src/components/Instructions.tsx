
import { motion } from "framer-motion";

const Instructions = () => {
  return (
    <motion.div 
      className="mb-8 max-w-2xl mx-auto bg-sage-50 rounded-lg border border-sage-200 p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-serif mb-3 text-sage-800">How to Use This Questionnaire:</h3>
      <p className="text-sage-700 mb-4">
        Score each symptom based on how often you experience it:
      </p>
      <div className="flex justify-center gap-4 md:gap-8 text-sm md:text-base mb-4">
        <div className="flex flex-col items-center">
          <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-sage-200 mb-1">0</span>
          <span className="text-sage-600">Never</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-8 h-8 flex items-center justify-center bg-sage-100 rounded-full border border-sage-200 mb-1">1</span>
          <span className="text-sage-600">Occasionally</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-8 h-8 flex items-center justify-center bg-sage-200 rounded-full border border-sage-300 mb-1">2</span>
          <span className="text-sage-600">Frequently</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-8 h-8 flex items-center justify-center bg-sage-300 rounded-full border border-sage-400 mb-1">3</span>
          <span className="text-sage-600">Always</span>
        </div>
      </div>
      <p className="text-sage-700">
        Tally each section's total to identify which organs may need the most support.
      </p>
    </motion.div>
  );
};

export default Instructions;
