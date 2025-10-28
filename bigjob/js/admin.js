document.addEventListener("DOMContentLoaded", () => {
  guard(["admin"]);
  const tbody = document.querySelector("#usersTable tbody");

  function render() {
    const data = readData();
    tbody.innerHTML = "";
    for (const u of data.users) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.fullname}</td>
        <td>${u.email}</td>
        <td><span class="badge text-bg-${
          u.role === "admin" ? "warning-subtle" : "secondary"
        }">${u.role}</span></td>
        <td>
          <select class="form-select form-select-sm" data-id="${u.id}">
            <option value="user" ${
              u.role === "user" ? "selected" : ""
            }>user</option>
            <option value="moderator" ${
              u.role === "moderator" ? "selected" : ""
            }>moderator</option>
            <option value="admin" ${
              u.role === "admin" ? "selected" : ""
            }>admin</option>
          </select>
        </td>`;
      tbody.appendChild(tr);
    }
  }
  

  tbody.addEventListener("change", (e) => {
    const sel = e.target.closest("select[data-id]");
    if (!sel) return;
    const id = Number(sel.dataset.id);
    const role = sel.value;
    const data = readData();
    const u = data.users.find((x) => x.id === id);
    if (!u) return;
    u.role = role;
    writeData(data);
    render();
  });

  render();
});
