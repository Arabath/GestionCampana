import XLSX from "xlsx";

export default function createExcelFile(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "");
  XLSX.writeFile(workbook, "export.xlsx", { compression: true })
}