
import { motion } from "framer-motion";
import { Leaf, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductUrl } from "@/utils/product-urls";

type SupportData = {
  organ: string;
  lifestyle: string[];
  nutrition: string[];
  herbs: string[];
};

type SupportDetailsProps = {
  data: SupportData;
};

const SupportDetails = ({ data }: SupportDetailsProps) => {
  const renderList = (items: string[]) => (
    <ul className="space-y-1 list-disc pl-5">
      {items.map((item, index) => (
        <li key={index} className="text-sage-700 text-sm">
          {item.includes("Breathwork") || item.includes("Diaphragmatic breathing") ? (
            <a 
              href="https://www.instagram.com/reel/C8Ihw0bRXcp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-sage-500 underline"
            >
              {item}
            </a>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <motion.div 
      className="bg-white rounded-xl border border-sage-200 shadow-sm overflow-hidden no-print"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      key={data.organ}
    >
      <div className="bg-sage-50 p-4 border-b border-sage-200">
        <h3 className="text-xl font-serif text-sage-800 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-sage-500" />
          Supporting Your {data.organ}
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium text-sage-800 mb-3">Lifestyle Practices</h4>
            <div className="bg-sage-50 rounded-lg p-4 border border-sage-200 text-sage-700">
              {renderList(data.lifestyle)}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sage-800 mb-3">Nutrition Support</h4>
            <div className="bg-sage-50 rounded-lg p-4 border border-sage-200 text-sage-700">
              {renderList(data.nutrition)}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sage-800 mb-3">Herbal Allies</h4>
            <div className="bg-sage-50 rounded-lg p-4 border border-sage-200">
              <div className="flex flex-wrap gap-2">
                {data.herbs.map((herb, i) => (
                  <span key={herb} className="herb-tag">
                    {herb}
                  </span>
                ))}
              </div>
              {data.organ === "Digestion" && (
                <p className="mt-3 text-sage-600 italic font-medium">
                  *Note: These are general herbal recommendations. If you have bloating or SIBO, Fennel, Plantain and Chamomile may not be supportive. See a Functional Dietitian for more support.
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center space-y-4">
          <Button
            variant="outline"
            className="text-sage-700 border-sage-300 hover:bg-sage-100"
            onClick={() => window.open(getProductUrl(data.organ), '_blank')}
          >
            Shop {data.organ} Support Products
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
          
          <p className="text-sage-600 text-sm">
            Begin with gentle support for this system. Some of the herbs listed in this guide can interact with medication. Always consult with a healthcare provider before starting any new health regimen. For more support, <a href="https://calendly.com/healingfromscratch/customhealthroadmap" target="_blank" rel="noopener noreferrer" className="text-sage-600 underline hover:text-sage-800">click here</a> to schedule a Custom Health Roadmap Session.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SupportDetails;
