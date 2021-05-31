function addText(text, target) {

    var element = target;
    console.log("Target ", element);
    if (element.tagName.toLowerCase() == "button" || element.tagName.toLowerCase() == "input"){
        element = element.parentNode;
    }

    // Set to append the text
    element = element.getElementsByClassName("result-text")[0];
    element.innerHTML = "";

    var textnode = document.createTextNode(text); 
    
    var title = document.createElement('h3');
    title.class = "title";
    title.id = "img-result-title";
    title.innerHTML = "Resultado";

    // Append the title
    element.appendChild(title);
    // Append the text
    element.appendChild(textnode);
}


function getImgText(e) {

    e = e || window.event;
    var target = e.target || e.srcElement;

    var fileInput = document.querySelector('#img-File');
    
    var formData = new FormData();
    formData.append('file', fileInput.files[0]);
    
    // var imgField = document.getElementById("image");
    // console.log("Uploaded file: ", file);
    // img.src = file.webkitRelativePath + "/" + file.name;

    fetch("/analyze-img", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        console.log("Request complete! response:", data);

        // Add the returned text by the /analyze-img request in the p element
        addText(data, target);
    })
    .catch(err => console.log("Could not upload file"));
}


function analyzeText(e) {

    // var target = document.getElementById("text-analytics");
    e = e || window.event;
    var target = e.target || e.srcElement;

    var text = document.getElementById("key-phrases-input").value;
    text = text.trim();
    console.log("Text: ", text);

    const data = {
        "text": text,
    }

    fetch("/key-phrases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        console.log("Request /key-phrases complete: ", data);
        addText(data, target);
    })
}


function dictionary (e) {

    e = e || window.event;
    var target = e.target || e.srcElement;

    var word = document.getElementById("user-word").value;

    const data = {
        "word": word,
    }

    fetch("/oxford-dictionary", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(response => {
        console.log("Dictionary POST: ", response);
        addText(response, target);
    })
    .catch(console.log("Error when requesting /oxford-dictionary"));

}

