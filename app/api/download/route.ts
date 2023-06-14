import { NextResponse } from "next/server";

const fs = require("fs");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
  return NextResponse.json(fileContent);
}
