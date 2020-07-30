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
        userProfile:async(_,args)=>{
            console.log('ht>');
            try {
                console.log(args.nickName);
                const user = await prisma.user.findOne({
                    where:{
                        nickName:args.nickName
                    },
                    include:{
                        followers:true,
                        following:true,
                        posts:{
                            include:{
                                files:true,
                                comments:true,
                                likes:true        
                            }
                        }
                    }
                });
                console.log(user);
                return user;
            } catch (error) {
                console.log(error);
                throw Error(error);
            }
        }
    }
}