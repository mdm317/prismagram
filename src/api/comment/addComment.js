import { isAuthenticate } from "../../middlewares"
import prisma from "../../server";

export default{
    Mutation:{
        addComments:async(_,args,{request})=>{
            isAuthenticate(request);
            const {user:{id:userId}} = request;
            const {postId, text} = args;
            try {
                console.log(userId, postId, text);       
                const comment = await prisma.comment.create({data:{
                    user:{
                        connect:{id:userId}
                    },
                    post:{
                        connect:{id:postId}
                    },
                    text
                }});
                return await prisma.comment.findOne({
                    where:{id:comment.id}
                    ,include:{
                        user:true
                    }
                });
            } catch (error) {
                console.log(error);
                throw Error(error);
            }

        }
    }
}