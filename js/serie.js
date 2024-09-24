// Déclare ta clé API
const apiKey = "e7a140e810507e70103cafb782408835"; // Remplacez par votre clé API

// Fonction pour charger les séries populaires
const loadPopularSeries = () => {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr&page=1`;
    loadShows(url);
};

// Fonction pour charger les films et les séries en fonction de l'URL
const loadShows = (url) => {
    const moviesContainer = document.getElementById("tv-container");
    moviesContainer.innerHTML = "<p>Chargement des series...</p>"; // Message de chargement

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Réseau non valide");
            }
            return response.json(); // Convertit la réponse en JSON
        })
        .then((data) => {
            moviesContainer.innerHTML = ""; // Efface le message de chargement

            data.results.forEach((show) => {
                const showDiv = document.createElement("div");
                showDiv.className = "col-lg-3 col-md-4 mb-4"; // Utilisation de Bootstrap pour la mise en page

                showDiv.innerHTML = `
                    <div class="card text-bg-success text-center">
                        <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img" alt="${show.name}">
                        <div class="accordion" id="accordion-${show.id}">
                            <div class="accordion-item bg-success">
                                <h2 class="accordion-header" id="heading-${show.id}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${show.id}" aria-expanded="false" aria-controls="collapse-${show.id}">
                                        Détails
                                    </button>
                                </h2>
                                <div id="collapse-${show.id}" class="accordion-collapse collapse" aria-labelledby="heading-${show.id}">
                                    <div class="accordion-body">
                                        <h3 class="card-title">${show.name}</h3>
                                        <p class="card-text">${show.vote_average}</p>      
                                        <p>${show.popularity}</p>
                                        <p class="card-text">${show.overview}</p>      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                moviesContainer.appendChild(showDiv);
            });
        })
        .catch((error) => {
            moviesContainer.innerHTML =
                '<p style="color: red;">Il y a eu un problème avec le chargement des séries. Veuillez réessayer plus tard.</p>';
            console.error("Il y a eu un problème avec l'appel de l\'API:", error);
        });
};

// Ajoute un gestionnaire d'événements pour le formulaire de recherche
document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche la soumission du formulaire
    const searchQuery = document.getElementById("search-input").value; // Récupère la valeur de la recherche

    // Modifier l'URL pour rechercher des séries
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=fr&query=${encodeURIComponent(searchQuery)}&page=1`;
    loadShows(url); // Charge les séries correspondant à la recherche
});

// Appelle la fonction pour charger les séries populaires au démarrage
loadPopularSeries();