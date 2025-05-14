 export const validateField = (value: string, rules: string[] | undefined, fieldName: string): string => {
  if (!rules) return "";
  
  for (const rule of rules) {
    const ruleArray = rule.split(":");
    const ruleName = ruleArray[0];
    
    switch (ruleName) {
      case "required":
        if (!value.trim()) {
          return `${fieldName} is required.`;
        }
        break;
      case "maxLength":
        const maxLength = parseInt(ruleArray[1], 10);
      if (value.length > maxLength) {
          return `${fieldName} must be no more than ${maxLength} characters.`;
        }
        break;
      case "email": 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return `Please enter a valid email address.`;
        }
        break;
      case "isAlpha":
        const alphaRegex = /^[a-zA-Z]+$/;
        if (value && !alphaRegex.test(value)) {
            return `${fieldName} must contain only alphabetical characters.`;
        }
        break;
    }
  }
  return "";
};


