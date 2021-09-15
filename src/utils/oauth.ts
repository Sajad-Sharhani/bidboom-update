import * as redis from "../utils/asyncRedis";
import axios from "axios";
import type { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

let connectionCache: OAuth2Client;

function createOAuthConnection(redirect: string) {
  if (connectionCache) return connectionCache;
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  return (connectionCache = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    redirect
  ));
}

export async function generateUrl(redirect: string = "http://localhost:3000") {
  await redis.set("REDIRECT_URI", redirect);
  const connection = createOAuthConnection(redirect);

  return connection.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
}

export async function getAccount(code: string) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  const redirectUri = await redis.get("REDIRECT_URI");

  const { data: tokens } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
    },
  });
  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });

  return {
    name: data.name as string,
    email: data.email as string,
    image: data.picture as string,
  };
}
