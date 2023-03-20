import type {
  Address,
  ColorEnumKey,
  ColorId,
  NetworkName,
  NetworkPrefix,
  PromiseState,
  PromiseStateEnumKey,
} from "./types";

import { APP_CHAINS, COLORS } from "./constants";

export function createIsEnumKeyFn<EnumKey extends number>(max: number) {
  return (value: number): value is EnumKey => (value >= 0 && value <= max);
}

export const isColorEnumKey = createIsEnumKeyFn<ColorEnumKey>(3);
export const isPromiseStateEnumKey = createIsEnumKeyFn<PromiseStateEnumKey>(4);

export function promiseStateFromEnumKey(
  state: PromiseStateEnumKey,
): PromiseState {
  if (state === 1) { return "Draft"; }
  if (state === 2) { return "Signed"; }
  if (state === 3) { return "Nullified"; }
  if (state === 4) { return "Discarded"; }
  return "None";
}

export function enumKeyToColor(key: ColorEnumKey) {
  switch (key) {
    case 1:
      return "blue";
    case 2:
      return "red";
    case 3:
      return "black";
  }
  return "pink";
}

export function promiseColors(color: ColorId) {
  switch (color) {
    case "blue":
      return { color: COLORS.blue, contentColor: COLORS.white };
    case "red":
      return { color: COLORS.grey, contentColor: COLORS.red };
    case "black":
      return { color: COLORS.grey, contentColor: COLORS.black };
  }
  return { color: COLORS.pink, contentColor: COLORS.white };
}

export function formatPromiseState(state: PromiseState) {
  if (state === "Signed") { return "Signed"; }
  if (state === "Draft") { return "Draft"; }
  return "Broken";
}

export function isNetworkPrefix(prefix: string): prefix is NetworkPrefix {
  return ["A", "B", "E", "G", "L", "O", "P"].indexOf(prefix) !== -1;
}

export function isNetworkName(value: string): value is NetworkName {
  return value === "mainnet"
    || value === "polygon"
    || value === "goerli"
    || value === "local";
}

export const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;
export function isAddress(address: string): address is Address {
  return ADDRESS_RE.test(address);
}

export function formatDate(value: Date = new Date()) {
  return [
    String(value.getDay() + 1).padStart(2, "0"),
    String(value.getMonth() + 1).padStart(2, "0"),
    value.getFullYear(),
  ].join(".");
}

export function parseFullPromiseId(
  fullPromiseId: string,
): undefined | [prefix: NetworkPrefix, id: number] {
  let parts = fullPromiseId.split("-");
  const id = parseInt(parts[1], 10);
  return (isNetworkPrefix(parts[0]) && !isNaN(id))
    ? [parts[0], id]
    : undefined;
}

export function appChainFromPrefix(prefix: NetworkPrefix) {
  return APP_CHAINS.find((chain) => chain.prefix === prefix);
}
