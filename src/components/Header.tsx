
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="mb-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <Leaf className="h-6 w-6 text-sage-500" />
        <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-sage-800">
          Organs of Elimination
        </h1>
      </div>
      <h2 className="text-xl md:text-2xl font-serif text-sage-600 italic">
        Questionnaire & Support Guide
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-sage-700">
        Discover which elimination pathways need the most support for optimal health and wellbeing.
      </p>
    </motion.header>
  );
};

export default Header;
