
// Filter button
const buttonStatus = document.querySelectorAll("[status-data]")
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href)
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            let url = new URL(window.location.href)
            const status = button.getAttribute("status-data")
            if (status != "") {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    }
    )
}
// End filter button

// Search form
const searchForm = document.getElementById("form-search")
if (searchForm) {
    let url = new URL(window.location.href)
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.target.elements.keyword.value != "") {
            url.searchParams.set("keyword", e.target.elements.keyword.value)
        } else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}
// End search form 

// Pagination
const paginationButtons = document.querySelectorAll("[button-pagination]")
if (paginationButtons.length > 0) {
    let url = new URL(window.location.href)
    paginationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let value = button.getAttribute("button-pagination")
            url.searchParams.set("page", value)
            window.location.href = url.href
        })
    })
}
// End pagination

//Change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status ]")
if (buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const formPath = formChangeStatus.getAttribute("data-path")
    buttonsChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status")
            const changeStatus = currentStatus == "active" ? "inactive" : "active"
            const idItem = button.getAttribute("data-id");
            const path = formPath + `/${changeStatus}/${idItem}?_method=PATCH`
            formChangeStatus.setAttribute("action", path)
            formChangeStatus.submit();
        })
    })
}
// End change status


//Checkbox Multi
const checkboxMulti = document.querySelector("[checkboxMulti]")
if (checkboxMulti) {
    const checkAll = checkboxMulti.querySelector("input[name='checkAll']")
    const checkButtons = checkboxMulti.querySelectorAll("input[name='id']")
    checkAll.addEventListener("click", () => {
        if (checkAll.checked) {
            checkButtons.forEach(button => {
                button.checked = true
            })
        } else {
            checkButtons.forEach(button => {
                button.checked = false
            })
        }
    })


    checkButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonsCheked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
            if (buttonsCheked == checkButtons.length) {
                checkAll.checked = true
            } else {
                checkAll.checked = false
            }
        })
    })
}
// End Checkbox Multi

// Form change multi 
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")

        const typeChange = e.target.elements.type.value
        if (typeChange == "delete-all") {
            const iConfirm = confirm("aur")
            if (!iConfirm) {
                return;
            }
        }

        if (inputChecked.length > 0) {
            let ids = []
            const inputIDS = formChangeMulti.querySelector("input[name='ids']")
            inputChecked.forEach(item => {
                const value = item.value
                if (typeChange == "change-position") {
                    const position = item.closest("tr").querySelector("input[name='position']").value
                    const res = value + "-" + position
                    ids.push(res)
                } else {
                    ids.push(item.value)
                }
            })

            inputIDS.value = ids.join(', ')
            formChangeMulti.submit()

        } else {
            alert("Insert value!")
        }
    })
}
// End form change multi

const formDelete = document.querySelector("#form-delete-button")
const buttonDelete = document.querySelectorAll("[delete-button]")
const path = formDelete.getAttribute("data-path")

if (formDelete) {
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            if (confirm("aur?") == true) {
                const id = button.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                formDelete.setAttribute("action", action)
                formDelete.submit()
            }
        })
    })
}