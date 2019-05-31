window.onload = function(){
    let btn= document.getElementById('submitbutton')
btn.addEventListener('click', submitform)
function submitform(e){
    e.preventDefault()
    let data = {};
    data.car_name = document.getElementById('make').value.toLowerCase();
    data.price = parseInt(document.getElementById('price').value)
    data.details = [
        {
            "model_name" : document.getElementById('model').value,
            "year": document.getElementById('year').value,
            "color": document.getElementById('color').value,
            "transmission": document.getElementById('transmission').value
        }
    ],
    data.description = document.getElementById('description').value;
    let jsob = JSON.stringify(data)
    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/cars', true)
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            // window.location.href= 
        }
        else if(this.status === 201){
            window.location.href = 'index.html'
        }
    }
    request.send(jsob)
}
}