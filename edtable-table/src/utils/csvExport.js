export const exportCSV = (data) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(","),
        ...data.map((row) =>
            headers.map((h) => row[h]).join(",")
        )
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.document = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}