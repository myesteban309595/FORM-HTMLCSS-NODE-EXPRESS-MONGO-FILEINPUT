const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({

    username: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: true
    }
});

//^esto permite hacer operaciones con mongoose antes de que se guarden los datos en la base de datos

userSchema.pre('save', function(next){  //& antes de que se guarden lso datos ejecutamos la siguiente funcion

    if(this.isNew || this.isModified('password')) //& verificamos si es nueva o se esta modificando
    {
        const document = this;

        bcrypt.hash(document.password, 10, (err, hashedPassword) => { //^ con document.password sacamos la contraseña y la encriptamos
 
            if(err) //^ validamos si hay un error y continue el flujo de nuestra funcion
            {
                next(err);

            }else{

                document.password = hashedPassword; //~ si no decimos que nuestro password es el nuevo hash
                next();
            }
        })

    } else {
        next();
    }
});

//^  para comparar la contraseña guardada con la ingresada en la base de datos

userSchema.methods.isCorrectPassword = function(candidatePassword, callback){

    bcrypt.compare(candidatePassword, this.password, function(err, same){

        if(err)
        {
            callback(err)

        }else {

            callback(err,same); 
        }
    })
}

module.exports = mongoose.model('user', userSchema);