function convertToCSV() {
  const nameListInput = document.getElementById('nameList');
  const nameList = nameListInput.value.trim();

  if (!nameList) {
    alert('Please enter names.');
    return;
  }

  const names = nameList.split('\n');
  const csvContent = convertArrayToCSV(names);

  downloadCSV(csvContent);
}

function convertArrayToCSV(array) {
  let csv = 'Name\n';
  array.forEach(name => {
    const csvRow = `"${name.replace(/"/g, '""')}"\n`;
    csv += csvRow;
  });
  return csv;
}

function downloadCSV(csvData) {
  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', 'namelist.csv');
  link.click();
}