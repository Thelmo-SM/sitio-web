export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
  formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dshdpzx6d/image/upload`,
      { method: 'POST', body: formData }
    );
    const data = await response.json();
    return data.secure_url; // Esta es la URL que guardaremos
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    return null;
  }
};