const fs = require("fs");
const parse = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { Wallet } = require("ethers");

async function main() {
  const csvData = [];

  fs.createReadStream("C:/Users/Mayank Sharma/Desktop/SBT-Token/tickets.csv")
    .pipe(parse({ headers: true }))
    .on("data", (data) => csvData.push(data))
    .on("end", () => {
      console.log("Parsed CSV data:", csvData);

      const updatedRecords = csvData.map((record) => {
        const wallet = Wallet.createRandom();
        return {
          ...record,
          Address: wallet.address,
        };
      });

      console.log("Updated records with addresses:", updatedRecords);

      const csvWriter = createCsvWriter({
        path: "C:/Users/Mayank Sharma/Desktop/SBT-Token/tickets_with_addresses.csv",
        header: [
          { id: "name", title: "name" },
          { id: "enrollmentNo", title: "enrollmentNo" },
          { id: "organization", title: "organization" },
          { id: "Address", title: "Address" },
        ],
      });

      csvWriter
        .writeRecords(updatedRecords)
        .then(() => {
          console.log("Output CSV file generated");
        })
        .catch((error) => console.error(error));
    });
}

main();
  
