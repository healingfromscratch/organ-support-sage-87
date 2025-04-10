
import { Leaf } from "lucide-react";
import { getProductUrl } from "@/utils/product-urls";

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

const PrintView = ({ highScoringOrgans, supportData }: PrintViewProps) => {
  const renderPrintList = (items: string[]) => (
    <ul className="space-y-0.5 list-disc pl-4">
      {items.map((item, index) => (
        <li key={index} className="text-sage-700 text-xs">
          {item.includes("Emotional release practices such as") ? (
            <>
              Emotional release practices such as Breathwork <span className="text-sage-500">(www.instagram.com/reel/C8Ihw0bRXcp/)</span>, Mindful Dance, Shaking (TRE), Crying with full permission, Scream therapy
            </>
          ) : item.includes("Diaphragmatic breathing") ? (
            <>
              Diaphragmatic breathing <span className="text-sage-500">(www.instagram.com/reel/C8Ihw0bRXcp/)</span>
              {item.replace("Diaphragmatic breathing", "")}
            </>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="hidden print:block">
      <div className="text-center mb-8">
        <h2 className="text-2xl text-sage-800 mb-3">Your Personalized Support Guide</h2>
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
      
      {supportData.map((data) => {
        const score = highScoringOrgans.find(item => item.organ === data.organ)?.score || 0;
        
        return (
          <div key={data.organ} className="mb-8 page-break-inside-avoid">
            <div className="bg-sage-50 p-3 border-b border-sage-200 rounded-t-lg">
              <h3 className="text-xl text-sage-800 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-sage-500" />
                {data.organ} Support <span className="text-sm ml-2">(Score: {score})</span>
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
                    {data.organ === "Digestion" && (
                      <p className="mt-2 text-sage-600 italic font-medium text-xs">
                        *Note: These are general herbal recommendations. If you have bloating or SIBO, Fennel, Plantain and Chamomile may not be supportive. See a Functional Dietitian for more support.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sage-700 text-xs overflow-hidden text-ellipsis">
                  Shop {data.organ} Support Products: {getProductUrl(data.organ)}
                </p>
                <p className="text-sage-600 text-xs mt-2">
                  Begin with gentle support for this system. Some of the herbs listed in this guide can interact with medication. Always consult with a healthcare provider before starting any new health regimen. For more support: calendly.com/healingfromscratch/customhealthroadmap
                </p>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="mt-8 text-center text-sm">
        <p className="text-sage-600">
          Begin with gentle support for your highest-scoring systems. Always consult with a healthcare provider before starting any new health regimen.
        </p>
      </div>
    </div>
  );
};

export default PrintView;
