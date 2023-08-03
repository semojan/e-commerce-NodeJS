const db = require("../data/database");
const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");

class User{
    constructor (email, password, fullname, street, postal, city){
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.address = {
            street: street,
            postal: postal,
            city: city
        };
    }

    static findById(userId) {
        const uid = new mongodb.ObjectId(userId);
    
        return db
            .getDb()
            .collection('users')
            .findOne({ _id: uid }, { projection: { password: 0 } });
    }

    async getUserWithSameEmail() {
        return db.getDb().collection("users").findOne({email: this.email});
    }

    async existsAlready(){
        const existingUSer = await this.getUserWithSameEmail();
        if (existingUSer){
            return true;
        }
        return false;
    }

    async signup() {
        const hashedPass = await bcrypt.hash(this.password, 12)

        await db.getDb().collection("users").insertOne({
            email:this.email,
            password: hashedPass,
            fullname: this.fullname,
            address: this.address
        }); 
    }

    async comparePass(hashedPass) {
        return bcrypt.compare(this.password, hashedPass);
    }
}

module.exports = User;