module.exports.generateRandomString=(length)=>{
    const characters=
        "ABCDEFGHIJKLMNOPQRSTUYWXYZabcdefghijklmnopqrstuywxyz"
    let result="";
    for (let i=1;i<length;i++){
        result+= characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result;
}

module.exports.generateRandomNumber=(length)=>{
    const characters="0123456789"
    let result="";
    for (let i=1;i<=length;i++){
        result+= characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result;
}