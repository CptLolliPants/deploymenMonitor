let xhttp = new XMLHttpRequest()
let myOutput = document.getElementById("tablebody")
xhttp.open(
    "GET",
    "api"
)
xhttp.setRequestHeader(
    "Content-type",
    "application/json;charSet=UTF-8"
)
xhttp.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status === 200){
        JSON.parse(this.response).forEach((el) => myOutput.innerHTML += '<tr><td>'+ el.id + '</td><td>Runnning</td></tr>')
    }
}
xhttp.send()
