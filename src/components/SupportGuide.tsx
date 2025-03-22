
import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";
import { supportData } from "../data/symptoms";

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
  
  const renderList = (items: string[]) => (
    <ul className="space-y-1 list-disc pl-5">
      {items.map((item, index) => (
        <li key={index} className="text-sage-700 text-sm">
          {item}
        </li>
      ))}
    </ul>
  );

  const renderPrintList = (items: string[]) => (
    <ul className="space-y-0.5 list-disc pl-4">
      {items.map((item, index) => (
        <li key={index} className="text-sage-700 text-xs">
          {item}
        </li>
      ))}
    </ul>
  );
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 no-print">
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
        className="bg-white rounded-xl border border-sage-200 shadow-sm overflow-hidden no-print"
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
              <h4 className="font-medium text-sage-800 mb-3">Lifestyle Practices</h4>
              <div className="bg-sage-50 rounded-lg p-4 border border-sage-200 text-sage-700">
                {renderList(selectedData.lifestyle)}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sage-800 mb-3">Nutrition Support</h4>
              <div className="bg-sage-50 rounded-lg p-4 border border-sage-200 text-sage-700">
                {renderList(selectedData.nutrition)}
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
      
      <div className="hidden print:block">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-sage-800 mb-3">Your Personalized Support Guide</h2>
          {getHighScoringOrgans().length > 0 ? (
            <p className="text-sm text-sage-600 mb-6">
              Top scoring organs: {getHighScoringOrgans().slice(0, 3).map(({organ}) => organ).join(', ')}
            </p>
          ) : (
            <p className="text-sm text-sage-600 mb-6">
              No organs scored 5 or higher. Consider continuing to monitor your symptoms.
            </p>
          )}
        </div>
        
        {getHighScoringOrgans().length > 0 ? (
          getHighScoringOrgans().map(({organ, score}) => {
            const data = supportData.find(item => item.organ === organ);
            if (!data) return null;
            
            return (
              <div key={organ} className="mb-8 page-break-inside-avoid">
                <div className="bg-sage-50 p-3 border-b border-sage-200 rounded-t-lg">
                  <h3 className="text-xl font-serif text-sage-800 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-sage-500" />
                    {organ} Support <span className="text-sm ml-2">(Score: {score})</span>
                  </h3>
                </div>
                
                <div className="p-4 border border-t-0 border-sage-200 rounded-b-lg">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sage-800 text-sm">Lifestyle Practices</h4>
                      <div className="bg-sage-50 rounded-lg p-3 border border-sage-200 text-sage-700">
                        {renderPrintList(data.lifestyle)}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium text-sage-800 text-sm">Nutrition Support</h4>
                      <div className="bg-sage-50 rounded-lg p-3 border border-sage-200 text-sage-700">
                        {renderPrintList(data.nutrition)}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium text-sage-800 text-sm">Herbal Allies</h4>
                      <div className="bg-sage-50 rounded-lg p-3 border border-sage-200">
                        <div className="flex flex-wrap gap-1">
                          {data.herbs.map((herb) => (
                            <span key={herb} className="herb-tag text-xs">
                              {herb}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-6 border border-sage-200 rounded-lg">
            <p className="text-sage-700">
              No organ systems scored 5 or higher. Continue supporting your overall health and monitor your symptoms.
            </p>
          </div>
        )}
        
        <div className="mt-8 text-center text-sm">
          <p className="text-sage-600">
            Begin with gentle support for your highest-scoring systems. Always consult with a healthcare provider before starting any new health regimen.
          </p>
        </div>
      </div>
      
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
