export type ColorEnumKey = 0 | 1 | 2 | 3;
export type ColorId = "pink" | "blue" | "red" | "black";

export type PromiseStateEnumKey = 0 | 1 | 2 | 3 | 4;
export type PromiseState =
  | "Draft"
  | "Signed"
  | "Nullified"
  | "Discarded"
  | "None";

export type EnsName = `${string}.eth`;
export type Address = `0x${string}`;

export type NetworkPrefix =
  | "A" // Arbitrum
  | "B" // Base
  | "E" // Ethereum
  | "G" // Goerli
  | "L" // Local
  | "O" // Optimism
  | "P"; // Polygon

export type NetworkName =
  | "arbitrum"
  | "base"
  | "mainnet"
  | "goerli"
  | "local"
  | "optimism"
  | "polygon";

export type Networks = {
  [k in NetworkName]?: { contract: Address };
};
