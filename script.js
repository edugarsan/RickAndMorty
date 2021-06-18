
//RICK AND MORTY

class Personaje {
  constructor(nombre, foto, cantidadEpisodios, primerEpisodioNombre, primerEpisodioFecha) {
    this.nombre = nombre;
    this.foto = foto;
    this.cantidadEpisodios = cantidadEpisodios;
    this.primerEpisodioNombre = primerEpisodioNombre;
    this.primerEpisodioFecha = primerEpisodioFecha;
  }

  generarFicha() {
    return `        
    <article class="pokemon-card">
    <img class="producto" src="${this.foto}" alt="${this.nombre}">
    <h3 class="nombre">${this.nombre}</h3>
    <div class="detalleRick">
    <h6>Sale en ${this.cantidadEpisodios} episodio(s)</h6>
    <h6>Primer episodio: ${this.primerEpisodioNombre} </h6>
    <h6>Fecha: ${this.primerEpisodioFecha} </h6>
    </div>
</article>`;
  };
}

async function getRickAndMortyAsync() {
  let response = await fetch(`https://rickandmortyapi.com/api/character`);
  let cantidad = await response.json();
  let pjAleatorio = Math.floor(Math.random() * cantidad.info.count + 1);
  let response2 = await fetch(`https://rickandmortyapi.com/api/character/` + pjAleatorio);
  let pj = await response2.json();
  let response3 = await fetch(`${pj.episode[0]}`);
  let capitulo = await response3.json();

  let personaje = new Personaje(pj.name, pj.image, pj.episode.length, capitulo.name, capitulo.air_date);

  return personaje.generarFicha();
}


function personajeAleatoria() {
  document.querySelector("#resultadoPersonajeAleatorio").innerHTML = `        
  <article class="pokemon-card">
  <img class="producto" src="images/loading2.gif" alt="" style="padding:200px">
</article>`

  getRickAndMortyAsync()
    .then(detalle => {
      document.querySelector("#resultadoPersonajeAleatorio").innerHTML = detalle;
    }).catch(error => console.log("hubo un error" + error));

}



