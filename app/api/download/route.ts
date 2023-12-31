import { NextResponse } from "next/server";

const fs = require("fs");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  request.headers.append("Allow-Access-Control-Origin", "*");
  const delete_ = searchParams.get("delete");

  const fileContent = fs.readFileSync("data.csv", "utf8");
  if (delete_) {
    fs.unlink("data.csv", (err: any) => {
      if (err) {
      } else {
        return NextResponse.json(fileContent);
      }
    });
  }
  return new NextResponse(JSON.stringify(fileContent), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
