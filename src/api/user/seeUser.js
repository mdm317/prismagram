import { isAuthenticate } from "../../middlewares"
import prisma from "../../server";

export default{
    Query:{
        seeUser:async(_,args,{request})=>{
            try {
                return prisma.user.findOne({where:{
                    id: args.userId
                }});
            } catch (error) {
                console.log(error);
            }
        }
    }
}