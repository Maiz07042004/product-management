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