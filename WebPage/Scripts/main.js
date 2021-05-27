// function hiddeMenu() {
//     // document.getElementById("fh5co-aside").innerHTML = "";
//     document.getElementById("fh5co-aside").classList.toggle('active');
// }


function addText(text) {

    var element = document.getElementById("img-text");                
    var textnode = document.createTextNode(text); 
    
    var title = document.createElement('h3');
    title.class = "title";
    title.id = "img-result-title";
    title.innerHTML = "Resultado";

    element.parentNode.insertBefore(title, element);
    element.appendChild(textnode);
}


function getImgText() {

    var input = document.querySelector('input[type="file"]');
    var img = document.getElementById("image");
    
    file = input.files[0];

    console.log("Uploaded file: ", file);
    img.src = file.webkitRelativePath + "/" + file.name;

    fetch("/analyze-img", {
        method: "POST", 
        // headers: {
        //     "Content-Type": "multipart/form-data"
        //   },
        body: file,
        file: file
    }).then(res => {
        console.log("Request complete! response:", res);
        // Add the returned text by the /analyze-img request in the p element
        addText(res);
    });
}


// const onSelectFile = () => getImgText(input.files[0]);

// var input = document.querySelector('input[type="file"]');
// input.addEventListener('change', onSelectFile, false);