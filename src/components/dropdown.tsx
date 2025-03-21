"use client";

import React from "react";

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: Option[];
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const KeyValueDropdownComponent: React.FC<DropdownProps> = ({
  options,
  defaultValue,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      onChange(e.target.value);
    }
  };

  const current = defaultValue
    ? options.find((option) => option.value === defaultValue)?.label
    : "";

  return (
    <div>
      {/* defaultValue={current} doesn't work */}
      <select value={defaultValue} onChange={handleChange}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.label == current}>
            {option.label}
          </option>
        ))}
        ;
      </select>
    </div>
  );
};

export const DropdownComponent: React.FunctionComponent<{
  options: Array<string>;
  defaultValue: string | null;
  onChange: any;
}> = ({ options, defaultValue, onChange }) => {
  return (
    <select value={defaultValue} onChange={onChange}>
      {options.map((x) => (
        <option key={x} value={x}>
          {x}
        </option>
      ))}
    </select>
  );
};
