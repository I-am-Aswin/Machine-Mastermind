document.getElementById('ImgUpload').addEventListener( 'submit', function(event) {
    event.preventDefault();
    document.getElementById('spinner1').classList.remove('hidden');

    jclass = document.getElementById('jclass');
    if( !jclass.classList.contains('hidden') ) 
        jclass.classList.add('hidden');

    form = document.getElementById('ImgUpload');

    formdata = new FormData(form)
    
    fetch( '/predict', {
        method: 'POST',
        body: formdata
    }) .then ( response => {
        if( response.ok ) {
            return response.json();
        } else {
            window.alert('Issue with response');
        }
    }) .then ( data => {
        if( data.ok ) {
            document.getElementById('spinner1').classList.add('hidden');
            jclass.textContent = "Predictions : " + data.class_name + " - " + data.confidence;
            jclass.classList.remove('hidden');
        } else {
            window.alert('Unsuccessful File Upload');
        }
    }) .catch ( err => {
        console.log( err );
    })
})


function handleFileChange() {
    document.getElementById('spinner').classList.remove('hidden');

    let file = document.getElementById('file-upload');
    let name = document.getElementById('file-name');
    let img = document.getElementById('jersey');

    document.getElementById('jclass').classList.add('hidden');

    if( file.files.length > 0 ) {
        name.textContent = file.files[0].name;

        const reader = new FileReader();
        reader.onload = function(e) {
            // img.src = e.target.result;
            // img.classList.add("bg-[url(" + e.target.result + ")]");
            img.style.backgroundImage = 'url(' + e.target.result + ')';
            img.style.backgroundSize = "cover";
            img.style.backgroundPosition = "center";
            document.getElementById('img-unk').classList.add("hidden");
            document.getElementById('spinner').classList.add('hidden');
        }
        reader.readAsDataURL(file.files[0]);
    } else {
        name.textContent = "Select a File";
        // img.src = '';
        // img.class    List.remove("bg-[url(" + e.target.result + ")]");
        img.style.backgroundImage = "";
        document.getElementById('img-unk').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

document.getElementById('jersey').addEventListener( 'click', _ => document.getElementById('file-upload').click() )
