import prisma from "../../server";

export default{
    Query:{
        showRooms:(_,__,{request,isAuthenticate})=>{
            isAuthenticate(request);
            const {user:{id}}=request;
            return prisma.user.findOne({where:{id}}).rooms();
        }
    }
}