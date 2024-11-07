const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`;

const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append("file", file);
    formData.append("upload_preset", "job-portal");

    const response = await fetch(url,{
        method: "POST",
        body: formData,
    });

    const result = await response.json();
    return result;
}

export default uploadFile;