
// We don't need to import the full Cloudinary SDK for browser uploads
// We'll use the Cloudinary Upload API directly

// Cloudinary configuration
const CLOUD_NAME = 'day4bponq';
const API_KEY = '682752992272986';
const UPLOAD_PRESET = 'ml_default';

export const uploadImage = async (file: File) => {
  try {
    // Convert file to base64
    const base64data = await convertToBase64(file);
    
    // Upload to cloudinary
    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: base64data,
        upload_preset: UPLOAD_PRESET,
        api_key: API_KEY,
      })
    });
    
    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const uploadData = await uploadResponse.json();
    return { url: uploadData.secure_url, publicId: uploadData.public_id };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const convertToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
