import { signOut } from "@/auth";

export async function GET(request, { params }) {
  await signOut();
}
