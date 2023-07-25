// document.addEventListener('DOMContentLoaded', () => {
//     const cityInfoContainer = document.getElementById('cityInfoContainer');
//     const selectedCountry = JSON.parse(localStorage.getItem('selectedCountry'));

//     console.log(selectedCountry)
//     if (selectedCountry) {
//         cityInfoContainer.innerHTML = `
//             <p>
//                 Nombre: ${selectedCountry.nombre} <br>
//                 Latitud: ${selectedCountry.latitud} <br>
//                 Longitud: ${selectedCountry.longitud}
//             </p>
//         `;
//     } else {
//         cityInfoContainer.innerHTML = '<p>No se ha seleccionado ningún país.</p>';
//     }

//     // Si deseas, puedes eliminar la información del país seleccionado de LocalStorage después de mostrarla.
//     localStorage.removeItem('selectedCountry');
// });

const paramsWeather = {
    appid: '582dbb29e2d08fc2941f9b78e473d343',
    units: 'metric',
    lang: 'es'
};

async function climaLugar(lat, lon) {
    try {
        const url = new URL('https://api.openweathermap.org/data/2.5/weather');
        url.searchParams.append('lat', lat);
        url.searchParams.append('lon', lon);


        // Agregar los parámetros de paramsWeather a la URL
        for (const key in paramsWeather) {
            url.searchParams.append(key, paramsWeather[key]);
        }

        const response = await fetch(url);
        const data = await response.json();

        const { weather, main } = data;

        return {
            weather,
            main
        };
    } catch (error) {
        console.log(error);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const cityInfoContainer = document.getElementById('cityInfoContainer');
    const selectedCountry = JSON.parse(localStorage.getItem('selectedCountry'));

    console.log(selectedCountry);
    if (selectedCountry) {
        try {
            // Llamar a climaLugar con los parámetros de latitud y longitud
            const clima = await climaLugar(selectedCountry.latitud, selectedCountry.longitud);

            console.log(clima)
            // Mostrar la información del clima en cityInfoContainer
            cityInfoContainer.innerHTML = `
                <p>${selectedCountry.nombre}</p>

                <p>Descripcion del clima:  ${clima.weather[0].description} </p> 
                <hr>
                <p>Huemdad: ${clima.main.humidity}             %        &#127778;;</p>
                <p>Temperatura minima: ${clima.main.temp_min}  &#8451   &#127777;</p>
                <p>Temperatura maxima: ${clima.main.temp_max}  &#8451   &#127777;</p>
                <p>Temperatura actual: ${clima.main.temp}      &#8451   &#127777;</p>
                <p>Sensacion termica: ${clima.main.feels_like} &#8451   &#127777;</p>

        `;
        } catch (error) {
            console.error('Error al obtener información del clima:', error.message);
        }
    } else {
        cityInfoContainer.innerHTML = '<p>No se ha seleccionado ningún país.</p>';
    }

    // Si deseas, puedes eliminar la información del país seleccionado de LocalStorage después de mostrarla.
    localStorage.removeItem('selectedCountry');
});
