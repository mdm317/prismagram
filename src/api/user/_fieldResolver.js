import prisma from "../../server";

        
export default{
    User:
    {
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        amIFollowing : async(parent,_,{request})=>{
            const {id:parentId} = parent;
            const {user:{id}} = request;
            try {
                const mefollowing= await prisma.user.findOne({
                    where:{
                        id
                    },
                    select:{
                        following:{
                            where:{
                                id:parentId
                            }
                        }
                    }
                });
                console.log(mefollowing.following.length);
                if(mefollowing.following.length!==0){
                    return true;
                }
                return false;
                
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        itsMe:async(parent,_, {request})=>{
            const {id:parentId} = parent;
            const {user:{id}} = request;
            return parentId===id;
        },
        followingCount:parent=>{
            if(!parent.following)return 0;
            return parent.following.length;
        },
        followerCount:parent=>{
            if(!parent.follower)return 0;
            return parent.follower.length;
        }


        // amIFollowing : async(parent,_,{request,isAuthenticate})=>{
        //     isAuthenticate(request);
        //     console.log(parent);
        //     console.log(request.user.id);
        //     const amIfollowing = parent.followers.find(follower => follower.id=== request.user.id);
        //     console.log(amIfollowing);
        //     if(amIfollowing!==null){
        //         console.log('true?')
        //         return true;
        //     }
        //     return false;
        // }
    }
}