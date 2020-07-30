import prisma from "../../server"

export default{
    Query:{
        searchUser:async(_,args)=>{
            const users =  await prisma.user.findMany({where:{
                OR:[
                    {nickName : {
                        contains:args.term
                    }},
                    {firstName : {
                        contains:args.term
                    }},
                    {lastName : {
                        contains:args.term
                    }}
                ]
                
            },include:{
                posts:true,
                followers:true,
            }});
            console.log(users);
            return users;


        }
    }
}