// File: app/api/upload-auth/route.ts
import config from "@/lib/config";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  // Your application logic to authenticate the user
  // For example, you can check if the user is logged in or has the necessary permissions
  // If the user is not authenticated, you can return an error response

  const { token, expire, signature } = getUploadAuthParams({
    privateKey: config.env.imageKit.privateKey as string, // Never expose this on client side
    publicKey: config.env.imageKit.publicKey as string,
    // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
    // token: "random-token", // Optional, a unique token for request
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: config.env.imageKit.publicKey,
  });
}
