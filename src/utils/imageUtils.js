// imageUtils.js (for JavaScript)
// imageUtils.ts (for TypeScript)

export async function compressImage(dataUrl, maxWidth, maxHeight, quality) {
    const image = new Image();
    image.src = dataUrl;
    await new Promise((resolve) => {
      image.onload = resolve;
    });
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const imageWidth = image.width;
    const imageHeight = image.height;
  
    let newWidth = imageWidth;
    let newHeight = imageHeight;
  
    if (imageWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = (imageHeight * maxWidth) / imageWidth;
    }
  
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = (imageWidth * maxHeight) / imageHeight;
    }
  
    canvas.width = newWidth;
    canvas.height = newHeight;
  
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
  
    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
  
    return compressedDataUrl;
  }
  