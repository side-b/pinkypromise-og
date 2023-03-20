import type { Networks } from "./types";

import { isAddress, isNetworkName } from "./utils";

export const NETWORKS = parseNetworks(
  (process.env.NETWORKS ?? "").trim(),
);

function parseNetworks(value: string): Networks {
  return value.split(",").reduce<Networks>((networks, pair) => {
    const [network, contract] = pair.split(":");
    return isNetworkName(network) && isAddress(contract)
      ? ({ ...networks, [network]: { contract } })
      : networks;
  }, {});
}
