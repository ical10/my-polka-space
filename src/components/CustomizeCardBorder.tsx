enum BorderOption {
  Blocky = "BLOCKY",
  Rounded = "ROUNDED",
}

type CustomizeCardBorderProps = {
  key: number;
  border: BorderOption;
  selected: boolean;
  onChange: () => void;
};

const CustomizeCardBorder = ({
  border,
  selected,
  onChange,
}: CustomizeCardBorderProps) => {
  const rootClasses = `${
    border === BorderOption.Rounded ? "rounded-xl" : "rounded-none"
  } card w-96 ${
    selected ? "border-4 border-accent" : ""
  } bg-base-100 shadow-xl`;

  return (
    <div className={rootClasses} onClick={onChange}>
      <button>
        <div className="card-body">
          <h2 className="card-title font-normal text-lg">{border} Card</h2>
        </div>
      </button>
    </div>
  );
};

export default CustomizeCardBorder;
