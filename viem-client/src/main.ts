import { createPublicClient, http } from "viem";
import { goerli, mainnet, polygon } from "viem/chains";

const chains = {
  goerli: [goerli, http(process.env.VITE_RPC_URL_GOERLI)],
  polygon: [polygon, http(process.env.VITE_RPC_URL_POLYGON)],
  mainnet: [mainnet, http(process.env.VITE_RPC_URL_MAINNET)],
} as const;

export function getClient(chainId: keyof typeof chains) {
  const [chain, transport] = chains[chainId];
  return createPublicClient({ chain, transport });
}
