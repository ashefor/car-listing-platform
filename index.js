
window.onload = function () {
   
    const maindiv = document.getElementById('show_cars')
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
            // let output = ''
            for(let i = 0; i< data.length; i++){
                // let header = document.createElement('h4')
                // let content = document.createElement('span')
                // let image = document.createElement('img')
                // image.setAttribute('src', data[i].imageURL)
                // header.textContent = data[i].car_name;
                // content.textContent = data[i].price;
                // two.append(header)
                // one.append(image)
                // two.append(content)
                var elem = document.createElement("div");
                var elem2 = document.createElement("div");
                var elem3 = document.createElement("div");
                var header = document.createElement('h4')
                var content = document.createElement('span')
                var image = document.createElement('img')
                // elem.setAttribute('id', data[i]);
                header.innerText = data[i].car_name;
                content.innerText = data[i].price;
                image.setAttribute('src', data[i].imageURL) 
                elem2.append(image)
                elem3.append(header)
                elem3.append(content);
                elem.append(elem2, elem3)
                maindiv.appendChild(elem);
                //  output +=  '<h5>' +data[i].price+ '</h5';
                // console.log(data[i].car_name)

            }
            // for(let i in data){
            //     // output =+ '<div>' + 
            //     // '<div>' +
            //     // '<h4>' +data[i].car_name+ '</h4>' +
            //     // '<h5>' +data[i].price+ '</h5'+
            //     // '</div>'+
            //     // '</div>';
            //     console.log(data[i].car_name)
            // }
            // document.getElementById('showallcars').innerHTML = output
        }
    }
    xml.send()
}