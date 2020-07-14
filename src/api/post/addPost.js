import prisma from "../../server";

export default{
    Mutation:{
        addPost:async(_,args,{request,isAuthenticate})=>{
            isAuthenticate(request);
            const{location="", caption, files=[]} = args;
            try {
                const newPost = await prisma.post.create({
                    data:{
                        location,
                        caption,
                        user:{
                            connect:{
                                id:request.user.id
                            }
                        },
                        
                    }
                });
                files.forEach(async file=>
                    await prisma.file.create({
                        data:{
                            url:file,
                            post:{
                                connect:{
                                    id:newPost.id
                                }
                            }
                            
                        }
                    })
                );
                return true;              
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}