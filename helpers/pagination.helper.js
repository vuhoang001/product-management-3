module.exports = (paginationInit, query, totalItems) => {
    
    if(query.page){
        paginationInit.currentPage = parseInt(query.page)
    }

    paginationInit.skip = (paginationInit.currentPage - 1) * paginationInit.limitItems
    paginationInit.totalPages = Math.ceil(totalItems / paginationInit.limitItems)

    return paginationInit

}