function citation() {
  const boutton = document.querySelector("#button");
  const citation = document.querySelector("#citation");

  boutton.addEventListener("click", () => {
    console.log(citation.textContent);
  });
}
citation();
