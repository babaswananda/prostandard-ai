import { MODEL_MESSAGES, ModelType } from "@/config/modelMessages";

export const useModelSelection = () => {
  const handleModelSelect = (model: ModelType) => {
    const message = MODEL_MESSAGES[model];
    console.log(message);
    // Here you would typically update the model and message in your application state
  };

  return { handleModelSelect };
};