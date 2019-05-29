
window.onload = function () {
   
    const maindiv = document.getElementById('populatecars')
    const img = document.getElementById('populateImg')
    const one = document.getElementById('one')
    const two = document.getElementById('two')
    let xml = new XMLHttpRequest;
    console.log(xml)
    xml.open('GET', 'http://localhost:3005/cars', true)
    xml.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            let data = JSON.parse(this.responseText)
            console.log(data)
            for(let i = 0; i< data.length; i++){
                let header = document.createElement('h4')
                let content = document.createElement('span')
                let image = document.createElement('img')
                image.setAttribute('src', data[i].imageURL)
                header.textContent = data[i].car_name;
                content.textContent = data[i].price;
                two.appendChild(header)
                one.appendChild(image)
                two.appendChild(content)
            }
        }
    }
    xml.send()
}