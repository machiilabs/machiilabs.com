import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match admin + auth callback. Marketing routes stay public and skip
     * the session refresh cost.
     */
    "/admin",
    "/admin/:path*",
    "/auth/:path*",
  ],
};
