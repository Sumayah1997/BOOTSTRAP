$('#FileForm').submit(function(e){
    e.preventDefault();
    const FileInput = document.getElementById("FileInput");
    const file = FileInput.files[0];
    if(file)
    {
        if(file.type == 'image/png' || file.type == 'image/jpg' || file.type=='image/jpeg'){
            const reader = new FileReader();
            reader.onload = function(event)
            {
                const ImageSrc = event.target.result;
                displayImage(ImageSrc);
            };
            reader.readAsDataURL(file);
        }
        else{alert('Kindly select an image file of type png or jpg or jpeg');}
    }
    else{alert('please select an image file.')}
});
function displayImage(src)
{
    const ImagePreview = document.getElementById('ImagePreview');
    ImagePreview.innerHTML=`<img src="${src}" class="img-fluid" alt="Image Preview">`;
}