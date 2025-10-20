
function jsonValueKey(adress, key)
{
return adress[key];
} 
const adress = `{"name": "La Plateforme_","address": "8 Terasse Bellini","city": "Paris","nb_staff": "11","creation":"2024"}`;

// object = JSON.parse(adress);

console.log(jsonValueKey(adress.json(), "nb_staff"));

