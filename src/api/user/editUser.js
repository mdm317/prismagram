import { isAuthenticate } from "../../middlewares"
import prisma from "../../server";

export default{
    Mutation:{
        editUser:async(_,args,{request})=>{
            isAuthenticate(request);
            const {user:{id}} = request;
            const {nickName,email,firstName="",lastName,bio=""} = args;
            try {
                await prisma.user.update({
                    where:{
                        id
                    },
                    data:{
                        nickName, email, firstName, lastName, bio
                    }
                })
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}