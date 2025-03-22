
import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";

type SupportCategory = {
  organ: string;
  lifestyle: string;
  nutrition: string;
  herbs: string[];
};

type SupportGuideProps = {
  scores: { [key: string]: number };
};

const supportData: SupportCategory[] = [
  {
    organ: "Liver",
    lifestyle: "Sleep by 10pm",
    nutrition: "Bitter greens (e.g. dandelion, arugula)",
    herbs: ["Milk Thistle", "Dandelion Root", "Schisandra", "Burdock Root"]
  },
  {
    organ: "Digestion",
    lifestyle: "Mindful eating",
    nutrition: "Warm, cooked meals",
    herbs: ["Ginger", "Fennel", "Slippery Elm", "Chamomile"]
  },
  {
    organ: "Kidneys",
    lifestyle: "Stay hydrated with minerals",
    nutrition: "Sea salt + lemon water",
    herbs: ["Nettle", "Parsley", "Corn Silk", "Marshmallow Root"]
  },
  {
    organ: "Skin/Lymph",
    lifestyle: "Dry brushing or sauna",
    nutrition: "Hydrating fruits & omega-3s",
    herbs: ["Red Clover", "Calendula", "Cleavers", "Violet Leaf"]
  },
  {
    organ: "Lungs",
    lifestyle: "Breathwork or fresh air walks",
    nutrition: "Warm soups & teas",
    herbs: ["Mullein", "Elecampane", "Thyme", "Licorice Root"]
  }
];

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
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {getOrgansWithScores().map(({ organ, score }, index) => (
          <motion.button
            key={organ}
            className={`py-3 px-4 rounded-lg border transition-all duration-300 ${
              (selectedOrgan || sortedOrgans[0]) === organ
                ? "bg-sage-400 text-white border-sage-500"
                : "bg-white text-sage-700 border-sage-200 hover:bg-sage-50"
            }`}
            onClick={() => setSelectedOrgan(organ)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
          >
            <div className="font-medium">{organ}</div>
            <div className="text-sm mt-1 opacity-80">Score: {score}</div>
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="bg-white rounded-xl border border-sage-200 shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        key={selectedData.organ}
      >
        <div className="bg-sage-50 p-4 border-b border-sage-200">
          <h3 className="text-xl font-serif text-sage-800 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-sage-500" />
            Supporting Your {selectedData.organ}
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-sage-800 mb-3">Lifestyle Tool</h4>
              <div className="bg-sage-50 rounded-lg p-4 border border-sage-200 text-sage-700">
                {selectedData.lifestyle}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sage-800 mb-3">Nutrition Tool</h4>
              <div className="bg-sage-50 rounded-lg p-4 border border-sage-200 text-sage-700">
                {selectedData.nutrition}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sage-800 mb-3">Herbal Allies</h4>
              <div className="bg-sage-50 rounded-lg p-4 border border-sage-200">
                <div className="flex flex-wrap gap-2">
                  {selectedData.herbs.map((herb, i) => (
                    <span key={herb} className="herb-tag">
                      {herb}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sage-600 text-sm">
              Begin with gentle support for this system. Always consult with a healthcare provider before starting any new health regimen.
            </p>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-12 text-center no-print">
        <button 
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
        >
          Print Your Personalized Guide
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default SupportGuide;
