import prisma from "../../server.js";
import { generateToken } from "../../utils.js";

export default{
    Mutation:{
        confirmSecret:async(_, args)=>{
            const {email, secretcode: checkSecretCode} = args;
            try {
                const {secretcode, id} = await prisma.user.findOne({
                    where: { email},
                });
                console.log(checkSecretCode, secretcode);
                if(checkSecretCode === secretcode){
                    return generateToken(id);
                }
                return
            } catch (error) {
                console.log(error)
                throw Error(error.message);
            }
        }
    }
}