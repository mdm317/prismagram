export const isAuthenticate = (request)=>{
    if(request.user === null){
        throw Error("You need to log in to perform this action");
    }
    return;
}