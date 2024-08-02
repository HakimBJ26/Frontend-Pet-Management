export const getEmojiByHealthStatus = (healthStatus) => {
    switch (healthStatus) {
      case 'Good':
        return '😊';
      case 'Fair':
        return '😐';
      case 'Poor':
        return '😟';
      case 'Terrible':
        return '😢';
      default:
        return '🤔'; 
       }
  };
  