import errors from "../schema/errors";
import * as redis from "../utils/asyncRedis";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";
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
  let data;
  try {
    const oauth = google.oauth2("v2");
    data = (await oauth.tokeninfo({ id_token: code })).data;
  } catch (error) {
    throw new Error(errors[8].id);
  }

  return {
    email: data.email as string,
  };
}
