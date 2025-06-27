import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, filename = 'data.xlsx') => {
  // Ensure the data is properly formatted
  const formattedData = data.map(row => {
    return Object.fromEntries(
      Object.entries(row).map(([key, value]) => [key, value ])
    );
  });
  
  // Calculate dynamic column widths
  const colWidths = Object.keys(formattedData[0] || {}).map(key => {
    const maxLength = Math.max(
      key.length, // Header length
      ...formattedData.map(row => (row[key] ? row[key].toString().length : 0)) // Data length
    );
    return { wch: maxLength + 4 }; // Add padding for better visibility
  });

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Apply column widths
  worksheet['!cols'] = colWidths;

  // Apply styles (e.g., alignment)
  Object.keys(worksheet).forEach(cell => {
    if (cell[0] === '!') return;
    worksheet[cell].s = { alignment: { horizontal: 'left' } };
  });

  // Create workbook and write to Excel
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Save file
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, filename);
};
