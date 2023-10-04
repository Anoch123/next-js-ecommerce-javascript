export const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);
  
    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};