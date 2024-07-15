import { toast } from 'sonner';

const useToast = () => {
  const showToast = (config) => {
    toast(config.message, {
      type: config.type,
      duration: config.duration,
      style: config.style, // Include style attribute for custom styling
    });
  };

  return { showToast };
};

export default useToast;
