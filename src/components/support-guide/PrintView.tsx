
import { Leaf } from "lucide-react";

type OrganScore = {
  organ: string;
  score: number;
};

type SupportData = {
  organ: string;
  lifestyle: string[];
  nutrition: string[];
  herbs: string[];
};

type PrintViewProps = {
  highScoringOrgans: OrganScore[];
  supportData: SupportData[];
};

const getProductUrl = (organ: string): string => {
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

const PrintView = ({ highScoringOrgans, supportData }: PrintViewProps) => {
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
    <div className="hidden print:block">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif text-sage-800 mb-3">Your Personalized Support Guide</h2>
        {highScoringOrgans.length > 0 ? (
          <p className="text-sm text-sage-600 mb-6">
            Top scoring organs: {highScoringOrgans.slice(0, 3).map(({organ}) => organ).join(', ')}
          </p>
        ) : (
          <p className="text-sm text-sage-600 mb-6">
            No organs scored 5 or higher. Consider continuing to monitor your symptoms.
          </p>
        )}
      </div>
      
      {highScoringOrgans.length > 0 ? (
        highScoringOrgans.map(({organ, score}) => {
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                
                <div className="mt-4 text-center">
                  <p className="text-sage-700 text-xs overflow-hidden text-ellipsis">
                    Shop {organ} Support Products: {getProductUrl(organ)}
                  </p>
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
  );
};

export default PrintView;
