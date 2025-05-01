// Función para obtener datos de las recomendaciones desde el archivo JSON
function fetchRecommendations() {
    fetch('travel_recommendation_api.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.countries && data.temples && data.beaches) {
          window.recommendationsData = data;  // Guardamos los datos globalmente
          displayRecommendations(data);  // Muestra todas las recomendaciones inicialmente
        } else {
          console.error('Missing expected data categories:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  // Función para mostrar las recomendaciones en el HTML
  function displayRecommendations(data) {
    const resultsContainer = document.getElementById('recommendations-results');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores
  
    // Mostrar las recomendaciones de países
    data.countries.forEach(country => {
      const countrySection = document.createElement('section');
      countrySection.classList.add('country-section');
  
      const countryTitle = document.createElement('h3');
      countryTitle.textContent = country.name;
      countrySection.appendChild(countryTitle);
  
      country.cities.forEach(city => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('result-card');
  
        const image = document.createElement('img');
        image.src = city.imageUrl;
        image.alt = city.name;
  
        const name = document.createElement('h4');
        name.textContent = city.name;
  
        const description = document.createElement('p');
        description.textContent = city.description;
  
        resultCard.appendChild(image);
        resultCard.appendChild(name);
        resultCard.appendChild(description);
        countrySection.appendChild(resultCard);
      });
  
      resultsContainer.appendChild(countrySection);
    });
  
    // Mostrar las recomendaciones de templos
    data.temples.forEach(temple => {
      const templeSection = document.createElement('section');
      templeSection.classList.add('temple-section');
  
      const templeTitle = document.createElement('h3');
      templeTitle.textContent = temple.name;
      templeSection.appendChild(templeTitle);
  
      const resultCard = document.createElement('div');
      resultCard.classList.add('result-card');
  
      const image = document.createElement('img');
      image.src = temple.imageUrl;
      image.alt = temple.name;
  
      const name = document.createElement('h4');
      name.textContent = temple.name;
  
      const description = document.createElement('p');
      description.textContent = temple.description;
  
      resultCard.appendChild(image);
      resultCard.appendChild(name);
      resultCard.appendChild(description);
      templeSection.appendChild(resultCard);
  
      resultsContainer.appendChild(templeSection);
    });
  
    // Mostrar las recomendaciones de playas
    data.beaches.forEach(beach => {
      const beachSection = document.createElement('section');
      beachSection.classList.add('beach-section');
  
      const beachTitle = document.createElement('h3');
      beachTitle.textContent = beach.name;
      beachSection.appendChild(beachTitle);
  
      const resultCard = document.createElement('div');
      resultCard.classList.add('result-card');
  
      const image = document.createElement('img');
      image.src = beach.imageUrl;
      image.alt = beach.name;
  
      const name = document.createElement('h4');
      name.textContent = beach.name;
  
      const description = document.createElement('p');
      description.textContent = beach.description;
  
      resultCard.appendChild(image);
      resultCard.appendChild(name);
      resultCard.appendChild(description);
      beachSection.appendChild(resultCard);
  
      resultsContainer.appendChild(beachSection);
    });
  }
  
  // Función para filtrar recomendaciones basado en la palabra clave
  function searchRecommendations() {
    const keyword = document.getElementById('search-input').value.toLowerCase();  // Obtener palabra clave y convertir a minúsculas
    const data = window.recommendationsData;  // Usamos los datos globales
  
    const filteredResults = {
      countries: [],
      temples: [],
      beaches: []
    };
  
    // Filtrar países
    data.countries.forEach(country => {
      const matchedCities = country.cities.filter(city => 
        city.name.toLowerCase().includes(keyword) || city.description.toLowerCase().includes(keyword)
      );
  
      if (matchedCities.length > 0) {
        filteredResults.countries.push({
          name: country.name,
          cities: matchedCities
        });
      }
    });
  
    // Filtrar templos
    data.temples.forEach(temple => {
      if (temple.name.toLowerCase().includes(keyword) || temple.description.toLowerCase().includes(keyword)) {
        filteredResults.temples.push(temple);
      }
    });
  
    // Filtrar playas
    data.beaches.forEach(beach => {
      if (beach.name.toLowerCase().includes(keyword) || beach.description.toLowerCase().includes(keyword)) {
        filteredResults.beaches.push(beach);
      }
    });
  
    // Mostrar solo los resultados filtrados
    displayRecommendations(filteredResults);
  }
  
  // Función para resetear los resultados
  function resetSearch() {
    document.getElementById('search-input').value = '';  // Limpiar campo de búsqueda
    displayRecommendations(window.recommendationsData);  // Mostrar todas las recomendaciones nuevamente
  }
  
  // Agregar eventos para los botones de búsqueda y reset
  document.getElementById('search-button').addEventListener('click', searchRecommendations);
  document.getElementById('reset-button').addEventListener('click', resetSearch);
  
  // Llamar la función para obtener y mostrar recomendaciones al cargar la página
  document.addEventListener('DOMContentLoaded', fetchRecommendations);
  