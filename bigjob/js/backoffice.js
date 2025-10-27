document.addEventListener("DOMContentLoaded", () => {
  guard(["moderator", "admin"]);
  const tbody = document.querySelector("#pendingTable tbody");

  function render() {
    const data = readData();
    const pending = data.presenceRequests
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));
    const usersById = Object.fromEntries(data.users.map((u) => [u.id, u]));
    tbody.innerHTML = "";
    for (const r of pending) {
      const u = usersById[r.userId];
      const disableChange =
        new Date(r.date).toISOString().slice(0, 10) <
        new Date().toISOString().slice(0, 10);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${u?.fullname || "Inconnu"}</td>
        <td>${u?.email || "-"}</td>
        <td>${r.date}</td>
        <td><span class="badge text-bg-${
          r.status === "approved"
            ? "success"
            : r.status === "rejected"
            ? "danger"
            : "secondary"
        }">${r.status}</span></td>
        <td class="d-flex gap-2">
          <button class="btn btn-sm btn-success" data-act="approve" data-id="${
            r.id
          }" ${disableChange ? "disabled" : ""}>Accepter</button>
          <button class="btn btn-sm btn-danger" data-act="reject" data-id="${
            r.id
          }" ${disableChange ? "disabled" : ""}>Refuser</button>
        </td>`;
      tbody.appendChild(row);
    }
  }

  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const act = btn.dataset.act;
    const data = readData();
    const r = data.presenceRequests.find((x) => x.id === id);
    if (!r) return;
    if (new Date(r.date) < new Date(new Date().toDateString()))
      return alert("Date passée : décision figée.");
    r.status = act === "approve" ? "approved" : "rejected";
    writeData(data);
    render();
  });

  render();
});
