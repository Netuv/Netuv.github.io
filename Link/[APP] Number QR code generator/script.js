// Function to generate a QR code and save it
function generateQRCode(text) {
  // Generate the QR code using the API
  var qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(text);

  // Create an image element for the QR code
  var qrImage = new Image();
  qrImage.crossOrigin = "Anonymous";
  qrImage.src = qrCodeUrl;

  // Wait for the image to load
  qrImage.onload = function() {
    // Create a canvas element
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = qrImage.width;
    canvas.height = qrImage.height + 40; // Add extra space for the number

    // Draw the QR code image onto the canvas
    context.drawImage(qrImage, 0, 0);

    // Set the font style for the number
    context.font = "bold 36px Arial";
    context.textAlign = "center";
    context.fillStyle = "black";

    // Add the number below the QR code
    context.fillText(text, qrImage.width / 2, qrImage.height + 40);

    // Save the modified canvas as an image
    qrCodeImages.push({ text: text, dataUrl: canvas.toDataURL("image/png") });

    // Check if all QR codes have been generated
    if (qrCodeImages.length === 1000) {
      enableSaveAllButton();
    }
  };
}

// Array to store the generated QR code images
var qrCodeImages = [];

// Generate QR codes from Number ex.(001-1000) ======== [ EDIT NUMBER ] ===========
for (var i = 001; i <= 10; i++) {
  var number = i.toString().padStart(3, "0"); // ====== [ Number Digits ] ===========
  generateQRCode(number);
}

// Function to enable the "Save All QR Codes" button
function enableSaveAllButton() {
  var saveAllButton = document.getElementById("saveAllButton");
  saveAllButton.disabled = false;
}

// Function to save all QR codes
function saveAllQRCodes() {
  var index = 0;
  var interval = setInterval(function() {
    if (index >= qrCodeImages.length) {
      clearInterval(interval);
      return;
    }

    var qrCode = qrCodeImages[index];
    var link = document.createElement("a");
    link.href = qrCode.dataUrl;
    link.download = "qr_code_" + qrCode.text + ".png";
    link.click();

    index++;
  }, 500); // Delay between each download (1000 milliseconds = 1 second)
}

// Event listener for the "Save All QR Codes" button
var saveAllButton = document.getElementById("saveAllButton");
saveAllButton.addEventListener("click", saveAllQRCodes);