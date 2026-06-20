const BASE_URL = "http://localhost:5000/api/table";

export const fetchTableData = async (page, limit) => {
  const res = await fetch(`${BASE_URL}/data?page=${page}&limit=${limit}`);
  return res.json();
};

export const updateRowApi = async (id, data) => {
  const res = await fetch(`${BASE_URL}/data/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

export const deleteRowApi = async (id) => {
  const res = await fetch(`${BASE_URL}/data/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete failed");
  return res.json();
};