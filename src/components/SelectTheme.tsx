import Emoji from "src/components/Emoji";

const SelectTheme = () => {
  return (
    <select className="select select-secondary" data-choose-theme>
      <option disabled selected>
        Pick your theme
      </option>
      <option value="dark">
        <Emoji symbol="🌑" /> Dark
      </option>
      <option value="light">
        <Emoji symbol="☀️" /> Light
      </option>
    </select>
  );
};

export default SelectTheme;
