import { useEffect, useState } from "react";
import {  CountryResponseResultType, CountryResponseType } from "./type";

function Search({setLocationData}) {
  const [inputCity, setInputCity] = useState("");
  const [filterData, setFilterData] = useState<CountryResponseResultType[]>([]);
  console.log(filterData,"city");

  async function ApiCall() {
    // console.log(inputCity, "a");
    const link = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search('${inputCity}')&limit=98`;
    try {
      const countryData = await fetch(link);
      const response: CountryResponseType = await countryData.json();

      if (response) {
        setFilterData(response.results);
      } else {
        console.log("couldn't find Data");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    ApiCall();
  }, [inputCity]);

  function enterValue(val) {
    setInputCity(val.target.value);
    console.log(inputCity,"a");
  }

  return (

    <div className=" flex flex-col col-span-3">
      <div>

      <input
        type="text"
        placeholder="place name"
        onChange={(val) => enterValue(val)}
        style={{ border: "2px solid black" }}
        value={inputCity}
      />
            <button className=" bg-purple-400 text-white hover:bg-purple-600" onClick={()=>{setLocationData([]);console.log("hello");setLocationData(filterData)}}>Filter</button>

      </div>
      <select
        className=" overflow-hidden z-10"
        size={5}
        id="autocpmplete"
        onChange={(val) => {
          setInputCity(val.target.value);
          

        }}
      >
        {filterData?.map((obj) => (
          <>
          <option className=" cursor-pointer" value={obj.name}>{obj.name}</option>
          <option className=" cursor-pointer" value={obj.cou_name_en}>{obj.cou_name_en}</option>
          <option className=" cursor-pointer" value={obj.timezone}>{obj.timezone}</option>
          </>

        ))}
      </select>
    </div>

  );
}

export default Search;
