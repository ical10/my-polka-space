enum PaddingOption {
  With = "WITH",
  Without = "WITHOUT",
}

type CustomizeCardImagePaddingProps = {
  key: number;
  padding: PaddingOption;
  selected: boolean;
  onChange: () => void;
};

const CustomizeCardImagePadding = ({
  padding,
  selected,
  onChange,
}: CustomizeCardImagePaddingProps) => {
  const rootClasses = `rounded card w-96 ${
    selected ? "border-4 border-accent" : ""
  } bg-base-100 shadow-xl`;

  const paddingClasses = `${
    padding === PaddingOption.With ? "px-10 py-10" : ""
  }`;

  return (
    <div className={rootClasses} onClick={onChange}>
      <figure className={paddingClasses}>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <button>
        <div className="card-body">
          <h2 className="card-title">{padding} Image Card</h2>
        </div>
      </button>
    </div>
  );
};

export default CustomizeCardImagePadding;
