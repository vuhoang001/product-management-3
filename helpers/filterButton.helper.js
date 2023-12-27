module.exports = (query) => {
    const filterButton = [
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "Active", 
            status: "active", 
            class: ""
        }, 
        {
            name: "Inactive", 
            status: "inactive", 
            class: ""
        }
    ]

    if(query.status){
        const index = filterButton.findIndex((item) => {
            return item.status == query.status
        })
        filterButton[index].class = "active"
    } else {
        const index = filterButton.findIndex((item) => {
            return item.status == ""
        })
        filterButton[index].class = "active"
    }
    return filterButton;
}