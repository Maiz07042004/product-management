module.exports=(objectPagination,query,countProducts)=>{
    if(query.page){
        objectPagination.currenPage=parseInt(query.page)
    }
    objectPagination.skip=(objectPagination.currenPage-1)*4
    objectPagination.totalPage=Math.ceil(countProducts/objectPagination.limitItem)
    return objectPagination

}