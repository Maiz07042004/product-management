const buttons = document.querySelectorAll("[button_status]");

if (buttons.length > 0) {
    buttons.forEach(item => {
        item.addEventListener('click', () => {
            const status = item.getAttribute("button_status");
            // console.log(status);

            // Lấy URL hiện tại mỗi khi click
            let url = new URL(window.location.href);

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            // Chuyển hướng đến URL mới
            window.location.href = url.href;
        });
    });
}


const formSearch=document.querySelector("#form-search")
if(formSearch){
    let url=new URL(window.location.href)
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword=e.target.elements.keyword.value;
        console.log(keyword)
        if(keyword)
            url.searchParams.set("keyword",keyword)
        else
            url.searchParams.delete("keyword")
        window.location.href=url.href
    }
    )
}

// pagination
const buttonPagination=document.querySelectorAll("[button-pagination]")

if(buttonPagination)
    buttonPagination.forEach(button=>{
        let url=new URL(window.location.href)
        button.addEventListener("click",()=>{
            const page=button.getAttribute("button-pagination")
            url.searchParams.set("page",page)
            window.location.href=url.href
        }
        )
    })
// end pagination

// Checkbox-Multi
const checkboxMulti=document.querySelector("[checkbox-multi]")

if(checkboxMulti){
    const inputCheckAll=checkboxMulti.querySelector("input[name='checkall']")
    const inputsId=checkboxMulti.querySelectorAll("input[name='id']")
    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked){
            inputsId.forEach(input=>{
                input.checked=true
            })
        }
        else{
            inputsId.forEach(input=>{
                input.checked=false
            })
        }
    })
    
    inputsId.forEach(input=>{
        input.addEventListener("click",()=>{
            const countChecked=checkboxMulti.querySelectorAll("input[name='id']:checked").length
            if(countChecked == inputsId.length){
                inputCheckAll.checked=true;
            }
            else{
                inputCheckAll.checked=false
            }
        })

    })
}
// End Checkbox-Multi


// Form Change-Multi
const formChangeMulti=document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault()

        const checkboxMulti=document.querySelector("[checkbox-multi]")
        const inputChecked=checkboxMulti.querySelectorAll("input[name='id']:checked")

        const typeChange=e.target.elements.type.value;
        if(typeChange=="delete-all"){
            const isConfirm=confirm("Bạn có chắc chắn muốn xoá những sản phẩm này không")
            if(!isConfirm){
                return;
            }
        }
        if(inputChecked.length>0){
            let ids=[]
            const inputIds=formChangeMulti.querySelector("input[name='ids']")
            inputChecked.forEach(input=>{
                const id=input.value
                if(typeChange =="change-position"){
                    const position=input.closest("tr").querySelector("input[name='position']").value;
                    console.log(position)
                    ids.push(`${id}-${position}`)
                } else{
                    ids.push(id)
                }

            })
            inputIds.value = ids.join(", "); 
            formChangeMulti.submit();

        }else{
            alert("Vui lòng chọn ít nhất 1 bản ghi")
        }}
        
    )
}
// End Form-Change-Multi


// Show Alert
const showAlert=document.querySelector("[show-alert]");
if(showAlert){
    const time=parseInt(showAlert.getAttribute("data-time"));
    const closeAlert=showAlert.querySelector("[close-alert]")
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time)

    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    })
}
// End Show Alert

// Upload image
const uploadImage=document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput=document.querySelector("[upload-image-input]");
    const uploadImagePreview=document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change",(e)=>{
        const file=e.target.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file)
        }
    })
}
// End Upload image