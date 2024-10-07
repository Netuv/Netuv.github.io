function convertToCSV() {
  const fileInput = document.getElementById('fileInput');
  const files = fileInput.files;

  if (files.length === 0) {
    alert('No files selected.');
    return;
  }

  const csvContent = [['@image']]; // Add header row

  let fileIndex = 0;

  processFile(files, csvContent, fileIndex, function() {
    downloadCSV(csvContent);
  });
}

function processFile(files, csvContent, fileIndex, callback) {
  if (fileIndex === files.length) {
    // All files have been processed, invoke the callback
    callback();
    return;
  }

  const file = files[fileIndex];

  if (file.type === 'image/png') {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileName = file.name;
      const qrNumber = readQRNumber();

      const csvRow = [fileName, qrNumber];
      csvContent.push(csvRow);

      // Process the next file
      processFile(files, csvContent, fileIndex + 1, callback);
    };

    reader.readAsDataURL(file);
  } else {
    // Skip files of other types
    processFile(files, csvContent, fileIndex + 1, callback);
  }
}

function readQRNumber() {
  // Implement your QR code reading logic here
  // This function should extract the QR code number from the image data
  // You can use a QR code scanning library or custom implementation
  // For the sake of this example, we'll return an empty string
  
  return '';
}

function downloadCSV(csvData) {
  const csvContent = 'data:text/csv;charset=utf-8,' + convertArrayToCSV(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', 'qrdata.csv');
  link.click();
}

function convertArrayToCSV(array) {
  let csv = '';
  array.forEach(row => {
    const csvRow = row.map(value => '"' + value + '"').join(',');
    csv += csvRow + '\r\n';
  });
  return csv;
}
