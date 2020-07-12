import prisma from "../../server"

export default{
    Query:{
        searchPost:async(_,args)=>{
            const posts = await prisma.post.findMany({where:{
                OR:[{
                    caption:{
                        contains:args.content
                    }
                },{location:{
                    contains:args.content
                }}]
                
            }});
            return posts;
        }
    }
}