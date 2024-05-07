import {process, createText, randomKey} from './encrypt.js'

function count(text){
    let digitCounter = 0;
    let letterCounter = 0;

    for(const letter of text){
        if(letter == '1' || letter == '2'){
            digitCounter += 1
        }
        else {letterCounter += 1}
    }
    return [digitCounter,letterCounter]
}

function countCheck(level, times, key, chars){
    let keySum = 0;
    [...key].map(el => keySum += Number(el))
    key = String(key)
    console.log(`SUM.KEY - ${keySum}`)
    for(let time = 1; time <= level; time++){
        const currentLevel = time;
        const text = createText(chars);
        let totalDigits = 0;
        let totalLetters = 0;
        const startTime = Date.now();
        for(let i = 0; i<times; i++){
            const enc = process(text, currentLevel, key,'encrypt').join('');
            const [iterDigits, iterLetters] = [...count(enc)];
            totalDigits += iterDigits;
            totalLetters += iterLetters;
        };
        const totalSymbols = totalDigits + totalLetters;
        const lettersPrcnt = ((totalLetters / totalSymbols) * 100).toFixed(1);
        const digitsPrcnt = ((totalDigits / totalSymbols) * 100).toFixed(1);
        const avgSymbols = (totalSymbols / times)
        const timeNow = Date.now()-startTime;
        console.log(`\n---------------- COMPLEXITY - ${currentLevel} ----------------`);
        console.log(`NOF.TRIES - ${times} | AVG.SMB - ${(avgSymbols).toFixed(0)}`);
        console.log(`AVG.SMB/CHR - ${(avgSymbols/chars).toFixed(0)} | AVG.TIME.100 - ${(timeNow/times/(100/chars)).toFixed(1)}ms`);
        console.log(`TTL.DGTS - ${totalDigits} | TTL.LTRS - ${totalLetters}`);
        console.log(`PCT.LTRS - ${lettersPrcnt}% | PCT.DGTS - ${digitsPrcnt}%`);
    }
}

countCheck(2, 10000, randomKey(), 70)
