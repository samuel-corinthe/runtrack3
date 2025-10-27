function fmt(d) {
  return new Date(d).toISOString().slice(0, 10);
}
function today() {
  return fmt(new Date());
}

function isPast(dateStr) {
  return fmt(dateStr) < today();
}

function renderMyRequests() {
  const u = getCurrentUser();
  const data = readData();
  const tbody = document.querySelector("#myRequestsTable tbody");
  tbody.innerHTML = "";
  const mine = (data.presenceRequests || [])
    .filter((r) => r.userId === u.id)
    .sort((a, b) => a.date.localeCompare(b.date));
  for (const r of mine) {
    const tr = document.createElement("tr");
    const disableChange = isPast(r.date);
    tr.innerHTML = `
      <td>${r.date}</td>
      <td><span class="badge text-bg-${
        r.status === "approved"
          ? "success"
          : r.status === "rejected"
          ? "danger"
          : "secondary"
      }">${r.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-danger" data-id="${r.id}" ${
      disableChange ? "disabled" : ""
    }>Annuler</button>
      </td>`;
    tbody.appendChild(tr);
  }
  tbody.querySelectorAll("button").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const data = readData();
      const req = data.presenceRequests.find((r) => r.id === id);
      if (!req) return;
      if (isPast(req.date))
        return alert("La date est passée, vous ne pouvez plus modifier.");
      data.presenceRequests = data.presenceRequests.filter((r) => r.id !== id);
      writeData(data);
      renderMyRequests();
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  guard();
  const dateInput = document.getElementById("presenceDate");
  if (dateInput) dateInput.min = today();

  const form = document.getElementById("presenceForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = getCurrentUser();
    const data = readData();
    const date = document.getElementById("presenceDate").value;
    if (!date) return;
    const already = data.presenceRequests.some(
      (r) => r.userId === u.id && r.date === date
    );
    if (already) return alert("Vous avez déjà une demande pour cette date.");
    const id = Math.max(0, ...data.presenceRequests.map((r) => r.id)) + 1;
    data.presenceRequests.push({ id, userId: u.id, date, status: "pending" });
    writeData(data);
    document.getElementById("presenceDate").value = "";
    renderMyRequests();
  });

  renderMyRequests();
});
