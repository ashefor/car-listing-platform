
window.onload = function () {
    let url
    if(localStorage.getItem("data")){
        url = localStorage.getItem("data")
    }else{
        url = "http://localhost:3000/cars"
    }
    console.log(localStorage.getItem("data"))
    let url2 = localStorage.getItem("data")
    let data;
    const maindiv = document.getElementById('show_cars')
    const editting = document.getElementById('editentry')
    let xml = new XMLHttpRequest;
    // let url = 'http://localhost:3000/cars?car_name=benz'
    xml.open('GET', url, true)
    xml.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            data = JSON.parse(this.responseText)
            // console.log(data)
            let details;
            // let array = []
            if(data.length == 0){
                document.getElementById('hide_cars').style.display = "block";
                document.getElementById('show_cars').style.display = "none";
            }
            for (let i = 0; i < data.length; i++) {
                details = data[i].details;
                // array.push(data[i].id)
                editting.setAttribute('class', `editentry-${data[i].id}`)
                var desktopcard = document.createElement("div");
                desktopcard.setAttribute('class', 'showallcars');
                desktopcard.setAttribute('id', `showallcars-${data[i].id}`);
                var pricecontainer = document.createElement('div');
                pricecontainer.setAttribute('class', 'pricing')
                var maincard = document.createElement('div')
                maincard.setAttribute('id', 'maincard')
                var deletecard = document.createElement('div');
                deletecard.setAttribute('class', 'delete')
                var cardheader = document.createElement("div");
                cardheader.setAttribute('class', 'mainfeatures_header')
                var imagecontainer = document.createElement("div");
                var mainfeatures = document.createElement("div");
                mainfeatures.setAttribute('class', 'cards mainfeatures')
                var header = document.createElement('a')
                header.setAttribute('id', `viewdetails-${data[i].id}`)
                header.setAttribute('href', 'view-car.html')
                var pricing = document.createElement('h2')
                var image = document.createElement('img')
                image.setAttribute('class', 'imgview')
                var deletebtn = document.createElement('button');
                var viewcontact =document.createElement('button')
                var contactdetails =document.createElement('h4')
                contactdetails.setAttribute('id', `contactdetails-${data[i].id}`)
                contactdetails.setAttribute('class', 'contactdetails')
                viewcontact.setAttribute('id', `viewcontact-${data[i].id}`)
                deletebtn.setAttribute('id', `deletedata-${data[i].id}`)
                deletebtn.setAttribute('class', 'deletethis')
                var editntn = document.createElement('button')
                editntn.innerText = "Edit"
                editntn.setAttribute('id', `editdata-${data[i].id}`)
                editntn.setAttribute('class', 'editthis')
                header.innerText = data[i].car_name.toLowerCase();
                contactdetails.innerText = data[i].contact
                // console.log(header)
                pricing.innerText = data[i].price.toLocaleString();
                deletebtn.innerText = "Delete!"
                viewcontact.innerText = "contact seller"
                if (data[i].car_name === "mazda") {
                    image.setAttribute('src', 'images/mazda.png')
                }
                else if (data[i].car_name === "bugatti") {
                    image.setAttribute('src', 'images/bugatti2.png')
                }
                else if (data[i].car_name === "toyota") {
                    image.setAttribute('src', 'images/toyota.png')
                }
                else if (data[i].car_name === "honda") {
                    image.setAttribute('src', 'images/honda.png')
                }
                else if (data[i].car_name === "ferrari") {
                    image.setAttribute('src', 'images/ferrari2.png')
                }
                else if (data[i].car_name === "bmw") {
                    image.setAttribute('src', 'images/bmw.png')
                }
                else if (data[i].car_name === "range") {
                    image.setAttribute('src', 'images/range.png')
                }
                else if (data[i].car_name === "benz") {
                    image.setAttribute('src', 'images/benz.png')
                }
                imagecontainer.append(image);
                cardheader.append(header);
                mainfeatures.append(cardheader);
                maincard.append(cardheader);
                pricecontainer.append(pricing);
                deletecard.append(deletebtn, editntn,  contactdetails)
                mainfeatures.append(maincard, pricecontainer, deletecard)
                desktopcard.append(imagecontainer, mainfeatures)
                maindiv.appendChild(desktopcard);
                // console.log(array)
                // console.log(array[i])
                let btn = document.getElementById(`deletedata-${data[i].id}`);
                btn.addEventListener('click', deletedata)
                function deletedata() {
                    let del = new XMLHttpRequest;
                    // alert('Are you sure?')
                    var choice = confirm('are you sure?')
                    if(choice == true){
                        del.open('DELETE', `http://localhost:3000/cars/${data[i].id}`, true)
                        del.onload = function () {
                        if (this.statusText === 'OK') {
                            console.log(this.status);
                            window.location.reload()
                        }
                    }
                    del.send()
                    }else{
                        return false
                    }
                    
                }
                for (let y in details) {
                    // console.log(details[y])
                    var mainfeatures_main = document.createElement('div');
                    mainfeatures_main.setAttribute('class', 'mainfeatures_details')
                    var ul = document.createElement('ul');
                    var li = document.createElement('li');
                    var year = document.createElement('li');
                    var transmission = document.createElement('li');
                    li.innerText = details[y].model_name;
                    year.innerText = details[y].year;
                    transmission.innerText = data[i].color
                    ul.append(li, year, transmission)
                    mainfeatures_main.appendChild(ul);
                    maincard.appendChild(mainfeatures_main)
                    // console.log(mainfeatures)
                    var modal = document.getElementById("myModal");

                    // Get the button that opens the modal
                    var editbtn = document.getElementById(`editdata-${data[i].id}`);

                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("canceledit")[0];
                    let obj = {}
                    // When the user clicks the button, open the modal 
                    editbtn.onclick = function () {
                        let editid = data[i].id
                        // console.log(editid)
                        // console.log(arr[0])
                        modal.style.display = "block";
                        //   console.log(data[i])
                        document.getElementById('car_make').value = data[i].car_name
                        document.getElementById('car_model').value = data[i].details[y].model_name
                        document.getElementById('car_price').value = data[i].price
                        document.getElementById('car_year').value = data[i].details[y].year
                        document.getElementById('car_color').value = data[i].details[y].color
                        document.getElementById('transmission_mode').value = data[i].details[y].transmission
                        document.getElementById('entry-id').value = data[i].id;
                        document.getElementById('car_description').value = data[i].description
                        document.querySelector('div.modal-content').addEventListener('keyup', showtext)
                        obj.car_name = document.getElementById('car_make').value.toLowerCase();
                        obj.price = parseInt(document.getElementById('car_price').value);
                        obj.details = [
                            {
                                "model_name": document.getElementById('car_model').value,
                                "year": document.getElementById('car_year').value,
                            }
                        ],
                            obj.description = document.getElementById('car_description').value;
                            obj.color = document.getElementById('car_color').value,
                            obj.transmission = document.getElementById('transmission_mode').value
                        function showtext(e) {
                            //   console.log(e.target.value)
                            obj.car_name = document.getElementById('car_make').value;
                            obj.price = parseInt(document.getElementById('car_price').value);
                            obj.details = [
                                {
                                    "model_name": document.getElementById('car_model').value,
                                    "year": document.getElementById('car_year').value,
                                }
                            ],
                                obj.description = document.getElementById('car_description').value;
                                obj.color = document.getElementById('car_color').value,
                                obj.transmission = document.getElementById('transmission_mode').value
                            // console.log(obj)
                        }




                        let editone = document.getElementById('editform')
                        editone.addEventListener('submit', editvalues)

                        function editvalues(e) {
                            e.preventDefault();
                            e.stopPropagation()
                            let entryid = document.getElementById('entry-id').value
                            // alert(`http://localhost:3000/cars/${entryid}`)
                            // console.log(arr[0])
                            let editreq = new XMLHttpRequest();
                            let jsob = JSON.stringify(obj)
                            // console.log(jsob)
                            editreq.open('PUT', `http://localhost:3000/cars/${entryid}`, true)
                            editreq.setRequestHeader("Content-Type", "application/json");
                            editreq.onreadystatechange = function () {
                                if (this.status === 200 && this.readyState === 4) {
                                    // alert(jsob)
                                    window.location.reload()
                                }
                            }
                            editreq.send(jsob)

                        }



                    }


                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function (e) {
                        modal.style.display = "none";
                        e.preventDefault()
                    }
                }

                let post = document.getElementById(`viewdetails-${data[i].id}`);
                post.addEventListener('click', show)
                function show(e) {
                    // e.preventDefault()
                    // url = post.getAttribute('href')
                    // localStorage.setItem("id", data[i].id)
                    
                }

                // let viewdetails = document.getElementById(`viewcontact-${data[i].id}`)
                // viewdetails.addEventListener('click', showcontact)

                // function showcontact(){
                //     // document.getElementById(`contactdetails-${data[i].id}`).style.display="none"? document.getElementById(`contactdetails-${data[i].id}`).style.display : "block"
                // }

                let viewpost = document.getElementById(`showallcars-${data[i].id}`);
                viewpost.addEventListener('click', showdetails)
                function showdetails(e){
                    console.log(data[i].id)
                    console.log(e.target)
                    localStorage.setItem("id", data[i].id)
                    window.location.href = 'view-car.html'
                }

            }

        }
    }
    xml.send();

    let searchcar = document.getElementById('choicechecklist')
    searchcar.addEventListener('click', search)
    function search(e){
        // console.log(e)
        if(e.target.checked == true){
            let searchvalue = e.target.value
            // console.log(searchvalue)
            let newsearch = new XMLHttpRequest
            url =`http://localhost:3000/cars?car_name=${searchvalue}`
            console.log(url)
            newsearch.open('GET', url, true)
            newsearch.onreadystatechange = function(){
                if(this.status === 200 && this.readyState == 4){
                    data = JSON.parse(this.responseText)
                    localStorage.setItem("data", url)
                    window.location.reload()
                }
            }
            newsearch.send()
        }
    }

    let home = document.getElementById('gohome')
    home.addEventListener('click', gohome)
    function gohome(){
        localStorage.clear()
    }
}