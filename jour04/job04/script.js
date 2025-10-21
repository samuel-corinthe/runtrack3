document.getElementById("update").addEventListener("click", () => {
  fetch("users.php")
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector("#table tbody");
      tbody.innerHTML = "";

      data.forEach(user => {
        tbody.innerHTML += `
          <tr>
            <td>${user.id}</td>
            <td>${user.nom}</td>
            <td>${user.prenom}</td>
            <td>${user.email}</td>
          </tr>
        `;
      });
    });
});
