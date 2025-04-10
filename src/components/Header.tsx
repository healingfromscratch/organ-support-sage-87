
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return <motion.header className="mb-8 text-center" initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="flex flex-col items-center justify-center gap-2 mb-6">
        <img 
          src="/lovable-uploads/44689fb9-c183-442b-a3cb-b6b8bf8c693c.png" 
          alt="Healing From Scratch" 
          className="h-28 mb-4" 
        />
        <div className="text-center mb-4">
          <p className="text-sage-800">Vanessa Berenstein, MA RD FMN CCH</p>
          <p className="text-sage-600 text-sm">Holistic Dietitian</p>
          <p className="text-sage-600 text-sm">Clinical Herbalist</p>
          <a href="https://linktr.ee/healingfromscratch" target="_blank" rel="noopener noreferrer" className="text-sage-500 text-sm hover:text-sage-700 transition-colors">
            https://linktr.ee/healingfromscratch
          </a>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-1">
        <Leaf className="h-6 w-6 text-sage-500" />
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-sage-800">
          Organs of Elimination
        </h1>
      </div>
      <h2 className="text-xl md:text-2xl text-sage-600 italic">
        Questionnaire & Support Guide
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-sage-700 font-normal">Discover which of your body's elimination pathways need the most support to enhance your overall health and vitality. Fill out the questionnaire as honestly as possible to gain insight into where your system may be most vulnerable and where to focus your support.</p>
    </motion.header>;
};

export default Header;
