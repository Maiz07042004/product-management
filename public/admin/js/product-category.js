// Change-Status
const buttonChangeStatus=document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length>0){
    const formChangeStatus=document.querySelector("#form-change-status")
    const path=formChangeStatus.getAttribute("path")
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click",()=>{
            const statusCurrent=button.getAttribute("data-status");
            const id=button.getAttribute("data-id")
            const status = (statusCurrent=="active"?"inactive":"active");
            formChangeStatus.action=`${path}/${status}/${id}?_method=PATCH`
            formChangeStatus.submit();
        })
    });
}
// End Change-Status

// Delete Item 
const buttonDelete=document.querySelectorAll("[button-delete]")
if(buttonDelete.length>0){
    const formDeleteItem=document.querySelector("#form-delete-item")
    buttonDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const isConfirm=confirm("Bạn chắc chắn có muốn xoá không")
            if(isConfirm){
                const id=button.getAttribute("data-id")
                const path=formDeleteItem.getAttribute("path")
                formDeleteItem.action=`${path}/${id}?_method=DELETE`
                formDeleteItem.submit();
            }
        })
    })
}
// End Delete Item