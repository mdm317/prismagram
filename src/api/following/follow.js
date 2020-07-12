import { isAuthenticate } from "../../middlewares"
import prisma from "../../server";

export default{
    Mutation:{
        follow:async(_,args,{request})=>{
            isAuthenticate(request);
            try {
                await prisma.user.update({
                    where:{
                        id:args.userId
                    },
                    data:{
                        followers:{
                            connect:{
                                id:request.user.id
                            }
                        }
                    }
                });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        unfollow:async(_,args,{request})=>{
            isAuthenticate(request);
            const {user:loginUser} = request;
            const {userId} = args;
            try {
                await prisma.user.update({
                    where:{
                        id:loginUser.id
                    },
                    data:{
                        following:{
                            disconnect:{
                                id:userId
                            }
                        }
                    }
                });
                return true;
                
            } catch (error) {
                console.log(error);
                return false;
            }

        }
    }
}