// CLIENT_SEND_MESSAGE
const formSendData=document.querySelector(".chat .inner-form")
if(formSendData){
    formSendData.addEventListener("submit",(e)=>{
        e.preventDefault();
        const content=e.target.elements.content.value
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE",content)
            e.target.elements.content.value=""
        }
    })
}

// END CLIENT_SEND_MESSAGE

// SEVER_RETURN_MESSAGE
socket.on("SEVER_RETURN_MESSAGE",(data)=>{
    const body=document.querySelector(".chat .inner-body")
    const div=document.createElement("div")
    const myId=document.querySelector("[my-id]").getAttribute("my-id")
    let fullName=""
    if(myId==data.userId){
        div.classList.add("inner-outgoing")
    }else{
        div.classList.add("inner-incoming")
        fullName=`<div class="inner-name">${data.fullName}</div>`
    }
    div.innerHTML=`
        ${fullName}
        <div class="inner-content">${data.content}</div>
    `
    body.appendChild(div)
    body.scrollTop = body.scrollHeight;

})
// END SEVER_RETURN_MESSAGE