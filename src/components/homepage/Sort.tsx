
function Sort({setColName,setOrder,colName,setLocationData}) {
        
    function ResponseSorting(order){
        console.log(order,"order",colName);
        setColName(colName);
        setOrder(order);
        setLocationData([])
    }
    
  return (
    <div>
        <button onClick={()=>ResponseSorting("ASC")}>ASC</button>
        <button onClick={()=>ResponseSorting("DESC ")}>DESC</button>

           
        
    </div>
  )
}

export default Sort