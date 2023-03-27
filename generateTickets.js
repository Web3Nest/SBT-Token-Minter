const fs = require('fs');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const csv = require('csv-parser');




const inputFile = 'C:/Users/Mayank Sharma/Desktop/SBT-Token/tickets_with_addresses.csv';
const outputDir = 'tickets';

async function generateTicket(name, enrollmentNo, organization, address) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Embed the Helvetica font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add a new page to the document
  const page = pdfDoc.addPage([600, 400]);

  // Draw the text on the page
  page.drawText(`Name: ${name}`, { x: 50, y: 350, size: 20, font });
  page.drawText(`Enrollment No: ${enrollmentNo}`, { x: 50, y: 310, size: 20, font });
  page.drawText(`Organization: ${organization}`, { x: 50, y: 270, size: 20, font });
  page.drawText(`Address: ${address}`, { x: 50, y: 230, size: 14, font });

  // Serialize the PDF document to bytes
  const pdfBytes = await pdfDoc.save();

  // Save the PDF document to a file
  await fs.promises.writeFile(`./tickets/${name}_${enrollmentNo}.pdf`, pdfBytes);
}

async function generateTickets() {
  console.log('Generating PDF tickets...');

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', async (row) => {
      await generateTicket(row.name, row.enrollmentNo, row.organization, row.Address);
    })
    .on('end', () => {
      console.log('All tickets generated!');
    });
}

generateTickets();
