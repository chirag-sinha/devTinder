const userAuth = ((req,res,next) => {
    const token = "xyz";
    const isAuth = token === "xyz" ;
    if (!isAuth){
        res.status(401).send("user not authorized!!!");
    }else{
        next();
    }
});

const adminAuth =( (req,res,next) => {
    const token = "xyz";
    const isAuth = token === "xyz" ;
    if (!isAuth){
        res.status(401).send("admin not authorized!!!");
    }else{
        next();
    }
    // res.send(" /admin is responded !!!");
});

module.exports = {
    adminAuth , userAuth ,
}
