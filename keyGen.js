
export {createKey}


function createAlphabet(){
    const letters = [...`abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#%&?*()-+="'/~<>.,`]
    let alphabet = {};
    letters.map((e,i)=>{alphabet[e] = (i+1) * 2 });
    return alphabet;
}

function abs(num){
    if(num > 0) return num
    else return num - num * 2
}

const alphabet = createAlphabet()

function createKey(email, password){
    email = email.split('@')[0]
    email = [...email].map((el) => (alphabet[el] < 10) ? alphabet[el] * 10: alphabet[el])
    password = [...password].map((el) => (alphabet[el] < 10) ? alphabet[el] * 10: alphabet[el])
    let emailPassword = email.concat(password).map((el) => {
        el = String(el);
        let answer = String(Number(el[0]) + Number(el[1]))
        answer = (answer >= 10) ? answer[1] : answer[0]; 
        return Number(answer) }).join('')
    if(emailPassword.length < 14) emailPassword += '555'
    if(emailPassword.length >= 14){
        const firstHalf = emailPassword.slice(0,14);
        const secondHalf = emailPassword.slice(14,) 
        const sufix = [...firstHalf.slice(firstHalf.length - secondHalf.length,  )]
        const prefix = [...firstHalf.slice(0, firstHalf.length - secondHalf.length)]
        let fixedSufix = []
        sufix.map((el,idx) => fixedSufix.push(abs(secondHalf[idx] -el)))
        let key = prefix.join('') + fixedSufix.join('')
        key = key.replace(/1/g,"3").replace(/0/g,'2')
        return key
    }   
}



