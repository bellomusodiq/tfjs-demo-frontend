import { NextResponse } from "next/server";

const fs = require("fs");
const csvWriter = require("csv-write-stream");

function getCsvFileLength(csvFilePath) {
  const fileContent = fs.readFileSync(csvFilePath, "utf8");
  const rows = fileContent.split("\n");
  const length = rows.length - 1; // Subtract 1 to exclude the header row (if any)

  return length;
}

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  const csvFilePath = "data.csv";
  // Append the JSON data to the CSV file
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream(csvFilePath, { flags: "a" }));
  writer.write(res);
  writer.end();

  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  function getCsvFileLength(csvFilePath) {
    const fileContent = fs.readFileSync(csvFilePath, "utf8");
    const rows = fileContent.split("\n");
    const length = rows.length - 2; // Subtract 1 to exclude the header row (if any)

    return length;
  }
  return NextResponse.json({ prompCount: getCsvFileLength("data.csv") });
}
