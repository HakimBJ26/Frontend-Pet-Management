export const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'red';
      case 'Moderate':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'black';
    }
  };