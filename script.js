let textareaEl = document.getElementById("textarea");
let buttons = document.getElementsByTagName("button");
let saveEl = document.getElementById("save");
let fileEl = document.getElementById("file");
let fontEl = document.getElementById("font");

buttons[0].addEventListener("click", function(){
    document.execCommand("bold");
});
buttons[1].addEventListener("click", function(){
    document.execCommand("italic");
});
buttons[2].addEventListener("click", function(){
    document.execCommand("insertUnorderedList");
});

fileEl.addEventListener("change", function(){
    let fr = new FileReader();
    fr.readAsText(this.files[0]);
    fr.onload = function(){
        let uploadedjson = JSON.parse(fr.result);
        textareaEl.innerHTML = uploadedjson["formattedtext"];
    }
});

let state = {
    "formattedtext": "",
    "plaintext": ""
};

textareaEl.addEventListener("input", function(){
    state["formattedtext"] = textareaEl.innerHTML;
    state["plaintext"] = textareaEl.innerText;
});

saveEl.addEventListener("click", function(){
    let strjson = JSON.stringify(state);
    let blob = new Blob([strjson], {type: 'application/json'});
    let aEl = document.createElement("a");
    aEl.setAttribute("download", "data.json");
    aEl.setAttribute("href", URL.createObjectURL(blob));
    aEl.click();
});