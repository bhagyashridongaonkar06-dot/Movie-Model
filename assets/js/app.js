const cl = console.log;

const movieContainer = document.getElementById('movieContainer')
const formBtn = document.getElementById('formBtn')
const movieName = document.getElementById('movieName')
const movieImg = document.getElementById('movieImg')
const movieDescription = document.getElementById('movieDescription')
const movieRating = document.getElementById('movieRating')
const backDrop = document.getElementById('backDrop')
const formClose = document.querySelectorAll('.formClose')
const mainForm = document.getElementById('mainForm')
const addMovie = document.getElementById('addMovie')
const updateMovie = document.getElementById('updateMovie')


let movieArray = [           
    {
        movieName: "Avengers: Endgame",
        movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJMnsEFNF6iRkbonUdOmGrrgY7tLLeTAOHdu6Hn_AVSw&s=10",
        movieRating: 8,
        movieDescription: "The Avengers unite to reverse the damage caused by Thanos.",
        movieId: 'Movie11'
    },
    {
        movieName: "Interstellar",
        movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8Vi0jEi9-UVJNJ7ErV9Cd4OiAmDXYXmv2K3WGYuvDg&s",
        movieRating: 10,
        movieDescription: "A team of astronauts travels through space to find a new home for humanity.",
        movieId: 'Movie12'
    },
    {
        movieName: "Inception",
        movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFp14VueG5VkavomlZMoL8qXztNM-XTxipQf3LscFng&s",
        movieRating: 7,
        movieDescription: "A skilled thief enters people's dreams to steal valuable information.",
        movieId: 'Movie13'
    },
    {
        movieName: "The Lion King",
        movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxVuALr6WXiOdcpOa8RWrCccFbgdU2E62oktIYA3Y56A&s",
        movieRating: 5,
        movieDescription: "A young lion learns to accept his responsibility as the future king.",
        movieId: 'Movie14'
    },
    {
        movieName: "3 Idiots",
        movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpV5UsXTuubOLA4oa5Wj2ePtIqjZoITTpx_X2LqL20CQ&s",
        movieRating: 4,
        movieDescription: "Three friends experience friendship, education, and the challenges of college life.",
        movieId: 'Movie15'
    }
];


//  localStorage.setItem('movieArr', JSON.stringify(movieArray))

let data = localStorage.getItem('movieArr')
let movieArr;

if (data) {
    movieArr = JSON.parse(data)
} else {
    movieArr = movieArray
    localStorage.setItem('movieArr', JSON.stringify(movieArr))
}

function showDataInLs() {
    localStorage.setItem('movieArr', JSON.stringify(movieArr))
}


// functionality for the backdrop and mainform hide and show

function onToggleBtn() {
    backDrop.classList.toggle('active')
    mainForm.classList.toggle('active')
    mainForm.reset();
}

formBtn.addEventListener('click', onToggleBtn)
formClose.forEach(e => e.addEventListener('click', onToggleBtn))


// function for Rating means changing badge color

function setRating(rating) {
    if (rating > 7) {
        return " badge-success"
    } else if (rating >= 4 && rating <= 7) {
        return "badge-warning"
    } else {
        return "badge-danger"
    }
}


// Read Functionality(templating)

function onCreateMovieCard(arr) {
    let res = '';

    arr.forEach(ele => {
        res += `<div class="col-md-3" id="${ele.movieId}">
                <div class="card movieCard net-sec-btn mt-3">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">${ele.movieName}
                        </h4>

                        <h5 class="mb-0"><span class="badge ${setRating(ele.movieRating)}">${ele.movieRating}</span></h5>
                    </div>
                    <div class="card-body py-0">
                        <figure class="mb-0 ">
                            <img src="${ele.movieImg}" alt="${ele.movieName}" title="${ele.movieName}">
                            <figcaption>
                                <h4 class="m-0">${ele.movieName}</h4>
                                <p>${ele.movieDescription}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <button type="button" onclick="onEdit(this)"  class="btn net-sec-btn btn-sm">Edit</button>
                        <button type="button" onclick="onDelete(this)"  class="btn net-pri-btn btn-sm">Remove</button>

                    </div>

                </div>
            </div>`
    });
    movieContainer.innerHTML = res;
}

onCreateMovieCard(movieArr)

function onSubmit(eve) {
    eve.preventDefault();

    let newObj = {
        movieId: Date.now().toString(),
        movieName: movieName.value,
        movieImg: movieImg.value,
        movieDescription: movieDescription.value,
        movieRating: movieRating.value
    }

    movieArr.push(newObj)
    showDataInLs()
    onToggleBtn()

    let card = document.createElement('div')
    card.className = 'col-md-3'
    card.id = newObj.movieId
    card.innerHTML = `<div class="card movieCard net-sec-btn mt-3">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">${newObj.movieName}
                        </h4>

                        <h5 class="mb-0"><span class="badge ${setRating(newObj.movieRating)}">${newObj.movieRating}</span></h5>
                    </div>
                    <div class="card-body py-0">
                        <figure class="mb-0 ">
                            <img src="${newObj.movieImg}" alt="${newObj.movieName}" title="${newObj.movieName}">
                            <figcaption>
                                <h4 class="m-0">${newObj.movieName}</h4>
                                <p>${newObj.movieDescription}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <button type="button" onclick="onEdit(this)" class="btn net-sec-btn btn-sm">Edit</button>
                        <button type="button" onclick="onDelete(this)" class="btn net-pri-btn btn-sm">Remove</button>

                    </div>

                </div>`
    movieContainer.append(card)
}

function onEdit(ele) {
    let editId = ele.closest('.col-md-3').id;
    // cl(editId)

    localStorage.setItem('editId', editId)

    let editObj = movieArr.find(e => e.movieId === editId)
    // cl(editObj)

    onToggleBtn()

    movieName.value = editObj.movieName
    movieImg.value = editObj.movieImg
    movieRating.value = editObj.movieRating
    movieDescription.value = editObj.movieDescription

    addMovie.classList.add('d-none')
    updateMovie.classList.remove('d-none')
}

function onUpdate() {
    let updateId = localStorage.getItem('editId')
    // cl(updateId)

    let updateObj = {
        movieId: updateId,
        movieName: movieName.value,
        movieImg: movieImg.value,
        movieRating: movieRating.value,
        movieDescription: movieDescription.value
    }

    let getIndex = movieArr.findIndex(e => e.movieId === updateId)
    // cl(getIndex)
    movieArr[getIndex] = updateObj

    showDataInLs()
    onToggleBtn()

    let card = document.getElementById(updateId)
    // card.className = 'col-md-3'
    card.innerHTML = `<div class="card movieCard net-sec-btn mt-3">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">${updateObj.movieName}
                        </h4>

                        <h5 class="mb-0"><span class="badge ${setRating(updateObj.movieRating)}">${updateObj.movieRating}</span></h5>
                    </div>
                    <div class="card-body py-0">
                        <figure class="mb-0 ">
                            <img src="${updateObj.movieImg}" alt="${updateObj.movieName}" title="${updateObj.movieName}">
                            <figcaption>
                                <h4 class="m-0">${updateObj.movieName}</h4>
                                <p>${updateObj.movieDescription}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <button type="button" onclick="onEdit(this)" class="btn net-sec-btn btn-sm">Edit</button>
                        <button type="button" onclick="onDelete(this)" class="btn net-pri-btn btn-sm">Remove</button>

                    </div>

                </div>`

    addMovie.classList.remove('d-none')
    updateMovie.classList.add('d-none')

}

function onDelete(ele) {
    let deleteId = ele.closest('.col-md-3').id;
    // cl(deleteId)

    let getConfirm = confirm(`Are you sure you want delete card with id ${deleteId}`)

    if (getConfirm) {
        let getIndex = movieArr.findIndex(e => e.movieId === deleteId)
        // cl(getIndex)

        movieArr.splice(getIndex, 1)

        showDataInLs()

        ele.closest('.col-md-3').remove()
    }
}

mainForm.addEventListener('submit', onSubmit)
updateMovie.addEventListener('click', onUpdate)

