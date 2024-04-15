
function ResponseSorting(response,type:string) {
    type=type.toLowerCase()
    if(type=='a2z'){

        response.sort((a,b)=>a.cou_name_en-b.cou_name_en)
    }
    else if('z2a'){
        response.sort((a,b)=>b.cou_name_en-a.cou_name_en)

    }
    return response;
}

export default ResponseSorting