//Esta función calcula el offset de nuestra query
export const calculateOffset = (pageSize:number, page:number)=>{
    return pageSize * (page-1)
}