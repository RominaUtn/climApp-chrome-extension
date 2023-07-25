const params = {
    'access_token': 'pk.eyJ1IjoicmlqbWphZGEiLCJhIjoiY2xrNG16bndoMGdmczNlcDhiZm52dW16biJ9.uSkHjLrV1cSpLMo0a7pKFA',
    'limit': 5,
    'language': 'es'
};


const searchFunction = async (lugar) => {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?${queryParams}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data.features.map(lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            longitud: lugar.center[0],
            latitud: lugar.center[1],
        }));
    } catch (error) {
        console.log('Error:', error.message);
    }
};



const searchInput = document.getElementById('searchInput');

const countriesContainer = document.getElementById('countriesContainer');

// Función para manejar el evento de clic en el botón de búsqueda
const handleSearchClick = () => {
    const lugar = searchInput.value.trim(); // Obtener el valor del input
    if (lugar !== '') {
        // Limpiar el contenedor antes de realizar una nueva búsqueda
        countriesContainer.innerHTML = '';
        // Llamar a la función searchFunction y agregar los botones dinámicamente.
        searchFunction(lugar)
            .then(countries => {
                countries.forEach(country => {
                    // Crear el botón para cada país (objeto).
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.classList.add('btn', 'btn-success','fs-6');
                    button.innerText = country.nombre; // Puedes cambiar el texto que se mostrará en el botón aquí.

                    // Agregar el evento de clic al botón
                    button.addEventListener('click', () => {
                        handleButtonClick(country);
                    });

                    // Agregar el botón al contenedor de países.
                    countriesContainer.appendChild(button);
                });
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }
};

// Asociar la función de búsqueda al evento de clic del botón de búsqueda
searchInput.addEventListener('change', handleSearchClick);

// Función para manejar el evento de clic en cada botón
const handleButtonClick = (country) => {
    localStorage.setItem('selectedCountry', JSON.stringify(country));
    window.location.href = 'city.html';
};