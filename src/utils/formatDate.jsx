export function formatDateTime(dateString) {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const strTime = hours + ':' + minutes + ' ' + ampm;
  
    return `${year}-${month}-${day} ${strTime}`;
  }

  export const convertSleepToHours = (duration) => {
    const [hours, minutes] = duration.split(/[h|m]/).filter(Boolean);
    return parseInt(hours) + (parseInt(minutes) / 60);
  };