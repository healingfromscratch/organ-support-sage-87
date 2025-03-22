
import { ArrowRight } from "lucide-react";

const PrintButton = () => {
  return (
    <div className="mt-12 text-center no-print">
      <button 
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
      >
        Print Your Personalized Guide
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PrintButton;
