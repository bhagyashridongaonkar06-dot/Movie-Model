const cl = console.log;

const movieContainer = document.getElementById('movieContainer')


	let movieArray = [
  {
    movieName: "Avengers: Endgame",
    movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJMnsEFNF6iRkbonUdOmGrrgY7tLLeTAOHdu6Hn_AVSw&s=10",
    movieRating: 8.4,
    movieDesciption: "The Avengers unite to reverse the damage caused by Thanos.",
    movieId : 'Movie11'
  },
  {
    movieName: "Interstellar",
    movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8Vi0jEi9-UVJNJ7ErV9Cd4OiAmDXYXmv2K3WGYuvDg&s",
    movieRating: 8.7,
    movieDesciption: "A team of astronauts travels through space to find a new home for humanity.",
    movieId : 'Movie12'
  },
  {
    movieName: "Inception",
    movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFp14VueG5VkavomlZMoL8qXztNM-XTxipQf3LscFng&s",
    movieRating: 8.8,
    movieDesciption: "A skilled thief enters people's dreams to steal valuable information.",
    movieId : 'Movie13'
  },
  {
    movieName: "The Lion King",
    movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxVuALr6WXiOdcpOa8RWrCccFbgdU2E62oktIYA3Y56A&s",
    movieRating: 8.5,
    movieDesciption: "A young lion learns to accept his responsibility as the future king.",
    movieId : 'Movie14'
  },
  {
    movieName: "3 Idiots",
    movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpV5UsXTuubOLA4oa5Wj2ePtIqjZoITTpx_X2LqL20CQ&s",
    movieRating: 8.4,
    movieDesciption: "Three friends experience friendship, education, and the challenges of college life.",
    movieId : 'Movie15'
  }
];


//  localStorage.setItem('movieArr', JSON.stringify(movieArray))

let data = localStorage.getItem('movieArr')
let movieArr;

if(data){
    movieArr = JSON.parse(data)
}else{
    movieArr = movieArray
    localStorage.setItem('movieArr', JSON.stringify(movieArr))
}

function showDataInLs(){
    localStorage.setItem('movieArr', JSON.stringify(movieArr))
}

function setRating(rating){
    if(rating >= 6){
        return 'badge success'
    }else if(rating >= 2 && rating <= 5){
        return 'badge warning'
    }else{
        return 'badge danger'
    }
}


function onCreateMovieCard(arr){
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
                                <p>${ele.movieDesciption}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <button class="btn net-sec-btn btn-sm">Edit</button>
                        <button class="btn net-pri-btn btn-sm">Remove</button>

                    </div>

                </div>
            </div>`
    });
    movieContainer.innerHTML = res;
}

onCreateMovieCard(movieArr)

