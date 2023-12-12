import bycrypt from "bcrypt";

const signInUser = async({user,password}) => {
    const match= await bycrypt.compare(password,user.password);
    if(!match){
        throw new Error("Wrong password")
    }
    return user;
  };

export default signInUser;