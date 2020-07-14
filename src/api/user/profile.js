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
        },
        userProfile:(_,args)=>{
            return prisma.user.findOne({
                where:{
                    id:args.id
                },
                include:{
                    followers:true
                }
            })
        }
    }
}