import prisma from "../../server";

export default{
    Mutation:{
        addPost:async(_,args,{request,isAuthenticate})=>{
            isAuthenticate(request);
            const{location="", caption} = args;
            try {
                await prisma.post.create({
                    data:{
                        location,
                        caption,
                        user:{
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
        }
    }
}