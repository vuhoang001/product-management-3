let cnt = 0;
function createTree(arr, parentID = "") {
    const tree = []
    arr.forEach((item) => {
        if (item.parent_id === parentID) {
            cnt++
            const newItem = item
            newItem.index = cnt
            const children = createTree(arr, item.id)
            if (children.length > 0) {
                newItem.children = children
            }
            tree.push(newItem)
        }
    });
    return tree
}

module.exports = (arr, parentID = "") => {
    return createTree(arr, parentID)
}