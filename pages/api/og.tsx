import type { ColorId } from "../../lib/types";

import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { createPublicClient, http } from "viem";
import { goerli } from "viem/chains";

import { PromiseCard } from "../../components/PromiseCard";
import { PinkyPromiseAbi } from "../../lib/abis";
import { COLORS } from "../../lib/constants";
import { NETWORKS } from "../../lib/env";
import {
  appChainFromPrefix,
  enumKeyToColor,
  formatDate,
  isColorEnumKey,
  isPromiseStateEnumKey,
  parseFullPromiseId,
  promiseColors,
  promiseStateFromEnumKey,
} from "../../lib/utils";

export const config = {
  runtime: "edge",
};

const client = createPublicClient({
  chain: goerli,
  transport: http(),
});

const fetchingFonts = Promise.all(([
  // Edge seems to require new URL() params to be static
  [new URL("../../assets/SpaceGrotesk-Regular.ttf", import.meta.url), 400],
  [new URL("../../assets/SpaceGrotesk-SemiBold.ttf", import.meta.url), 600],
] as const).map(async ([url, weight]) => {
  const res = await fetch(url);
  const data = await res.arrayBuffer();
  return { name: "SpaceGrotesk", data, weight };
}));

const BACKGROUNDS = new Map<ColorId, URL>([
  // Edge seems to require new URL() params to be static
  ["pink", new URL("../../assets/pink.png", import.meta.url)],
  ["blue", new URL("../../assets/blue.png", import.meta.url)],
  ["red", new URL("../../assets/red.png", import.meta.url)],
  ["black", new URL("../../assets/black.png", import.meta.url)],
]);

const TAPES = new Map<ColorId, URL>([
  // Edge seems to require new URL() params to be static
  ["pink", new URL("../../assets/tape-pink.png", import.meta.url)],
  ["blue", new URL("../../assets/tape-blue.png", import.meta.url)],
  ["red", new URL("../../assets/tape-red.png", import.meta.url)],
  ["black", new URL("../../assets/tape-black.png", import.meta.url)],
]);

async function fetchAsDataUri(url: URL, type: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      "",
    ),
  );
  return `data:${type};base64,${base64}`;
}

const errorResponse = new Response(
  "Failed to generate the image",
  { status: 500 },
);

function getFullPromiseId(url: string) {
  const { searchParams } = new URL(url);
  const id = searchParams.get("promise");
  return id && parseFullPromiseId(id);
}

export default async function handler(req: NextRequest) {
  const fullPromiseId = getFullPromiseId(req.url);

  if (!fullPromiseId) {
    console.log("1");
    return errorResponse;
  }

  const [networkPrefix, promiseId] = fullPromiseId;

  const chain = appChainFromPrefix(networkPrefix);

  if (!chain) {
    console.log(2);
    return errorResponse;
  }

  let contractRead;
  try {
    contractRead = await client.readContract({
      address: NETWORKS[chain.name]?.contract ?? "0x",
      abi: PinkyPromiseAbi,
      functionName: "promiseInfo",
      args: [BigInt(promiseId)],
    });
  } catch (_) {
    console.log(3);
    return errorResponse;
  }

  const [
    data,
    stateEnumKey,
    _signees,
    _signingStates,
    signedOn,
  ] = contractRead;

  const state = isPromiseStateEnumKey(stateEnumKey)
    ? promiseStateFromEnumKey(stateEnumKey)
    : "None";

  const signedOnTimestamp = Number(signedOn);

  const color = enumKeyToColor(isColorEnumKey(data.color) ? data.color : 0);

  const colors = promiseColors(color);
  const backgroundColor = COLORS[color];
  const backgroundUrl = BACKGROUNDS.get(color);
  const tapeUrl = TAPES.get(color);

  if (!backgroundUrl || !tapeUrl) {
    console.log(4);
    return errorResponse;
  }

  const backgroundDataUri = await fetchAsDataUri(backgroundUrl, "image/png");
  const tapeDataUri = state === "Nullified" || state === "Discarded"
    ? await fetchAsDataUri(tapeUrl, "image/png")
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor,
          backgroundImage: `url(${backgroundDataUri})`,
        }}
      >
        <PromiseCard
          promiseId={`${networkPrefix}-${promiseId}`}
          promiseData={{
            bodyText: data.body,
            colors,
            signedOn: signedOnTimestamp === 0
              ? "−"
              : formatDate(new Date(signedOnTimestamp * 1000)),
            state,
            title: data.title,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: tapeDataUri ? `url(${tapeDataUri})` : "transparent",
          }}
        >
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: await fetchingFonts,
    },
  );
}
