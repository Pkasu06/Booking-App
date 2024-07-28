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
    const body = JSON.stringify({
      data: [],
      message: "failed to get services list",
      error: error?.message,
    });

    return new Response(body, {
      status: 500,
    });
  }
}

async function getServicesList(): Promise<servicesData[]> {
  const response = await fetch(`${API_URL}/services`);

  if (!response.ok) {
    throw Error("Error getting data from server");
  }
  const data: servicesData[] = await response.json();
  return data;
}
