import Head from "next/head";
import { useState } from "react";
import Layout from "src/components/Layout";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import CustomizeCardBorder from "src/components/CustomizeCardBorder";
import CustomizeCardImagePlacement from "src/components/CustomizeCardImagePlacement";
import CustomizeCardImagePadding from "src/components/CustomizeCardImagePadding";
import Emoji from "src/components/Emoji";
import { useCardStyleStore } from "src/store";

enum BorderOption {
  Blocky = "BLOCKY",
  Rounded = "ROUNDED",
}

enum ImagePlacementOption {
  Top = "TOP",
  Side = "SIDE",
}

enum PaddingOption {
  With = "WITH",
  Without = "WITHOUT",
}

const Customize = () => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  const {
    borderStyle,
    setBorderStyle,
    placementStyle,
    setPlacementStyle,
    paddingStyle,
    setPaddingStyle,
  } = useCardStyleStore((state) => ({
    borderStyle: state.borderStyle,
    setBorderStyle: state.setBorderStyle,
    placementStyle: state.placementStyle,
    setPlacementStyle: state.setPlacementStyle,
    paddingStyle: state.paddingStyle,
    setPaddingStyle: state.setPaddingStyle,
  }));

  const [borderSelected, setBorderSelected] = useState<number | null>(null);
  const borderOptions = [
    { id: 1, border: BorderOption.Rounded },
    { id: 2, border: BorderOption.Blocky },
  ];

  const [placementSelected, setPlacementSelected] = useState<number | null>(
    null
  );
  const placementOptions = [
    { id: 1, imagePlacement: ImagePlacementOption.Top },
    { id: 2, imagePlacement: ImagePlacementOption.Side },
  ];

  const [paddingSelected, setPaddingSelected] = useState<number | null>(null);
  const paddingOptions = [
    { id: 1, padding: PaddingOption.Without },
    { id: 2, padding: PaddingOption.With },
  ];

  const [editSuccess, setEditSuccess] = useState(false);

  const handleReset = () => {
    setBorderSelected(null);
    setPlacementSelected(null);
    setPaddingSelected(null);
  };

  const checkIsSelectionValid = () => {
    if (!borderSelected || !paddingSelected || !placementSelected) {
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    const newBorderStyle = borderSelected === 1 ? "rounded-xl" : "rounded-none";
    const newPlacementStyle =
      placementSelected === 1 ? "card" : "card card-side";
    const newPaddingStyle = paddingSelected === 1 ? "" : "px-10 py-10";

    setBorderStyle(newBorderStyle);
    setPlacementStyle(newPlacementStyle);
    setPaddingStyle(newPaddingStyle);

    setEditSuccess(true);

    setTimeout(() => {
      setEditSuccess(false);
    }, 2500);
  };

  return (
    <div>
      <Head>
        <title>My Web3 Space - Customize</title>
        <meta name="description" content="My space in web3 - Customize Menu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-8">
            <div className="text-lg font-semibold">Border</div>
            {borderOptions.map((borderOption) => (
              <CustomizeCardBorder
                key={borderOption.id}
                border={borderOption.border}
                selected={borderSelected === borderOption.id}
                onChange={() => setBorderSelected(borderOption.id)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-lg font-semibold">Image Position</div>
            {placementOptions.map((placementOption) => (
              <CustomizeCardImagePlacement
                key={placementOption.id}
                imagePlacement={placementOption.imagePlacement}
                selected={placementSelected === placementOption.id}
                onChange={() => setPlacementSelected(placementOption.id)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-lg font-semibold">Image Padding</div>
            {paddingOptions.map((paddingOption) => (
              <CustomizeCardImagePadding
                key={paddingOption.id}
                padding={paddingOption.padding}
                selected={paddingSelected === paddingOption.id}
                onChange={() => setPaddingSelected(paddingOption.id)}
              />
            ))}
          </div>
          <div className="flex flex-row gap-2 m-8">
            <div className="flex flex-col justify-center gap-2">
              <div className="flex gap-2 font-normal">
                <Emoji symbol="ℹ️" />
                Select your own card style and confirm
              </div>
              <button
                className="btn btn-outline btn-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="btn btn-primary"
                disabled={!checkIsSelectionValid()}
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        {editSuccess ? (
          <div className="toast toast-center w-96">
            <div className="alert alert-success min-w-max justify-center">
              <div>
                <span className="font-medium text-bg-base-100">
                  Edit success
                </span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Layout>
    </div>
  );
};

export default Customize;
