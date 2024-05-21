const API_URL = process.env.API_URL;
const LOC = "/api/services";

export const dynamic = "force-dynamic"; // have next js NOT cache this request
export async function GET(request, { params }) {
  try {
    const response = await getServicesList();

    const body = JSON.stringify({ data: response });

    return new Response(body, {
      status: 200,
    });
  } catch (error) {
    const body = JSON.stringify({
      message: "failed to get services list",
      error: error?.message,
    });

    return new Response(body, {
      status: 500,
    });
  }
}

async function getServicesList() {
  const response = await fetch(`${API_URL}/services`);

  if (!response.ok) {
    throw Error("failed to fetch services from api");
  }
  const data = await response.json();
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
