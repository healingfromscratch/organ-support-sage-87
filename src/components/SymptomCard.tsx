
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

type Symptom = {
  id: string;
  text: string;
  score: number;
};

type SymptomCardProps = {
  title: string;
  icon: React.ReactNode;
  symptoms: Symptom[];
  index: number;
  updateTotalScore: (category: string, score: number) => void;
};

const SymptomCard = ({ title, icon, symptoms, index, updateTotalScore }: SymptomCardProps) => {
  const [scores, setScores] = useState<{ [key: string]: number }>(
    symptoms.reduce((acc, symptom) => ({ ...acc, [symptom.id]: symptom.score }), {})
  );
  
  const calculateTotal = () => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };
  
  useEffect(() => {
    updateTotalScore(title, calculateTotal());
  }, [scores, title, updateTotalScore]);

  const handleScoreChange = (id: string, value: number[]) => {
    setScores((prev) => ({ ...prev, [id]: value[0] }));
  };

  return (
    <motion.div 
      className="questionnaire-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sage-600">
          {icon}
        </div>
        <h3 className="text-xl font-serif text-sage-800">{title} Symptoms</h3>
      </div>
      
      <div className="space-y-5">
        {symptoms.map((symptom, i) => (
          <div key={symptom.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor={symptom.id} className="text-sage-700">
                {symptom.text}
              </label>
              <span className="w-8 h-8 rounded-md bg-sage-100 border border-sage-300 flex items-center justify-center font-medium text-sage-800">
                {scores[symptom.id]}
              </span>
            </div>
            <Slider
              id={symptom.id}
              min={0}
              max={3}
              step={1}
              value={[scores[symptom.id]]}
              onValueChange={(value) => handleScoreChange(symptom.id, value)}
              className="no-print"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-5 pt-3 border-t border-sage-200 flex justify-between items-center">
        <span className="text-sage-700 font-medium">Total Score:</span>
        <div className="w-12 h-9 rounded-md bg-sage-100 border border-sage-300 flex items-center justify-center text-sage-800 font-medium">
          {calculateTotal()}
        </div>
      </div>
    </motion.div>
  );
};

export default SymptomCard;
