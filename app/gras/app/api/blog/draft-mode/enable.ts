import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { getClient } from "@/lib/sanity/sanity.client";
import { readToken as token } from "@/lib/sanity/sanity.api"

export const { GET } = defineEnableDraftMode({
  client: getClient({ token }),
});