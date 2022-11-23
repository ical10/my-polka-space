import { useEffect, useState } from "react";
import { trimMiddleString } from "src/helpers/strings";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { useWalletStore } from "src/store";

type SelectAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SelectAccountModal = ({ onClose, isOpen }: SelectAccountModalProps) => {
  const { setAccount, setAccounts, account, accounts } = useWalletStore(
    (state) => ({
      account: state.account,
      setAccount: state.setAccount,
      accounts: state.accounts,
      setAccounts: state.setAccounts,
    })
  );

  useEffect(() => {
    getAccounts();
  }, []);

  const [selectedAccount, setSelectedAccount] =
    useState<InjectedAccountWithMeta | null>(null);

  const [readyAccounts, setReadyAccounts] = useState<
    InjectedAccountWithMeta[] | null
  >(null);

  const getAccounts = async () => {
    const extensions = await web3Enable("My Web3 Space Dapp");
    if (extensions.length === 0) {
      return;
    }
    const allAccounts = await web3Accounts();
    setAccounts(allAccounts);
    setReadyAccounts(allAccounts);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSelect = (selectedAccount: InjectedAccountWithMeta) => {
    setSelectedAccount(selectedAccount);
  };

  const handleConfirm = () => {
    if (selectedAccount) {
      setAccount(selectedAccount);
      handleClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </label>
        <h3 className="font-bold text-lg">Select your accounts</h3>
        {!readyAccounts && <div>Please install Polkadot.js</div>}

        {readyAccounts && (
          <ul className="menu bg-base-100 p-2 rounded-box">
            {readyAccounts.map((readyAccount) => (
              <li key={readyAccount.address}>
                <div onClick={() => handleSelect(readyAccount)}>
                  {readyAccount.meta.name}{" "}
                  {trimMiddleString(readyAccount.address)}
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="modal-action">
          <button className="btn btn-outline btn-secondary">Cancel</button>
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={!selectedAccount}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectAccountModal;
