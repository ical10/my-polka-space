enum ImagePlacementOption {
  Top = "TOP",
  Side = "SIDE",
}

type CustomizeCardImagePlacementProps = {
  key: number;
  imagePlacement: ImagePlacementOption;
  selected: boolean;
  onChange: () => void;
};

const CustomizeCardImagePlacement = ({
  imagePlacement,
  selected,
  onChange,
}: CustomizeCardImagePlacementProps) => {
  const rootClasses = `${
    imagePlacement === ImagePlacementOption.Top ? "card" : "card card-side"
  } rounded card w-96 ${
    selected ? "border-4 border-accent" : ""
  } bg-base-100 shadow-xl`;

  return (
    <div className={rootClasses} onClick={onChange}>
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <button>
        <div className="card-body">
          <h2 className="card-title">{imagePlacement} Image Card</h2>
        </div>
      </button>
    </div>
  );
};

export default CustomizeCardImagePlacement;
