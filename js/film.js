// Déclare ta clé API
const apiKey = "e7a140e810507e70103cafb782408835"; // Remplacez par votre clé API

// Fonction pour charger les films populaires
const loadPopularMovies = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr&page=1`;
    loadMovies(url);
};

// Fonction pour charger les films en fonction de l'URL
const loadMovies = (url) => {
    const moviesContainer = document.getElementById("movies-container");
    moviesContainer.innerHTML = "<p>Chargement des films...</p>"; // Message de chargement

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Réseau non valide");
            }
            return response.json(); // Convertit la réponse en JSON
        })
        .then((data) => {
            moviesContainer.innerHTML = ""; // Efface le message de chargement

            data.results.forEach((movie) => {
                const movieDiv = document.createElement("div");
                movieDiv.className = "col-lg-3 col-md-4 mb-4"; // Utilisation de Bootstrap pour la mise en page

                movieDiv.innerHTML = `
                    <div class="card text-bg-success text-center">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img" alt="${movie.title}">
                        <div class="accordion" id="accordion-${movie.id}">
                            <div class="accordion-item bg-success">
                                <h2 class="accordion-header" id="heading-${movie.id}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${movie.id}" aria-expanded="false" aria-controls="collapse-${movie.id}">
                                        Détails
                                    </button>
                                </h2>
                                <div id="collapse-${movie.id}" class="accordion-collapse collapse" aria-labelledby="heading-${movie.id}">
                                    <div class="accordion-body">
                                        <h3 class="card-title">${movie.title}</h3>
                                        <p>${movie.popularity}</p>
                                        <p class="card-text">${movie.overview}</p>      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                moviesContainer.appendChild(movieDiv);
            });
        })
        .catch((error) => {
            moviesContainer.innerHTML =
                '<p style="color: red;">Il y a eu un problème avec le chargement des films. Veuillez réessayer plus tard.</p>';
            console.error("Il y a eu un problème avec l'appel de l\'API:", error);
        });
};

// Ajoute un gestionnaire d'événements pour le formulaire de recherche
document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche la soumission du formulaire
    const searchQuery = document.getElementById("search-input").value; // Récupère la valeur de la recherche
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr&query=${encodeURIComponent(searchQuery)}&page=1`;
    loadMovies(url); // Charge les films correspondant à la recherche
});

// Appelle la fonction pour charger les films populaires au démarrage
loadPopularMovies();