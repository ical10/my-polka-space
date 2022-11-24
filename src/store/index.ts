import create from "zustand";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface WalletState {
  account: InjectedAccountWithMeta | null;
  setAccount: (newAccount: InjectedAccountWithMeta) => void;
  accounts: InjectedAccountWithMeta[] | null;
  setAccounts: (newAccounts: InjectedAccountWithMeta[]) => void;
}

interface CardStyleState {
  borderStyle: string | null;
  setBorderStyle: (newBorderStyle: string) => void;
  placementStyle: string | null;
  setPlacementStyle: (newPlacementStyle: string) => void;
  paddingStyle: string | null;
  setPaddingStyle: (newPaddingStyle: string) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  account: null,
  setAccount: (newAccount) => set(() => ({ account: newAccount })),
  accounts: null,
  setAccounts: (newAccounts) => set(() => ({ accounts: [...newAccounts] })),
}));

export const useCardStyleStore = create<CardStyleState>()((set) => ({
  borderStyle: null,
  setBorderStyle: (newBorderStyle) =>
    set(() => ({ borderStyle: newBorderStyle })),
  placementStyle: null,
  setPlacementStyle: (newPlacementStyle) =>
    set(() => ({ placementStyle: newPlacementStyle })),
  paddingStyle: null,
  setPaddingStyle: (newPaddingStyle) =>
    set(() => ({ paddingStyle: newPaddingStyle })),
}));
