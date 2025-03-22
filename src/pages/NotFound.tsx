
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sage-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-serif font-medium text-sage-800 mb-4">404</h1>
        <p className="text-xl text-sage-600 mb-6">The page you're looking for can't be found</p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Questionnaire
        </a>
      </div>
    </div>
  );
};

export default NotFound;
