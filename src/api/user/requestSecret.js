import prisma from "../../server";
import { secretGenerator,sendSecretMail } from "../../utils";

export default{
    Mutation:{
        requestSecret:async(_,args,)=>{
            try {
                const {email} = args;
                const user = await prisma.user.findOne({where:{email}});
                if(!user){
                    throw Error("user doesn't exit");
                }
                const secretcode= secretGenerator(16);
                await prisma.user.update({
                    where:{
                        email
                    },
                    data:{
                        secretcode
                    }
                });
                sendSecretMail(email, secretcode);
                return true;              
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}