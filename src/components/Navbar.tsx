import Identicon from "@polkadot/react-identicon";
import SelectTheme from "src/components/SelectTheme";
import Link from "next/link";

import { trimMiddleString } from "src/helpers/strings";
import { useWalletStore } from "src/store";

type NavbarProps = {
  onOpenSelectAccount: () => void;
};

const Navbar = ({ onOpenSelectAccount }: NavbarProps) => {
  const { setAccount, setAccounts, account, accounts } = useWalletStore(
    (state) => ({
      account: state.account,
      setAccount: state.setAccount,
      accounts: state.accounts,
      setAccounts: state.setAccounts,
    })
  );

  const handleOpenSelectAccount = () => {
    onOpenSelectAccount();
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-slate-100/20 backdrop-filter backdrop-blur-xl gap-2">
      <div className="flex-1">
        <a className="btn btn-ghost text-primary normal-case text-xl drop-shadow-lg">
          My Polka Space
        </a>
      </div>
      <div className="flex-2">
        <SelectTheme />
      </div>
      <div className="flex-none">
        {!account && (
          <button className="btn btn-outline" onClick={handleOpenSelectAccount}>
            Connect wallet
          </button>
        )}
        {account && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-outline btn-accent flex gap-2"
            >
              <div>{trimMiddleString(account?.address)}</div>
              <Identicon
                value={account?.address}
                size={32}
                theme={"polkadot"}
              />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/spaces" className="justify-between">
                  My Spaces
                </Link>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
