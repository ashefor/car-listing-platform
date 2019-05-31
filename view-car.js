window.onload = function () {
    let carID = localStorage.getItem('id')
    let newURL = `http://localhost:3000/cars/${carID}`
    console.log(newURL)
    console.log(carID)
    const hiddendiv = document.getElementById('hide_cars')
    let xml = new XMLHttpRequest();
    xml.open('GET', newURL, true)
    xml.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            let newdata = JSON.parse(this.response);
            let details = newdata.details
            console.log(newdata.id)
            console.log(newdata.car_name, newdata.price)
            var desktopcard = document.createElement("div");
            desktopcard.setAttribute('id', 'showonecar');
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
            mainfeatures.setAttribute('class', 'cards onecarmainfeatures')
            var cardescription = document.createElement("div");
            cardescription.setAttribute('class', 'car_description_container')
            var header = document.createElement('h2')
            header.setAttribute('id', `viewdetails-${newdata.id}`)
            header.setAttribute('class', 'car_header')
            // header.setAttribute('href', `http://localhost:3000/cars/${data[i].id}`)
            var mileage = document.createElement('ul');
            mileage.textContent = "mileage(km)"
            var mileageVal = document.createElement('li')
            mileageVal.innerText = newdata.mileage;
            mileage.appendChild(mileageVal)
            var color = document.createElement('ul');
            color.textContent = "color"
            var colorVal = document.createElement('li')
            colorVal.innerText = newdata.color;
            color.append(colorVal)
            var transmission = document.createElement('ul');
            transmission.textContent = "transmission"
            var transmissionVal = document.createElement('li');
            transmissionVal.innerText = newdata.transmission;
            transmission.append(transmissionVal)
            var fuel = document.createElement('ul');
            fuel.textContent = "fuel"
            var fuelType = document.createElement('li')
            fuelType.innerText = newdata.fuel
            fuel.append(fuelType)
            var pricing = document.createElement('h2')
            var image = document.createElement('img')
            image.setAttribute('class', 'onecar_imgview')
            var deletebtn = document.createElement('button');
            var descspan = document.createElement('span')
            var overviewdetails = document.createElement('h4')
            overviewdetails.setAttribute('class', 'overview_details')
            var descHeader = document.createElement('h4')
            descHeader.setAttribute('class', 'desc_header')
            descspan.setAttribute('class', 'car_description')
            deletebtn.setAttribute('id', `deletedata-${newdata.id}`)
            deletebtn.setAttribute('class', 'deletethis')
            var editntn = document.createElement('button')
            editntn.innerText = "Edit"
            editntn.setAttribute('id', `editdata-${newdata.id}`)
            editntn.setAttribute('class', 'editthis')
            header.innerText = newdata.car_name;
            descHeader.innerText = "car description"
            overviewdetails.innerText = 'overview'
            descspan.innerText = newdata.description
            pricing.innerText = newdata.price.toLocaleString()
            deletebtn.innerText = "Delete!"
            // image.setAttribute('src', `images/image-${newdata.id}.jpg`)
            if (newdata.car_name === "mazda") {
                image.setAttribute('src', 'images/mazda.png')
            }
            else if (newdata.car_name === "bugatti") {
                image.setAttribute('src', 'images/bugatti2.png')
            }
            else if (newdata.car_name === "toyota") {
                image.setAttribute('src', 'images/toyota.png')
            }
            else if (newdata.car_name === "honda") {
                image.setAttribute('src', 'images/honda.png')
            }
            else if (newdata.car_name === "ferrari") {
                image.setAttribute('src', 'images/ferrari2.png')
            }
            else if (newdata.car_name === "bmw") {
                image.setAttribute('src', 'images/bmw.png')
            }
            else if (newdata.car_name === "range") {
                image.setAttribute('src', 'images/range.png')
            }
            else if (newdata.car_name === "benz") {
                image.setAttribute('src', 'images/benz.png')
            }
            cardescription.append(descHeader,descspan)
            imagecontainer.append(image);
            cardheader.append(header);
            mainfeatures.append(cardheader);
            maincard.append(cardheader);
            pricecontainer.append(pricing, mileage, color, fuel, transmission);
            deletecard.append(deletebtn, editntn)
            mainfeatures.append(maincard, pricecontainer, deletecard)
            desktopcard.append(imagecontainer, mainfeatures, cardescription)
            hiddendiv.appendChild(desktopcard);

            var deleteOne = document.getElementById(`deletedata-${carID}`);
            deleteOne.addEventListener('click', deleteOneData)
            function deleteOneData() {
                console.log('delete')
                let delOne = new XMLHttpRequest;
                let choice = confirm("are you sure?")
                if (choice == true) {
                    delOne.open('DELETE', `http://localhost:3000/cars/${newdata.id}`, true)
                    delOne.onload = function () {
                        if (this.statusText === 'OK') {
                            console.log(this.status);
                            window.location.href = "index.html"
                        }
                    }
                    delOne.send()
                } else {
                    return false
                }
            }

            for (let j in details) {
                // let m = Object.keys(details[0])
                // let nm = new Map()
                // nm.set(m)
                // console.log(nm)
                // console.log(m)
                // for(let i in m){
                //     console.log(m[i])
                // }
                console.log(details[0].color)
                var mainfeatures_main = document.createElement('div');
                mainfeatures_main.setAttribute('class', 'mainfeatures_details')
                var ul = document.createElement('ul');
                var dl =  document.createElement('dl')
                var dt = document.createElement('label');
                var dd = document.createElement('span')
                var li = document.createElement('li');
                var year = document.createElement('li');
                // var transmission = document.createElement('li');
                li.innerText = details[j].model_name;
                year.innerText = details[j].year;
                // transmission.innerText = details[j].transmission
                ul.append(year, li)
                mainfeatures_main.appendChild(ul);
                maincard.appendChild(mainfeatures_main)


                var modal = document.getElementById("myModal");

                // Get the button that opens the modal
                var editbtn = document.getElementById(`editdata-${carID}`);
    
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                let obj = {};
    
                editbtn.onclick = function () {
                    // let editid = data[i].id
                    // console.log(editid)
                    // console.log(arr[0])
                    modal.style.display = "block";
                    //   console.log(data[i])
                    document.getElementById('car_make').value = newdata.car_name
                    document.getElementById('car_model').value = newdata.details[j].model_name
                    document.getElementById('car_price').value = newdata.price
                    document.getElementById('car_year').value = newdata.details[j].year
                    document.getElementById('car_color').value = newdata.details[j].color
                    // document.getElementById('transmission_mode').value = newdata.details[j].transmission
                    document.getElementById('entry-id').value = newdata.id;
                    document.getElementById('car_description').value = newdata.description
                    document.querySelector('div.modal-content').addEventListener('keyup', showtext)
                    obj.car_name = document.getElementById('car_make').value;
                    obj.price = parseInt(document.getElementById('car_price').value);
                    obj.details = [
                        {
                            "model_name": document.getElementById('car_model').value,
                            "year": document.getElementById('car_year').value,
                            "color": document.getElementById('car_color').value,
                            "transmission": document.getElementById('transmission_mode').value
                        }
                    ],
                        obj.description = document.getElementById('car_description').value;
                    function showtext(e) {
                        //   console.log(e.target.value)
                        obj.car_name = document.getElementById('car_make').value;
                        obj.price = parseInt(document.getElementById('car_price').value);
                        obj.details = [
                            {
                                "model_name": document.getElementById('car_model').value,
                                "year": document.getElementById('car_year').value,
                                "color": document.getElementById('car_color').value,
                                "transmission": document.getElementById('transmission_mode').value
                            }
                        ],
                            obj.description = document.getElementById('car_description').value;
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
                span.onclick = function () {
                    modal.style.display = "none";
                }
            }

        }
    }
    xml.send()





}


