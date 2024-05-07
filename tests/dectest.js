import {process, createText} from './encrypt.js'
import { createKey } from './keyGen.js'


function test(times, level){
    const email = createText(12) + '@'
    const password = createText(12)
    const letters = `abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#%&?*()-+="'/~<>.,`
    const key = createKey(email, password)
    const Msg = (letters + email.split('@')[0] + password)
    //---------------------------------------
    console.log(Msg)
    let encMsg = process(Msg, level, key, 'encrypt');
    let attempts = 0
    const startTime = Date.now()
    for(let time = 0; time<times; time++){
        if(time % 1000 == 0){
            encMsg = process(Msg, level, key, 'encrypt')
        }
        const dec = process(encMsg, level, key, 'decrypt')
        if(dec == Msg) attempts += 1
    }
    console.log(`TIME - ${(Date.now() - startTime)/1000}s | ATTEMPTS - ${attempts}`)
    console.log(`AVERAGE TIME = ${(Date.now() - startTime)/attempts}ms`)
}
test(1, 1)