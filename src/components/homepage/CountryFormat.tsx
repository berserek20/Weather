import { useNavigate } from "react-router-dom";

function CountryFormat({country,city,timezone,lon,lat}:{country:string,city:string,timezone:string,lon:number,lat:number}) {
  const navigate = useNavigate();
  return (
      
        <tr>
          <td>{country}</td>
          <td className="hover:text-cyan-500 cursor-pointer hover:text-lg" onClick={()=>navigate('/weather/'+lon+'/'+lat)}>{city}</td>
          <td>{timezone}</td>
        </tr>
  );
}

export default CountryFormat;
