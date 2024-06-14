export const DropdownComponent: React.FunctionComponent<{
  list: Array<string>;
  defaultValue: string | null;
  onChange: any;
}> = ({ list, defaultValue, onChange }) => {
  return (
    <select value={defaultValue} onChange={onChange}>
      {list.map((x) => (
        <option key={x} value={x}>
          {x}
        </option>
      ))}
    </select>
  );
};
