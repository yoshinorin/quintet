"use client";

import { KeyValueDropdownComponent } from "./dropdown";

type OrderSelectorProps = {
  currentOrder: string;
  basePath: String;
};

export function OrderSelector({ currentOrder, basePath }: OrderSelectorProps) {
  const options = [
    { value: "default", label: "並び順" },
    { value: "desc", label: "降順" },
    { value: "random", label: "ランダム" }
  ];

  const handleOrderChange = (value: string) => {
    if (value === "random") {
      window.location.href = `/${basePath}/?order=random`;
    } else if (value === "desc") {
      window.location.href = `/${basePath}/?order=desc`;
    } else {
      window.location.href = `/${basePath}/`;
    }
  };

  return (
    <KeyValueDropdownComponent
      options={options}
      defaultValue={currentOrder}
      onChange={handleOrderChange}
    />
  );
}
