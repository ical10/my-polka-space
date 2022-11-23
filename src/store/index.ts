import create from "zustand";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface WalletState {
  account: InjectedAccountWithMeta | null;
  setAccount: (newAccount: InjectedAccountWithMeta) => void;
  accounts: InjectedAccountWithMeta[] | null;
  setAccounts: (newAccounts: InjectedAccountWithMeta[]) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  account: null,
  setAccount: (newAccount) => set(() => ({ account: newAccount })),
  accounts: null,
  setAccounts: (newAccounts) => set(() => ({ accounts: [...newAccounts] })),
}));
