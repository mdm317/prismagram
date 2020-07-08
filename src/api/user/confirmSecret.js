import prisma from "../../server.js";
import { generateToken } from "../../utils.js";

export default{
    Query:{
        confirmSecret:async(_, args)=>{
            const {email, secretcode: checkSecretCode} = args;
            const {secretcode, id} = await prisma.user.findOne({
                where: { email},
            });
            if(checkSecretCode === secretcode){
                return generateToken(id);
            }
            throw Error("Wrong email/secret combination");
        }
    }
}