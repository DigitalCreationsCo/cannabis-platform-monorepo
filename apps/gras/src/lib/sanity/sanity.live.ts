// src/sanity/lib/live.ts

import { defineLive } from "next-sanity";
import { getClient } from "@/lib/sanity/sanity.client";
import { readToken as token } from "@/lib/sanity/sanity.api";

export const { sanityFetch, SanityLive } = defineLive({
  client: getClient({ token }),
  browserToken: token,
  serverToken: token,
});