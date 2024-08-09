import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

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

// Scroll Chat To Bottom
const bodyChat=document.querySelector(".chat .inner-body")
if(bodyChat){
    bodyChat.scrollTop=bodyChat.scrollHeight
}
// End Scroll Chat To Bottom

// emoji-picker
// Show popup
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip);
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
      }
}

// insert icon
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-foot .inner-form input[name='content']");
    emojiPicker.addEventListener("emoji-click", (event) => {
        const icon = event.detail.unicode;
        inputChat.value += icon;  // Sửa lỗi gán giá trị
    });
}

// end emoji-picker