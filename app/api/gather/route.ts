import { NextResponse } from "next/server";

const fs = require("fs");
const csvWriter = require("csv-write-stream");

export async function POST(request: Request) {
  const res = await request.json();
  request.headers.append("Allow-Access-Control-Origin", "*");
  const csvFilePath = "data.csv";
  // Append the JSON data to the CSV file
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream(csvFilePath, { flags: "a" }));
  writer.write(res);
  writer.end();

  return new NextResponse(JSON.stringify({ success: true }), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}

export async function GET(request: Request) {
  request.headers.append("Allow-Access-Control-Origin", "*");
  function getCsvFileLength(csvFilePath: string) {
    const fileContent = fs.readFileSync(csvFilePath, "utf8");
    const rows = fileContent.split("\n");
    const length = rows.length - 2; // Subtract 1 to exclude the header row (if any)

    return length;
  }

  return new NextResponse(
    JSON.stringify({ prompCount: getCsvFileLength("data.csv") }),
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );
}
