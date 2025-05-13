
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'day4bponq', 
  api_key: '682752992272986', 
  api_secret: '22hua_tHocSqmrnBPfRTy9PLVBQ',
  secure: true
});

export const uploadImage = async (file: File) => {
  try {
    // Convert file to base64
    const base64data = await convertToBase64(file);
    
    // Upload to cloudinary
    const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/day4bponq/image/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: base64data,
        upload_preset: 'ml_default',
        api_key: '682752992272986',
      })
    });
    
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
