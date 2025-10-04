// Selección de elementos
const tituloCard = document.getElementById("tituloCard");
const namePokemon = document.getElementById("nombre_pokemon");
const imgPokemon = document.getElementById("img");

const idPokemon = document.getElementById("idPokemon");
const pesoPokemon = document.getElementById("pesoPokemon");
const alturaPokemon = document.getElementById("alturaPokemon");
const habilidadesPokemon = document.getElementById("habilidadesPokemon");

const inputBuscarNombre = document.getElementById("inputBuscarNombre");
const btnBuscarNombre = document.getElementById("btnBuscarNombre");

const inputBuscarID = document.getElementById("inputBuscarID");
const btnBuscarID = document.getElementById("btnBuscarID");

// Función principal
const obtenerPokemon = async (busqueda) => {
    try {
        // Mensaje mientras carga
        tituloCard.textContent = "Buscando Pokémon...";
        namePokemon.textContent = "";
        imgPokemon.src = "";
        imgPokemon.alt = "Buscando...";

        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`);
        if (!respuesta.ok) throw new Error("Pokémon no encontrado");

        const datos = await respuesta.json();

        // Actualizar la card
        tituloCard.textContent = "¡Pokémon Encontrado!";
        namePokemon.textContent = datos.name;

        // Imagen (busca la mejor disponible)
        imgPokemon.src = datos.sprites.other["official-artwork"].front_default 
                      || datos.sprites.other.dream_world.front_default 
                      || datos.sprites.front_default 
                      || "";
        imgPokemon.alt = datos.name;

        // Datos extras
        idPokemon.textContent = datos.id;
        pesoPokemon.textContent = (datos.weight / 10) + " kg";  // decímetros → kg
        alturaPokemon.textContent = (datos.height / 10) + " m"; // decímetros → metros

        // Habilidades como lista
        habilidadesPokemon.innerHTML = "";
        datos.abilities.forEach(hab => {
            const li = document.createElement("li");
            li.textContent = hab.ability.name;
            habilidadesPokemon.appendChild(li);
        });

    } catch (error) {
        tituloCard.textContent = "Error";
        namePokemon.textContent = "No se encontró el Pokémon";
        imgPokemon.src = "";
        imgPokemon.alt = "Imagen no disponible";
        idPokemon.textContent = "";
        pesoPokemon.textContent = "";
        alturaPokemon.textContent = "";
        habilidadesPokemon.innerHTML = "";
        console.error(error);
    }
};

// Al inicio: mostrar Pikachu
obtenerPokemon("pikachu");

// Eventos
btnBuscarNombre.addEventListener("click", () => {
    if (inputBuscarNombre.value.trim()) {
        obtenerPokemon(inputBuscarNombre.value.trim());
    }
});

btnBuscarID.addEventListener("click", () => {
    if (inputBuscarID.value.trim()) {
        obtenerPokemon(inputBuscarID.value.trim());
    }
});

// Buscar con Enter
inputBuscarNombre.addEventListener("keyup", (e) => {
  if (e.key === "Enter") obtenerPokemon(inputBuscarNombre.value.trim());
});

inputBuscarID.addEventListener("keyup", (e) => {
  if (e.key === "Enter") obtenerPokemon(inputBuscarID.value.trim());
});
