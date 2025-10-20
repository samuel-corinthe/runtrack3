const button = document.getElementById('button');
const paragraphe = document.getElementById('contenu');

button.addEventListener ('click', () => {
fetch('expression.txt')
.then(response=> {return response.text();})
.then(data => {paragraphe.textContent= data;})
})

