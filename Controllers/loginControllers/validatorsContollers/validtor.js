exports.vlaidateInputFun = (Id, Password) => {
    let flage = false;
    let idLength = Id.toString().length;
    let PasswordLength = Password.toString().length;
    if(idLength === 10){
        if(PasswordLength > 15 || PasswordLength < 30){
            flage = true
        }
    }
    return flage;
}