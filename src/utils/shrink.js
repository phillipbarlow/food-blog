export async function shrink(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_WIDTH = 1200;
      const scale = Math.min(1, MAX_WIDTH / img.width);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      console.log(ctx.drawImage(img, 0, 0, canvas.width, canvas.height));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        },
        file.type,
        0.7,
      );
    };
  });
}
