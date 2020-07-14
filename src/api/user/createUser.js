import prisma from '../../../src/server';
import {secretGenerator, sendSecretMail} from '../../../src/utils.js';
export default {
    Mutation:{
        createUser:async(_,args )=>{
            const {nickName,email,firstName="",lastName,bio="",avator=""} = args;
            console.log(nickName,email,firstName,lastName,bio);
            try {
    
                const secretcode = secretGenerator(16);
                console.log(secretcode);
                const user = await prisma.user.create({data:{
                    nickName,
                    email,
                    firstName,
                    lastName,
                    bio,
                    secretcode,
                    avator
                }});
                console.log(user);
                sendSecretMail(email, secretcode);
            } catch (error) {
                console.log(error);
                return false;
            }
        return true;
        }
    }
}