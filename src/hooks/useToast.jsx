import { toast } from 'sonner';

const useToast = () => {
  const showToast = (config) => {
    toast(config.message, {
      type: config.type,
      duration: config.duration,
      style: config.style, 
    });
  };

  return { showToast };
};

export default useToast;
