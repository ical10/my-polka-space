const SelectTheme = () => {
  return (
    <select
      className="select select-secondary w-full max-w-xs"
      data-choose-theme
    >
      <option disabled selected>
        Pick your theme
      </option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
};

export default SelectTheme;
