
import { useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-12 text-center no-print">
      <Button 
        onClick={handlePrint}
        className="bg-sage-500 hover:bg-sage-600 text-white"
      >
        Print My Personalized Guide
        <Printer className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PrintButton;
