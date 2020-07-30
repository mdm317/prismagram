import prisma from "../../server"

export default{
    Query:{
        seeFeed:async(_,__,{request})=>{
            const {user:{id:userId}} = request;
            try {
                const followingsList = await prisma.user.findOne({where:{id:userId}}).following();

                return await prisma.post.findMany({
                    where:{
                        user:{
                            id:{
                                in:[...followingsList.map(following=>following.id),userId]
                            }
                        }
                    },
                    include:{
                        user:true,
                        comments:{
                            include:{
                                user:true
                            }
                        },
                        files:true,
                        likes:true
                    },
                    orderBy:{
                        createdAt:"desc"
                    }

                    
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}