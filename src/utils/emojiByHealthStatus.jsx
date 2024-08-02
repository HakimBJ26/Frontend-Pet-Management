export const getEmojiByHealthStatus = (healthStatus) => {
    switch (healthStatus) {
      case 'GOOD':
        return '😊';
      case 'FAIR':
        return '😐';
      case 'POOR':
        return '😟';
      case 'TERRIBLE':
        return '😢';
      default:
        return '🤔'; 
       }
  };
  