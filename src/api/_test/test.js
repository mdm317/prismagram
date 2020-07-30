import prisma from "../../server"

export default{
    Query:{
        hello:()=>"hI!"
    },
    Mutation:{
        addPost2:async(_,args)=>{
            const {caption, files, userId}= args;
            console.log(caption);
            const newPost = await prisma.post.create({
                data:{
                    caption,
                    user:{
                        connect:{
                            id:userId
                        }
                    }
                }
            });
            files.forEach(async element => {
                await prisma.file.create({
                    data:{
                        url:element,
                        post:{
                            connect:{
                                id: newPost.id
                            }
                        }
                    }
                });
            });
        }
    }
}