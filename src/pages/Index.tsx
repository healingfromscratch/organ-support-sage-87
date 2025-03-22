
import { useState } from "react";
import { Activity, Utensils, Droplets, Radiation, Wind } from "lucide-react";
import Header from "@/components/Header";
import Instructions from "@/components/Instructions";
import SymptomCard from "@/components/SymptomCard";
import SupportGuide from "@/components/SupportGuide";
import { symptomsData } from "@/data/symptoms";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Activity":
      return <Activity className="h-5 w-5" />;
    case "Utensils":
      return <Utensils className="h-5 w-5" />;
    case "Droplets":
      return <Droplets className="h-5 w-5" />;
    case "Radiation":
      return <Radiation className="h-5 w-5" />;
    case "Wind":
      return <Wind className="h-5 w-5" />;
    default:
      return <Activity className="h-5 w-5" />;
  }
};

const Index = () => {
  const [scores, setScores] = useState<{ [key: string]: number }>({
    Liver: 0,
    Digestion: 0,
    Kidneys: 0,
    "Skin/Lymph": 0,
    Lungs: 0
  });

  const updateTotalScore = (category: string, score: number) => {
    setScores(prev => ({ ...prev, [category]: score }));
  };

  return (
    <div className="min-h-screen bg-sage-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <Header />
        <Instructions />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {symptomsData.map((categoryData, index) => (
            <SymptomCard
              key={categoryData.category}
              title={categoryData.category}
              icon={getIconComponent(categoryData.icon)}
              symptoms={categoryData.symptoms}
              index={index}
              updateTotalScore={updateTotalScore}
            />
          ))}
        </div>
        
        <SupportGuide scores={scores} />
      </div>
    </div>
  );
};

export default Index;
