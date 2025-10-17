const konamiCode = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];
let position = 0; 
window.addEventListener("keydown", (event) => {if (event.key === konamiCode[position]) 
    {position++;if (position === konamiCode.length) 
        {activateKonami(); position = 0; }
  } 
  else {
    position = 0;
  }
});

function activateKonami() {
  const message = document.createElement("h1");
  message.textContent = "La Plateforme_"; 
  message.style.color = "blue";          
  message.style.textAlign = "center";
  message.style.marginTop = "200px";
  message.style.fontSize = "3em";

  document.body.appendChild(message);
}
