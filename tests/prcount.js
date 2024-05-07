import {process, createText, randomKey} from './encrypt.js'

function preciseCount(level, times, key, chars){
    let keySum = 0;
    [...key].map(el => keySum += Number(el))
    key = String(key)
    console.log(`SUM.KEY - ${keySum}`)
    for(let time = 1; time <= level; time++){
        let storage = {};
        let totalSymbols = 0;
        const text = createText(chars)
        const currentLevel = time; 
        for(let _ of 'AEFGHIJKLMNOPQRSTUVWXYZ') storage[_] = 1;
        //counting cycle
        for(let i = 0; i<times; i++){
            const enc = process(text, currentLevel, key,'encrypt').join('');
            for(const letter of enc){
                if(letter != 1 && letter != 2) storage[letter] += 1; totalSymbols += 1}
        }
        console.log(`\n----- COMPLEXITY - ${currentLevel} ------ CHARS - ${chars} -----`);
        let minValue = Math.min(...Object.values(storage));
        let maxValue = Math.max(...Object.values(storage));
        const stdDiv = ((maxValue - minValue)/totalSymbols*100).toFixed(1)
        for(const [key, value] of Object.entries(storage)) {
            console.log(`${key} - ${((value/totalSymbols)*100).toFixed(1)}%`)};
        console.log(`TTL.SMB - ${totalSymbols} | STD.DEV - ${stdDiv}%`);
    }
}

preciseCount(4,10000,randomKey(), 1000)