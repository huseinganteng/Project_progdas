let productCounter = 1; // Counter untuk kode produk
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable").querySelector("tbody");
const editModal = document.getElementById("editModal");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");

let editRow = null; // Baris yang sedang diedit

// Event listener untuk submit form tambah produk
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const kodeProduk = `MD-${productCounter.toString().padStart(2, "0")}`;
  const namaProduk = document.getElementById("nama_produk").value;
  const kategori = document.getElementById("category").value;
  const productImage = document.getElementById("productImage").value || "#";
  const harga = parseFloat(document.getElementById("price").value).toFixed(2);
  const satuan = document.getElementById("unit").value;
  const stok = parseInt(document.getElementById("stock").value, 10);

  // Validasi stok tidak boleh negatif
  if (stok < 0) {
    alert("Stok tidak boleh kurang dari 0.");
    return;
  }

  // Menambahkan baris ke tabel
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${kodeProduk}</td>
    <td>${namaProduk}</td>
    <td>${kategori}</td>
    <td><img src="${productImage}" alt="${namaProduk}" style="width:50px; height:50px;"></td>
    <td>${harga}</td>
    <td>${satuan}</td>
    <td class="${stok < 5 ? "bg-red" : ""}">${stok}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Hapus</button>
    </td>
  `;

  // Event listener untuk tombol edit
  row.querySelector(".edit-btn").addEventListener("click", () => openEditModal(row));

  // Event listener untuk tombol hapus
  row.querySelector(".delete-btn").addEventListener("click", () => openDeleteModal(row));

  productTable.appendChild(row);
  productCounter++; // Menambah counter kode produk
  productForm.reset(); // Reset form setelah submit
});

// Fungsi untuk membuka modal edit
const openEditModal = (row) => {
  editRow = row;
  const cells = row.querySelectorAll("td");

  document.getElementById("editProductName").value = cells[1].innerText;
  document.getElementById("editCategory").value = cells[2].innerText;
  document.getElementById("editProductImage").value = cells[3].querySelector("img").src;
  document.getElementById("editPrice").value = cells[4].innerText;
  document.getElementById("editUnit").value = cells[5].innerText;
  document.getElementById("editStock").value = cells[6].innerText;

  editModal.style.display = "block"; // Tampilkan modal edit
};

// Simpan perubahan setelah edit
document.getElementById("editProductForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const cells = editRow.querySelectorAll("td");

  cells[1].innerText = document.getElementById("editProductName").value;
  cells[2].innerText = document.getElementById("editCategory").value;
  cells[3].querySelector("img").src = document.getElementById("editProductImage").value;
  cells[4].innerText = parseFloat(document.getElementById("editPrice").value).toFixed(2);
  cells[5].innerText = document.getElementById("editUnit").value;
  const stok = parseInt(document.getElementById("editStock").value, 10);
  cells[6].innerText = stok;
  cells[6].className = stok < 5 ? "bg-red" : "";

  editModal.style.display = "none"; // Sembunyikan modal edit
});

// Fungsi untuk membuka modal hapus
const openDeleteModal = (row) => {
  deleteConfirmModal.style.display = "block"; // Tampilkan modal hapus

  document.getElementById("confirmDelete").onclick = () => {
    row.remove();
    deleteConfirmModal.style.display = "none"; // Sembunyikan modal hapus
  };

  document.getElementById("cancelDelete").onclick = () => {
    deleteConfirmModal.style.display = "none"; // Sembunyikan modal hapus
  };
};

// Tutup modal edit
document.getElementById("closeModal").onclick = () => {
  editModal.style.display = "none";
};
