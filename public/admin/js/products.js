const uploadImg = document.querySelector("[upload-image]")
if (uploadImg) {
    const uploadImageInput = uploadImg.querySelector("[upload-image-input]")
    const uploadImagePreview = uploadImg.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            const image = URL.createObjectURL(e.target.files[0])

            uploadImagePreview.src = image
        }
    })
}