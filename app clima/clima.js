const input = document.querySelector(".barra-de-busqueda input");
const boton = document.querySelector(".barra-de-busqueda button");
const iconoClima = document.querySelector(".icono-del-clima");
const climaDiv = document.querySelector(".clima");
const errorDiv = document.querySelector(".error");

async function ConsultaTiempo(ciudad) {
  try {
    const apiKey = "a1ebe2d0b1604e1ef41c7437823412cf";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      errorDiv.style.display = "block";
      climaDiv.style.display = "none";
      return;
    }

    const data = await response.json();
    actualizarTiempo(data);

  } catch (error) {
    console.log(error);
  }
}

function actualizarTiempo(data) {
  document.querySelector(".temperatura").innerHTML =`${Math.round(data.main.temp)}°C`;
  document.querySelector(".ciudad").innerHTML = data.name;
  document.querySelector(".humedad").innerHTML =`${data.main.humidity}%`;
  document.querySelector(".viento").innerHTML =`${Math.round(data.wind.speed)} km/h`;

  const iconos = {
    Clear: "imagenes/cielo_despejado.png",
    Snow: "imagenes/nieve.png",
    Rain: "imagenes/lluvia.png",
    Clouds: "imagenes/nubes.png"
  };

  iconoClima.src =
    iconos[data.weather[0].main] || "imagenes/tiempo.png";

  errorDiv.style.display = "none";
  climaDiv.style.display = "block";
}


boton.addEventListener("click", () => {
  ConsultaTiempo(input.value.trim());
});


input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    ConsultaTiempo(input.value.trim());
  }
});