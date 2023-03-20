import type { NetworkName, NetworkPrefix } from "./types";

export const COLORS = {
  black: "#1E1E1E",
  blue: "#0007B0",
  pink: "#ED9AC9",
  red: "#FF5262",
  white: "#FFFFFF",
  grey: "#F6F6F6",
} as const;

export const APP_CHAINS: Array<{
  chainId: number;
  name: NetworkName;
  prefix: NetworkPrefix;
}> = [
  { chainId: 42161, prefix: "A", name: "arbitrum" },
  { chainId: 8453, prefix: "B", name: "base" },
  { chainId: 5, prefix: "G", name: "goerli" },
  { chainId: 1, prefix: "E", name: "mainnet" },
  { chainId: 10, prefix: "O", name: "optimism" },
  { chainId: 137, prefix: "P", name: "polygon" },
];
