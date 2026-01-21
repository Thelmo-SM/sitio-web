export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);
  // Estos nombres deben coincidir exactamente con tus variables de entorno (.env)
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

  try {
    const cloudName = "dshdpzx6d"; // Tu cloud name directo
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.secure_url; // Esta es la URL final
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    return null;
  }
};