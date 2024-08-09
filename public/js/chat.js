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
            socket.emit("CLIENT_SEND_TYPING","hiden")
        }
    })
}

// END CLIENT_SEND_MESSAGE

// SEVER_RETURN_MESSAGE
socket.on("SEVER_RETURN_MESSAGE",(data)=>{
    const elementListTyping=document.querySelector(".inner-list-typing")
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
    body.insertBefore(div,elementListTyping)
    body.scrollTop = body.scrollHeight;

})
// END SEVER_RETURN_MESSAGE

// Scroll Chat To Bottom
const bodyChat=document.querySelector(".chat .inner-body")
if(bodyChat){
    bodyChat.scrollTop=bodyChat.scrollHeight
}
// End Scroll Chat To Bottom

// Show Typing
var TimeOut
const showTyping=()=>{
    socket.emit("CLIENT_SEND_TYPING","show")
    clearTimeout(TimeOut)
    TimeOut=setTimeout(()=>{
        socket.emit("CLIENT_SEND_TYPING","hiden")
    },3000)
}
// End Show Typing


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

        const end=inputChat.value.length
        inputChat.setSelectionRange(end, end)
        inputChat.focus();

        showTyping()
    });
    var TimeOut
    inputChat.addEventListener("keyup",()=>{
        showTyping()
    })
}

// end emoji-picker

// SERVER_RETURN_TYPING
const elementListTyping=document.querySelector(".inner-list-typing")
if(elementListTyping){
    socket.on("SERVER_RETURN_TYPING",(data)=>{
        if(data.type=="show"){
            const bodyChat=document.querySelector(".chat .inner-body")
            const existTyping=document.querySelector(`[user-id="${data.userId}"]`)
            if(!existTyping){
                const boxTyping=document.createElement("div")
                boxTyping.classList.add("box-typing")
                boxTyping.setAttribute("user-id",data.userId)
                boxTyping.innerHTML=`
                    <div class="inner-name"> ${data.fullName} </div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `
                elementListTyping.appendChild(boxTyping)
                bodyChat.scrollTop=bodyChat.scrollHeight
            }
        }else{
            const existTyping=document.querySelector(`[user-id="${data.userId}"]`)
            if(existTyping){
                elementListTyping.removeChild(existTyping)
            }
        }       
    })
}
// END SERVER_RETURN_TYING