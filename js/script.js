// function nyariFilm() {
//     $('#row').html('');

//     $.ajax({
//         url: 'http://www.omdbapi.com',
//         type: 'get',
//         dataType: 'json',
//         data: {
//             apikey: 'da3578e',
//             s: $('#searchInput').val()
//         },
//         success : function (result) {
//             if (result.Response == "True") {
//                 let movies = result.Search
//                 $.each(movies, function (i, data) {
//                     $('#row').append(`
//                     <div class="col-md-4">
//                     <div class="card mb-4">
//                     <img src="${data.Poster}" class="card-img-top" alt="...">
//                     <div class="card-body">
//                     <h5 class="card-title">${data.Title}</h5>
//                     <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
//                     <a href="#" class="card-link detail"  data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
//                     </div>
//                     </div>
//                     </div>
//                     `)
//                 })

//                 $('#searchInput').val('');
//             } else {
//                 $('#row').html(
//                     '<div class="col">' +
//                     '<h1 class="text-center">Gada jir!</h1>' +
//                     '</div>'
//                 );
//             }

//         }
//     })
// }


// $('#searchBtn').on('click', function () {
//     nyariFilm();
// });

// $('#searchInput').on('keyup', function(event) {
//     if (event.which === 13) {
//         nyariFilm();
//     }
// });

// $('#row').on('click', '.detail', function() {
//     $.ajax({
//         url: 'http://www.omdbapi.com',
//         type: 'get',
//         dataType: 'json',
//         data: {
//             apikey: 'da3578e',
//             i: $(this).data('id')
//         },
//         success: function(result) {
//             if (result.Response === "True") {
//                 $('.modal-body').html(`
//                     <div class="container-fluid">
//                         <div class="row">
//                             <div class="col-md-4">
//                                 <img src="${result.Poster}" class="img-fluid">
//                             </div>
//                             <div class="col-md-8">
//                                 <ul class="list-group">
//                                     <li class="list-group-item">Title : ${result.Title}</li>
//                                     <li class="list-group-item">Released : ${result.Released}</li>
//                                     <li class="list-group-item">Genre : ${result.Genre}</li>
//                                     <li class="list-group-item">Director : ${result.Director}</li>
//                                     <li class="list-group-item">Actors : ${result.Actors}</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 `);
//             } else {
//                 console.log("Error: Data tidak ditemukan.");
//             }
//         },
//         error: function(xhr, status, error) {
//             console.log("Error: " + status + " - " + error);
//         }
//     });
// });





// const searchBtn = document.querySelector('#searchBtn');

// function nyariFilm() {
//     const keyword = document.querySelector('#searchInput');
//     fetch('http://www.omdbapi.com?apikey=da3578e&s=' + keyword.value)
//         .then(response => response.json())
//         .then(response => {
//             let movies = response.Search;
//             const row = document.querySelector('#row');
//             movies.forEach(data => {
//                 const movieDiv = document.createElement('div');
//                 movieDiv.classList.add('col-md-4');
//                 movieDiv.innerHTML = `
//                     <div class="card mb-4">
//                         <img src="${data.Poster}" class="card-img-top" alt="...">
//                         <div class="card-body">
//                             <h5 class="card-title">${data.Title}</h5>
//                             <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
//                             <a href="#" class="card-link detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
//                         </div>
//                     </div>
//                 `;
//                 row.appendChild(movieDiv);
//             });
//         });
// }

// searchBtn.addEventListener('click', function () {
//     const row = document.querySelector('#row');
//     row.innerHTML = '';
//     nyariFilm();
// });

// const searchInput = document.querySelector('#searchInput');

// searchInput.addEventListener('keyup', function (event) {
//     if (event.key === "Enter") {
//         const row = document.querySelector('#row');
//         row.innerHTML = '';
//         nyariFilm();
//     }
// });

// document.getElementById('row').addEventListener('click', function (event) {
//     if (event.target.classList.contains('detail')) {
//         let imdbID = event.target.getAttribute('data-id');
//         fetch('http://www.omdbapi.com?apikey=da3578e&i=' + imdbID)
//             .then(response => response.json())
//             .then(response => {
//                 const modalBody = document.querySelector('.modal-body');
//                 modalBody.innerHTML = `
//             <div class="container-fluid">
//                         <div class="row">
//                             <div class="col-md-4">
//                                 <img src="${response.Poster}" class="img-fluid">
//                             </div>
//                             <div class="col-md-8">
//                                 <ul class="list-group">
//                                     <li class="list-group-item">Title : ${response.Title}</li>
//                                     <li class="list-group-item">Released : ${response.Released}</li>
//                                     <li class="list-group-item">Genre : ${response.Genre}</li>
//                                     <li class="list-group-item">Director : ${response.Director}</li>
//                                     <li class="list-group-item">Actors : ${response.Actors}</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//             `;
//             }
//             );
//     }
// });






const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const row = document.querySelector('#row');

searchBtn.addEventListener('click', async function () {
    try {
    const row = document.querySelector('#row');
    row.innerHTML = '';
    const keyword = document.querySelector('#searchInput').value;
    const movies = await getMovies(keyword);
    updateRow(movies);
    } catch(error) {
        alert(error);
    }
});

searchInput.addEventListener('keyup', async function (event) {
    if (event.key === "Enter") {
    try {
    const row = document.querySelector('#row');
    row.innerHTML = '';
    const keyword = document.querySelector('#searchInput').value;
    const movies = await getMovies(keyword);
    updateRow(movies);
    } catch(error) {
        alert(error);
    }
}});

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com?apikey=da3578e&s=' + keyword)
        .then(response => response.json())
        .then(response => response.Search);
}

function updateRow(movies) {
    if (!movies) {
        throw new Error('Movie not found!');
    } else {
    const row = document.querySelector('#row');
    movies.forEach(data => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('col-md-4');
        movieDiv.innerHTML = `
            <div class="card mb-4">
                <img src="${data.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                    <a href="#" class="card-link detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                </div>
            </div>
        `;
        row.appendChild(movieDiv);
    });
    }
}

row.addEventListener('click', async function(event) {
    if (event.target.classList.contains('detail')){
        try {
        const idMovie = event.target.getAttribute('data-id');
        const movieDetail = await getDetailMovie(idMovie);
        updateModal(movieDetail);
        } catch(error) {
            alert(error);
        }
    }
});

function getDetailMovie(idMovie) {
    return fetch('http://www.omdbapi.com?apikey=da3578e&i=' + idMovie)
        .then(response => response.json())
        .then(response => response);
}

function updateModal(response) {
    const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = `
            <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${response.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item">Title : ${response.Title}</li>
                                    <li class="list-group-item">Released : ${response.Released}</li>
                                    <li class="list-group-item">Genre : ${response.Genre}</li>
                                    <li class="list-group-item">Director : ${response.Director}</li>
                                    <li class="list-group-item">Actors : ${response.Actors}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
            `;
}





