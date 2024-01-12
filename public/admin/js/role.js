// Permission
const tablePermission = document.querySelector('[table-permissions]')
if (tablePermission) {
    const buttonSubmit = document.querySelector('[button-submit]')
    buttonSubmit.addEventListener('click', () => {
        let permissions = []

        const rows = tablePermission.querySelectorAll('[data-name]')
        rows.forEach(row => {
            const name = row.getAttribute('data-name')
            const inputs = row.querySelectorAll('input')
            if (name == 'id') {
                inputs.forEach(input => {
                    const value = input.value
                    permissions.push({
                        id: value,
                        permissions: []
                    })
                })
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked
                    if (checked) {
                        permissions[index].permissions.push(name)
                    }
                })
            }
        })
        const formChangePermission = document.querySelector('#form-change-permissions')
        const inputChangePermission = formChangePermission.querySelector('input')
        inputChangePermission.value = JSON.stringify(permissions)
        formChangePermission.submit()
    })
}
// End permission


// Permissions data default
const dataRecords = document.querySelector('[data-record]')
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-record"))
    const tablePermission = document.querySelector('[table-permissions]')
    records.forEach((record, index) => {
        const permissions = record.permissions

        permissions.forEach(permissions => {
            const row = tablePermission.querySelector(`tr[data-name="${permissions}"]`)
            const input = row.querySelectorAll('input')[index]
            input.checked = true
        })
    })
}
// End permissions data default 