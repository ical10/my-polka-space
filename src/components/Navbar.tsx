import { useState } from "react";
import SelectTheme from "src/components/SelectTheme";
import Link from "next/link";

import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { trimMiddleString } from "src/helpers/strings";

const Navbar = () => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[] | null>(
    null
  );
  const [selectedAccount, setSelectedAccount] =
    useState<InjectedAccountWithMeta | null>(null);

  const getAccounts = async () => {
    const extensions = await web3Enable("My Web3 Space Dapp");
    if (extensions.length === 0) {
      return;
    }
    const allAccounts = await web3Accounts();
    setAccounts(allAccounts);
    setSelectedAccount(allAccounts[0]);
    //setAccount(allAccounts[0]);
  };

  const handleConnect = () => {
    getAccounts();
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-slate-100/20 backdrop-filter backdrop-blur-xl">
      <div className="flex-1">
        <a className="btn btn-ghost text-primary normal-case text-xl drop-shadow-lg">
          My Web3 Space
        </a>
      </div>
      <div className="flex-2">
        <SelectTheme />
      </div>
      <div>
        {accounts && accounts.length ? (
          <div className="dropdown dropdown-bottom">
            <label
              tabIndex={0}
              className="btn btn-outline btn-secondary m-1 normal-case"
            >
              {trimMiddleString(selectedAccount?.address)}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {accounts.map((account) => (
                <li key={account.address}>
                  <button
                    className="btn btn-ghost normal-case"
                    onClick={() => setSelectedAccount(account)}
                  >
                    {trimMiddleString(account.address)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <button className="btn btn-outline" onClick={handleConnect}>
            Connect wallet
          </button>
        )}
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
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
      </div>
    </div>
  );
};

export default Navbar;
