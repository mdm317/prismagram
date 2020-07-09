import { isAuthenticate } from "../../middlewares"
import prisma from "../../server";

export default{
    Mutation:{
        addCommnets:async(_,args,{request})=>{
            isAuthenticate(request);
            const {user:{id:userId}} = request;
            const {postId, text} = args;
            try {
                console.log(userId, postId, text);       
                await prisma.comment.create({data:{
                    user:{
                        connect:{id:userId}
                    },
                    post:{
                        connect:{id:postId}
                    },
                    text
                }});
                return "ss";
            } catch (error) {
                console.log(error);
                
            }

        }
    }
}