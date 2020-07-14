import prisma from "../../server";

export default {
    Mutation:{
        sendMessage:async(_,args,{request,isAuthenticate})=>{
            isAuthenticate(request);
            try {
                const {roomId,message} = args;
                let {toUserId}= args;
                const {user:{id:fromUserId}} = request;
                if(toUserId=== fromUserId){
                    throw Error("can't send same user");
                }               
                if(roomId ===undefined){
                    room = await prisma.room.create({
                        data:{
                            participants:{
                                connect:[
                                    {id:fromUserId},{id:toUserId}
                                ]
                            }
                        }
                    });
                }else{
                    const roomUsers = await prisma.room.findOne({where:{id:roomId}}).participants();
                    if(roomUsers===null){
                        throw Error("room doesn't exist");
                    }
                    toUserId = roomUsers.filter((user)=>user.id!==fromUserId)[0].id;
                    console.log(toUserId);
                }
                return  prisma.message.create({
                    data:{
                        room:{
                            connect:{
                                id:roomId
                            }
                        },
                        text:message,
                        userfrom:{
                            connect:{
                                id:fromUserId
                            }
                        },
                        userto:{
                            connect:{
                                id:toUserId
                            }
                        }  
                    }
                });                         
            } catch (error) {
                console.log(error);
                
            }
        }
    }
}