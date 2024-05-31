import { NextRequest } from "next/server";

const API_URL = process.env.API_URL;

type servicesData = {
  id: string;
  name: string;
  partsNeeded: string[];
};

const LOC = "/api/services";

export const dynamic = "force-dynamic"; // have next js NOT cache this request
export async function GET(request: NextRequest) {
  try {
    const data = await getServicesList();
    const body = JSON.stringify({ data });
    return new Response(body, {
      status: 200,
    });
  } catch (error) {
    const typeError = error as { message: string };
    const body = JSON.stringify({
      data: [],
      message: "failed to get services list",
      error: typeError?.message,
    });

    return new Response(body, {
      status: 500,
    });
  }
}

async function getServicesList(): Promise<servicesData[]> {
  // const data: servicesData[] = [
  //   {
  //     id: "1",
  //     name: "part one",
  //     partsNeeded: ["part id 1", "part id 2"],
  //   },
  // ];
  const response = await fetch(`${API_URL}/services`);
  const data: servicesData[] = await response.json();
  return data;
}

// Response.json({
//   Mes: "Hello, Next.js!",
//   env: process.env.API_URL,
// });

// return new Response(
//   { Mes: "Hello, Next.js!", env: process.env.API_URL },
//   {
//     status: 200,
//   }
// );
