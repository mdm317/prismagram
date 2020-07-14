import prisma from "../../server"

export default{
    Query:{
        seeFullPost:()=>{
            return   prisma.post.findMany({
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