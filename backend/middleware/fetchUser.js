var jwt = require('jsonwebtoken');
const JWT_SECRET = "HARRY$123";


const fetchUser =(req,res,next)=>{
// Get user from jwt token and add id to request the object
const token = req.header('auth-token');
if(!token){
    res.status(401).send({err: 'Please authenticate a valid token'})
}

try {
    // Verify a given token using a secret key to get a decoded token
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
} catch (err) {
    res.status(401).send({ error: err.message })
 
    
}
}




module.exports = fetchUser;