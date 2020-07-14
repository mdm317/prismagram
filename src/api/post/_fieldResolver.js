import prisma from "../../server";


export default{
    Post:{
        isLiked:async(parent,__, {request})=>{
            const {user:{id:userId}}=request;
            const {id:postId} = parent;
            try {
                const like = await prisma.like.findMany({
                    where:{
                        AND:[
                            {
                                user:{
                                id:userId
                                }
                            },
                            {post:{
                                id:postId
                            }}
                        ]                                              
                    }
                });
                console.log(like);
                if(like.length>0){
                    return true;
                }
                return false; 
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        likeCount:parent=>parent.likes.length
        
        
    }
}