import { isAuthenticate } from "../../middlewares"
import prisma from "../../server";

export default{
    Mutation:{
        follow:async(_,args,{request})=>{
            isAuthenticate(request);
            const {userId} = args;
            const {user:{id}} = request;


            if(userId === id){
                throw Error("same id");
            }
            try {
                const user = await prisma.user.findOne({
                    where:{
                        id
                    },
                    include:{
                       following:{
                           select:{
                               id:true
                           }
                       }
                    }
                });
                const followings = user.following.map(item=>item.id);
                
                if(followings.indexOf(userId)!==-1){
                    await prisma.user.update({
                        where:{
                            id
                        },
                        data:{
                            following:{
                                disconnect:{
                                    id:userId
                                }
                            }
                        }
                    });
                    return false;
                }else{
                    await prisma.user.update({
                        where:{
                            id:userId
                        },
                        data:{
                            followers:{
                                connect:{
                                    id
                                }
                            }
                        }
                    });
                    return true;
                }
            } catch (error) {
                console.log(error);
                throw Error(error);
            }
        }
    }
}