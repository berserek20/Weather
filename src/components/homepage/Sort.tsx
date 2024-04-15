import React from "react";
import { CountryResponseResultType } from "./type";
function Sort({
  setColName,
  setOrder,
  colName,
  setLocationData,
}: {
  setColName:  React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  colName: string;
  setLocationData: React.Dispatch<
    React.SetStateAction<CountryResponseResultType[]>
  >;
}) {
  function ResponseSorting(order:string) {
    console.log(order, "order", colName);
    setColName(colName);
    setOrder(order);
    setLocationData([]);
  }

  return (
    <div>
      <button onClick={() => ResponseSorting("ASC")}>ASC</button>
      <button onClick={() => ResponseSorting("DESC ")}>DESC</button>
    </div>
  );
}

export default Sort;
