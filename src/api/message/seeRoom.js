import prisma from "../../server";

export default{
    Query:{
        seeRoom(_,args,{request,isAuthenticate}){
            isAuthenticate(request);
            const {roomId} = args;
            try {
                return prisma.room.findOne({where:{id:roomId},include:{messages:true}});
            } catch (error) {
                console.log(error);
            }
        }
    }
}