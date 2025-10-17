function addone()
{
    const boutton = document.querySelector("#button");
    const compteur = document.querySelector("#compteur");

    let valeur= parseInt(compteur.textContent) || 0;

    boutton.addEventListener("click", () => { 
        valeur++;
        compteur.textContent = valeur;
    });
}
addone();