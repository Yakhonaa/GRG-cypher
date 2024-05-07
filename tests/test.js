const alph = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
let random = []

for(let i = 0; i<alph.length; i++){
    random.push(i)
}

function createNum(upto){
    return Math.floor(Math.random()*upto)
}

function countMedian(obj){
    let maxKey;
    let maxKeyValue;
    for( const [value, key] of Object.entries(obj)){
        if(maxKey){
            if(key >= maxKey) {maxKeyValue = value; maxKey = key} 
        } else {maxKey = key; maxKeyValue = value}};
    return [maxKey, maxKeyValue]
}

function accTest(times, text, fixed){
    let history = [];
    let medians = {};

    function find(wanted, isCallBack = false){
        const startTime = Date.now();
        const wantedLength = wanted.length;
        let sus;
        let attempts = 0;
        while(sus !== wanted){
            let tempList = [];
            for(let i = 0; i<wantedLength; i++){
                const choice = createNum(2);
                const char = (choice == 0) ? [1,2][createNum(2)] : 
                                             alph[random[createNum(random.length)]];
                random = random.slice(1).concat(random.slice(0,1));
                tempList.push(char);
            };
            attempts += 1;
            sus = tempList.join("");
        };
        const elapsedTime = Date.now() - startTime;
        if(!isCallBack){
            console.log(`${elapsedTime}MS PAST`);
            console.log(`ATTMP-${attempts}`);
            console.log(`AVG SPEED - ${Math.floor(attempts / (elapsedTime / 1000))}`);
        } else {
            history.push([attempts, elapsedTime]);
        }
    }; // end of "find" function description

    for(let i = 0; i < times; i++){
        const progressTrack = i % (times / 10);
        if(progressTrack == 0){console.log(`${(i / times)*100}% is done...`)}
        if(times == 1) find(text);
        else find(text, true)
    }

    let totalTime = 0;
    let totalAttempts = 0;
    let totalTries = 0;
   
        history.map((el, idx) => {
            //filtering the results from all tries
             
            const attempts = el[0];
            const time = el[1];
            const median = Math.floor(attempts / 1000);
            medians[median] ? medians[median] += 1 : medians[median] = 1;
            totalAttempts += attempts;
            totalTime += time;
            totalTries ++ ;
            if(idx < fixed){ 
            console.log(`IDX - ${idx + 1} | ATTMP - ${attempts} | TIME - ${time}MS`)};
    });

    if(times > 1){
        console.log('-----------------------------------------------------');
        console.log(`TTL.TIME - ${(totalTime / 1000).toFixed(1)} sec`);
        console.log(`TTL.ATTMP - ${totalAttempts}`);
        console.log(`AVG.ATTMP - ${Math.floor(totalAttempts / totalTries)}`);
        console.log(`AVG.TIME - ${Math.floor(totalTime / totalTries) / 1000} sec`);
        console.log(`AVG.SPEED - ${Math.floor(totalAttempts / (totalTime / 1000))} / sec`);
        [apprnc, value] = countMedian(medians);
        console.log(`MDN.ATTMP - ${value*1000}`);
        console.log(`MDN.ATTMP.APPERED - ${apprnc}/${totalTries} | ${((apprnc/totalTries)*100).toFixed(2)}%`);
    }   
}

accTest(1000, 'O', 1000)

