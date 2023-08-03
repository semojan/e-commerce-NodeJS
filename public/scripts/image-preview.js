const imagePickerE = document.querySelector("#image-upload-control input");
const imagePreviewE = document.querySelector("#image-upload-control img");

function updateImagePreview(){
    const files = imagePickerE.files;

    if (!files || files.length ===0){
        imagePreviewE.style.display = "none";
        return;
    }

    const pickedFile = files[0];

    imagePreviewE.src = URL.createObjectURL(pickedFile);
    imagePreviewE.style.display = "block";
}

imagePickerE.addEventListener("change", updateImagePreview);