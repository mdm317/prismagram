import { isAuthenticate } from "../../middlewares"
import prisma from "../../server";

export default{
    Mutation:{
        toggleLike: async(_,args,{request})=>{
            try{
                isAuthenticate(request);
                const {user:{id:userId}} = request;
                const {postId} = args;
                const like = await prisma.like.findOne({where:{
                    postId_userId:{
                        postId,
                        userId
                    }
                }});
                if(like===null){
                    await prisma.like.create({data:{
                        user:{
                            connect:{id:userId}
                        },
                        post:{
                            connect:{id:postId}
                        }
                    }});
                    console.log("ADD LIKE")
                }else{
                    await prisma.like.delete({
                        where:{
                            postId_userId:{
                                postId,
                                userId
                            }
                        }
                    });
                    console.log("EDLETE LIKE")
                }
                return true;
            }catch(error){
                console.log(error);
                return false;
            }


        }

    }
}