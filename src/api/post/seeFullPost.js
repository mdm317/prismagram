import prisma from "../../server"

export default{
    Query:{
        seeFullPost:async()=>{
            return prisma.post.findMany({
                include:{
                    comments:{
                        include:{
                            user:true
                        }
                    },
                    likes:true
                }
            });
        }
    }
}