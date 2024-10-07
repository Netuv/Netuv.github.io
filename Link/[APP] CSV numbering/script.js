function generateCSV() {

//=========================================================================

  const startNumber = 1; // < -- Edit Start Number Here
  const endNumber = 322; // < -- Edit Start Number Here

// Don't Start the number with "0" Add 0 in Excel

//============================== [The Rest of Script ======================
  
	const csvContent = convertRangeToCSV(startNumber, endNumber);

  downloadCSV(csvContent);
}

function convertRangeToCSV(startNumber, endNumber) {
  let csv = 'Number\n'; // ====================== Header [Copy = Number | #Qrcodes ]
  for (let i = startNumber; i <= endNumber; i++) {
    const paddedNumber = String(i).padStart(3, '0'); // ==================[(x, '0') <-- edit x for how many "0" u want! base on digit e.g : 0001 = 4, 001 = 3
    const csvRow = `"${paddedNumber}"\n`;
    csv += csvRow;
  }
  return csv;
}

function downloadCSV(csvData) {
  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', '001-322.csv'); // <-- ===== [Change File Name] ======
  link.click();
}
