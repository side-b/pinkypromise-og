import { createPublicClient, http } from "viem";
import { arbitrum, goerli, mainnet, optimism, polygon } from "viem/chains";

const chains = {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
};

export function getClient(chain: keyof typeof chains) {
  return createPublicClient({
    chain: chains[chain],
    transport: http(),
  });
}
