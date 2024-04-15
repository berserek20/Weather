import { useEffect, useState } from "react";
import { CountryResponseResultType, CountryResponseType } from "./type";
import CountryFormat from "./CountryFormat";
import Search from "./Search";
import Sort from "./Sort";

function Homepage() {
  const [locationData, setLocationData] = useState<CountryResponseResultType[]>(
    []
  );
  const [offset, setOffset] = useState(0);

  const [scrollReachedToEndOfList, setScrollReachedToEndOfList] = useState(false);
  const [order,setOrder]=useState('ASC')
  const [colName,setColName]=useState('cou_name_en')


  console.log(scrollY, "scrollY");
  console.log(locationData);

  async function ApiCall() {
    
    const link=`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=${colName}%20${order}&limit=20&offset=${offset}`

    try {
      const countryData = await fetch(link);
      const response: CountryResponseType = await countryData.json();

      if (response) {
        setLocationData((prev) => [...prev, ...response.results]);
        
        setOffset((prev) => prev + 10);

      } else {
        console.log("couldn't find Data");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(order,colName,"api called")
    ApiCall();
    
    window.addEventListener("scroll", () => {
      var body = document.body,
        html = document.documentElement;

      var height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      console.log(window.scrollY + html.clientHeight + 1, "e", height);
      if (window.scrollY + html.clientHeight + 1 > height) {
        setScrollReachedToEndOfList(true);
      }
    });
  },[order,colName]);
 

  useEffect(() => {
    if (scrollReachedToEndOfList) {

      setScrollReachedToEndOfList(false);
      ApiCall();
    }
  }, [scrollReachedToEndOfList]); //boolean
  return (
    <div className="flex flex-col justify-center">
      Homepage
      <div>
        <Search setLocationData={setLocationData} />
      </div>
      <b className=" text-3xl">CountryFormat</b>
      <div className=" text-2xl md:text-xl">
        <table className=" size-full overflow-y-auto">
          <thead className=" bg-purple-600 sticky top-0">
            <tr>
              <th className=" sticky top-0"><Sort colName={"cou_name_en"} setOrder={setOrder} setColName={setColName} setLocationData={setLocationData} />Country</th>
              <th className=" sticky top-0"><Sort colName={"name"} setOrder={setOrder} setColName={setColName} setLocationData={setLocationData} />City</th>
              <th className=" sticky top-0"><Sort colName={"timezone"} setOrder={setOrder} setColName={setColName} setLocationData={setLocationData} />Timezone</th>
            </tr>
          </thead>
          <tbody>
            {locationData?.map((value) => (
              <CountryFormat
                key={value.geoname_id}
                country={value.cou_name_en}
                timezone={value.timezone}
                city={value.name}
                lon={value.coordinates?.lat}
                lat={value.coordinates?.lat}
              />
            )) ?? null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Homepage;
