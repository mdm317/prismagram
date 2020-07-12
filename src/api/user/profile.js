import prisma from "../../server"

export default{
    Query:{
        myProfile:(_,__,{request, isAuthenticate})=>{
            isAuthenticate(request);
            return  prisma.user.findOne({
                where:{
                    id:request.user.id
                },
                include:{
                    posts:true
                }
            })
        }
    }
}