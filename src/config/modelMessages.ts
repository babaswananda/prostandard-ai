export const MODEL_MESSAGES = {
  "personal-stylist": "Welcome to your Personal Stylist! I specialize in creating perfect outfit combinations with our luxury athletic wear. How can I help style you today?",
  "size-expert": "I'm your Size Expert! Let me help you find the perfect fit across our collections. What piece are you interested in?",
  "trend-advisor": "As your Trend Advisor, I'll keep you updated on our latest releases and upcoming collections. What trends are you interested in?",
  "team-specialist": "I'm your Team Specialist! I can help you explore our exclusive team collections and limited editions. Which team are you passionate about?"
} as const;

export type ModelType = keyof typeof MODEL_MESSAGES;