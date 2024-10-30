// Utility function to set the time to 00:01
export function setStartTime(date: Date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }
  
  export function setEndTime(date: Date) {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 0, 0);
    return newDate;
  }
  