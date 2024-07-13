// Change-status
const buttonChangeStatus=document.querySelectorAll("[button-change-status]")

if(buttonChangeStatus.length>0){
    const formChangeStatus=document.querySelector("#form-change-status")
    const path=formChangeStatus.getAttribute("path")
    buttonChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const statusCurrent=button.getAttribute("data-status");
            const id=button.getAttribute("data-id");
            const changeStatus=(statusCurrent=="active"?"inactive":"active")
            const action=path+`/${changeStatus}/${id}?_method=PATCH`
            formChangeStatus.action=action;

            formChangeStatus.submit();
        })
    })
}
// End change-status

// Delete Item
const buttonDelete=document.querySelectorAll("[button-delete]");
if(buttonDelete.length>0){
    const formDeleteItem=document.querySelector("#form-delete-item")
    const path=formDeleteItem.getAttribute("path");
    buttonDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const isConfirm=confirm("Bạn chắc chắn có muốn xoá không")
            if(isConfirm){
                const id =button.getAttribute("data-id")
                const action=`${path}/${id}?_method=DELETE`;
                formDeleteItem.action=action;
                formDeleteItem.submit()
            }
        })
    })
}
//End delete Item