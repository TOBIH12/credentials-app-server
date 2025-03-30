import myCrudModel from "../models/credModel.js";
import HttpError from "../models/errorModel.js";
import myUserModel from "../models/userModel.js";


export const getDetails = async (req, res, next) => {
    try {
      
        let userDetails = await myCrudModel.find({creator: req.user.id});
        res.send(userDetails)
        
    } catch (error) {
        return next(new HttpError(error))
    }
};

export const getDetail = async (req, res, next) => {
    try {
        let {id} = req.params;
        let userDetails = await myCrudModel.findById(id);
        res.send(userDetails)
        
    } catch (error) {
        return next(new HttpError(error))
    }
};

export const createDetail = async (req, res, next) =>{
    try {
        let {name, email, age} = req.body;
    console.log(req.body);
        if(!name || !email || !age) {
            return next(new HttpError('Fill in all fields please', 422))
        }

        const newEmail = email.toLowerCase()
        if(!newEmail.includes('@')){
            return next(new HttpError('Please enter a valid email address', 422))}

            const emailExists = await myCrudModel.findOne({email: newEmail})
            if(emailExists){
                return next(new HttpError('Email already exists', 422))}

            if(age < 1){
                return next(new HttpError('Please enter a valid age', 422))}

         await myCrudModel.create({
            name,
            email: newEmail,
            age,
            creator: req.user.id
        }).then( async (data) => {
            console.log(`Credential added! ${data}`)
            const currentUser = await myUserModel.findById(req.user.id)
            const userCredentialCount = currentUser.credentials + 1;
            await myUserModel.findByIdAndUpdate(req.user.id, {credentials: userCredentialCount});
            res.status(200).send(data)
        }
        ).catch((err) => {
            return next(new HttpError(`Sorry, credentials wasn't created`))
        })
        
    
    } catch (error) {
        return next(new HttpError(error))
    }
};


export const updateDetail = async (req, res, next) => {
    let {id} = req.params;
    let {name, email, age} = req.body;

    if(!name || !email || !age){
         next(new HttpError(`Fill in all fields`, 422))

        let newEmail = email.toLowerCase()
        if(!newEmail.includes('@')){
            return next(new HttpError(`Please enter a valid email address`, 422))
        }
        const emailExists = await myCrudModel.findOne({email: newEmail})
        if(emailExists){
            return next(new HttpError(`Email already exists`, 422))}
        if(age < 1){
            return next(new HttpError(`Please enter a valid age`, 422))}
}else{
   await myCrudModel.findByIdAndUpdate(id, {name, email, age}, {new: true}).then((data) => {
        console.log(`Credential updated! ${data}`)
        res.status(200).send(data)
    }).catch((err) => {
        return next(new HttpError(`Sorry, credentials wasn't updated`))
    })
}
};

export const deleteDetail = async (req, res, next) => {
    let {_id} = req.body

    myCrudModel.findByIdAndDelete(_id).then(()=> console.log(`Credential deleted`)
    )
};