function addone()
{
    const boutton = document.querySelector("#button");
    const compteur = document.querySelector("#compteur");

    let valeur= parseInt(compteur.textContent);

    boutton.addEventListener("click", () => { 
        valeur++;
        compteur.textContent = valeur;
    });
}
addone();