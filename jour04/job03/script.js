const bouton = document.getElementById('filtrer');
const resultat = document.getElementById('result');

bouton.addEventListener('click', () => {
  const id = document.getElementById('id').value.trim();
  const nom = document.getElementById('nom').value.trim().toLowerCase();
  const type = document.getElementById('type').value;

  fetch('pokemon.json')
    .then(response => response.json())
    .then(data => {
      const filtres = data.filter(pokemon => 
        (id === '' || pokemon.id == id) &&
        (nom === '' || pokemon.name.french.toLowerCase().includes(nom)) &&
        (type === '' || pokemon.type.includes(type))
      );

      resultat.innerHTML = '';

      if (filtres.length === 0) {
        resultat.innerHTML = '<p>Aucun Pokémon trouvé</p>';
      } else {
        filtres.forEach(pokemon => {
          resultat.innerHTML += `
            <div>
              <h3>${pokemon.name.french}</h3>
              <p>ID : ${pokemon.id}</p>
              <p>Type : ${pokemon.type.join(', ')}</p>
            </div>
          `;
        });
      }
    });
});
