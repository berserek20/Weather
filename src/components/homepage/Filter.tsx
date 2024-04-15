function Filter() {
    function setFilterType(e){
        try{

            console.log(e.target.value);
        }
        catch(e){
            console.log("error",e)
        }
    }
   
  return (
    <div>
            <label htmlFor='selectedSort'>Sort: </label>
            <select  id='selectedSort' onChange={(e)=>{setFilterType(e)}} style={{border:"2px solid black"}}>
                <option  value="">-- Select --</option>
                <option  value="name">city</option>
                <option value="cou_name_en">country</option>
                <option value="timezone">timezone</option>

            </select>
        
    </div>
  )
}

export default Filter