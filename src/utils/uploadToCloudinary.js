export async function uploadImageToCloudinary(file) {
const url = `https://api.cloudinary.com/v1_1/dup1ah30v/image/upload`;

  const formData = new FormData();
  formData.append("file", file);

  // 👇 this must exactly match your preset name
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Cloudinary error:", err);
      throw new Error(err.error?.message || "Cloudinary upload failed");
    }

    const data = await res.json();
    // data.secure_url is what you store in DB
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
}
