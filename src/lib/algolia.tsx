import { liteClient as algoliasearch } from "algoliasearch/lite";

export const ALGOLIA_INDEX_NAME = "venues_dc_with_music";
export const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
export const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;
export const searchClient = algoliasearch(appId, apiKey);
