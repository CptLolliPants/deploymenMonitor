function MyFunction(){
    let xhttp = new XMLHttpRequest()
    let myInput = document.getElementById("myInput")
    let myOutput = document.getElementById("myOutput")
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
            console.log(this.response)
            myOutput.innerHTML = this.response
        }
    }
    xhttp.send(JSON.stringify({"data":myInput.value}))
}