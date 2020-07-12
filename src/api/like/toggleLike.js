import { isAuthenticate } from "../../middlewares"
import prisma from "../../server";

export default{
    Mutation:{
        toggleLike: async(_,args,{request})=>{
            isAuthenticate(request);
            try{
                const {user:{id:userId}} = request;
                const {postId} = args;
                const like = await prisma.like.findMany({where:{
                    AND:[
                        {
                            user:{
                                id:userId
                            }
                        },
                        {
                            post:{
                                id:postId
                            }
                        }
                    ]
                }});
                
                if(like.length===0){
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
                    await prisma.like.deleteMany({
                        where:{
                            AND:[
                                {
                                    user:{
                                        id:userId
                                    }
                                },{
                                    post:{
                                        id:postId
                                    }
                                }
                            ]
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