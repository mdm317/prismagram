import prisma from "../../server"

export default{
    Mutation:{
        editPost:async(_,args,{request})=>{
            const  {id,caption, location="",action}= args;
            const {user} = request;
            try {
            const post = await prisma.post.findOne({ where:{ id } });
            console.log(post);
            if(post.userId === user.id){
                    if(action=== "EDIT"){
                        return prisma.post.update({
                            where:{
                                id
                            },
                            data:{
                                caption, location
                            }
                        });    
                    }else if(action === "DELETE"){          
                        await prisma.executeRaw(`delete from post where id = ${id};`);
                        return post;
                    }
                }else{
                    throw Error("You can't do it");
                }
            } catch (error) {
                console.log(error);
            }

           
        }
    }
}