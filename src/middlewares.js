export const isAuthenticate = (request)=>{
    if(request.user.status === 'fail'){
        console.log("d안실행?");
        throw Error("You need to log in to perform this action");
    }
    return;
}