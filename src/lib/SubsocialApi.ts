import { SubsocialApi, generateCrustAuthToken } from "@subsocial/api";

import { waitReady } from "@polkadot/wasm-crypto";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const initializeApi = async () => {
  await waitReady();

  const api = await SubsocialApi.create({
    substrateNodeUrl: "wss://rco-para.subsocial.network",
    ipfsNodeUrl: "https://crustwebsites.net",
    offchainUrl: "http://127.0.0.1:3001",
  });

  api.ipfs.setWriteHeaders({
    authorization: "Basic " + publicRuntimeConfig.apiAuthHeader,
  });

  return api;
};

export default initializeApi;
