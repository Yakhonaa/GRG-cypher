import { createText } from "./encrypt.js";
import { createKey } from "./client.js";

function keyTest( chars){
    const email = 'karambit.max';
    const password = createText(chars)
    const wanted = createKey(email, password)
    let sus;
    let attempts = 0
    const startTime = Date.now()
    while (sus !== wanted) {
        const susEmail = createText(chars)
        const susPassword = createText(chars)
        sus = createKey(susEmail, susPassword)
        attempts += 1
        if(attempts > 1000000){
            console.log(`SEARCHING FOR - ${wanted} | EMAIL - ${email} | PASSWORD - ${password}`)
            console.log(createKey(email, password) == wanted)
            break
        }
    }
    console.log(`ATTEMPTS - ${attempts} | TIME - ${(Date.now() - startTime)/1000}s`)
}
keyTest(12)