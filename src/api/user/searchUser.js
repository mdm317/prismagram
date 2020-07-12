import prisma from "../../server"

export default{
    Query:{
        searchUser:async(_,args)=>{
            const users =  await prisma.user.findMany({where:{
                OR:[
                    {nickName : args.term},
                    {firstName : args.term},
                    {lastName : args.term}
                ]
                
            }});
            console.log(users);
            return users;


        }
    }
}