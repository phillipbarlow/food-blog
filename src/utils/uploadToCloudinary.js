export async function uploadImageToCloudinary(file) {
  const CLOUD_NAME = "dup1ah30v";
  const UPLOAD_PRESET = "cookbakeshare_unsigned";
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary env vars are missing");
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Cloudinary error:", errText);
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.secure_url; // this is what you'll save in your DB
}
