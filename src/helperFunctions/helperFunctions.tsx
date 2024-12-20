const formatDate = (dateStr: string) => {
    const date: Date = new Date(dateStr);
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    return `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}-${year}`;
  };
  
  export { formatDate };