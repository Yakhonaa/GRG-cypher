//CYPHER SCRIPT
export {alph_key, create_alphabets, encrypt, sum, appe, splitter,decrypting, process, createText, randomKey}
let reassembledList = []


function alph_key(keyPhase, letters, index){
    //create new phased shifted alphabet
    letters = [...letters]
    let engLength = letters.length
    let newAlph = []
    let key = keyPhase;
    let shift = (keyPhase.slice(7,9)) % engLength

    for(let i = 0; i<shift;i++){
        letters.push(letters.shift())}

    let phase = (keyPhase.slice(8,12))
    let phaseLength = phase.length
    for(let i = 0; i<engLength; i++){
        let char = phase[ i % phaseLength]
        newAlph.push(...letters.splice(char%letters.length,1))
    }
    //end of phased alphabet -> newAlph

    function createIndexes(password){
        let ArrayOfIndexes = []
        let SecondIndexes = []
        let SumOfArray = 0
     
        for(let i = 0; i<password.length; i++){
            SumOfArray += Number(password[i])
            ArrayOfIndexes.push(SumOfArray)
            SecondIndexes.push(Number(SumOfArray+1))
        }
        let MidArray = ArrayOfIndexes.concat(SecondIndexes)
        while(MidArray.length != engLength){
            MidArray.push(Number(MidArray.slice(-1)) + 1)
        }
        
    let absoluteAlphabet = {}
    newAlph.map((e,i) => {absoluteAlphabet[e] = MidArray[i] * index})
    
    return absoluteAlphabet
    }
   
    return createIndexes(key, engLength) 
}

function create_alphabets(index, letters, zero_alph){
  
    let answer = {}
    let rev_answer = {}
    let std_answer = {}
    const stdAlph = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
    stdAlph.map((e,i)=>{rev_answer[(i+1)*2] = e })
    stdAlph.map((e,i)=>{std_answer[e] = (i+1) * 2 })
   
    return [zero_alph, rev_answer, std_answer]   
}

function encrypt(oText, alph) {
    reassembledList.splice(0, reassembledList.length)
    let text = [...oText]
    let numberedlist = text.map((element) => appe(alph[0][element]));
    numberedlist.map((list) => splitter(list, alph))
    
    let reSlength = reassembledList.join("").length 
    //let decrypted = decrypt(reassembledList, alph)
    return reassembledList
}

function decrypting(text, alph){
    text = [...text]
    let rev = {}
    for(let key in alph[0]){
        rev[alph[0][key]] = key;
    }
    let digitStorage = []
    let currentLetter = []
    let answer = []
    for(let smb of text ){
        if(smb == 1 || smb == 2){
            digitStorage.push(smb)
            continue
        }
        else if(smb == 'A'){
            let currentSum = 0;
            for(let x = 0; x<currentLetter.length; x++){
                const operand = String(currentLetter[x])
                const twoDigitsSum = Number(operand[0]) + Number(operand[1])
                currentSum += twoDigitsSum
            }
            currentLetter = []
            answer.push(rev[currentSum])
        }
        else{
            let refferedSmb = alph[2][smb]
            for(let i = digitStorage.length; i>0; i--){
                (digitStorage[i - 1] == 1) ? refferedSmb += 1 : refferedSmb *= 2
            }
            digitStorage = []
            currentLetter.push(refferedSmb)
        }
    }
    return answer.join('')
}

function sum(list){
    let result = Number(0)
    for(let i=0; i<=list.length - 1; i++){
        result += Number(list[i])
    }
    return result
}

function appe(index){

    //THIS FUNCTION IS serving each letter separately
    //and returning a list with its random values
    index = Number(index)
    let letterList = [];

    //populationg the letterList with random values
    while(sum(letterList) < index){
        letterList.push(Number(Math.floor(Math.random() * 9)+1));
    }
    let total = sum(letterList);
    //checking the total sum and changing it if necessary
    if(total > index){
        let dif = total-index;
        letterList.push(letterList.pop()-dif)
    }
    //appending to EVEN length of letterList
    if(letterList.length % 2 != 0){
        letterList.push(Number(0))
    }
    return letterList
}

function splitter(numList, alph){
    //THIS FUNCTION IS taking each array of random numbers
    //and reassembling them by #1,2 and rvrsAlphabet
    //adding to the end of each completed letter a pointer "A1"

    for(let i = 0; i < numList.length; i+=2){
        let letters
        letters = [numList[i],numList[i+1]].join(""),
        letters = Number(letters)

        if(letters % 2 === 1){
            letters -= 1;
            reassembledList.push(1)
        }
        if(letters > 52){
            letters /= 2;
            reassembledList.push(2)
        }
        if(letters % 2 === 1){
            letters -= 1;
            reassembledList.push(1)
        }
        
        reassembledList.push((alph[1][letters]).toUpperCase())
    }
    reassembledList.push("A") 
}

function process(oText, serverKey, encryptKey, switcher){
    //encryptKey = encryptKey.replace(/0/g,'2')
    //encryptKey = encryptKey.replace(/1/g,"3")
    encryptKey = encryptKey.slice(0,14)
    if (encryptKey.length < 14) {return [...'']}
    let letters = [...`abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#%&?*()-+="'/~<>.,`]
    const zero_alph = alph_key(encryptKey, letters, serverKey)
    let alph = create_alphabets(serverKey, letters, zero_alph)
    if (switcher == 'encrypt') {
        return encrypt(oText, alph)
    }
    else  {
        return decrypting(oText, alph)
    }
}

function createText(L){
    const alph = [...`abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#%&?*()-+="'/~<>.,`]
    const alphLength = alph.length
    let answer = []
    for(let i = 0; i<L; i++){
        answer.push(alph[Math.floor(Math.random()*alphLength)])
    }
    return answer.join('')
}

function randomKey(){
    let key = []
    for(let i=0; i<12; i++){
        key.push([1,2,3,4,5,6,7,8,9][Math.floor(Math.random()*9)])
    }
    key = [...key].join("");
    key = key.replace(/1/g,"3").replace(/0/g,'2');
    return key
}






