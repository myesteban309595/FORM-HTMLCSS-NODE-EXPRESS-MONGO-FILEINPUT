const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user = require('./models/user.models');

(async ()=> {

   await mongoose.connect('mongodb://localhost:27017/form-node-express-register-login', 
       {
         useNewUrlParser: true, 
         useUnifiedTopology: true
       }
    )
    console.log(("conectado a la base de DATOS ").bgGreen.black);

    const existData = await user.find(); //& consulto en la base de datos si existe algn dato, si no, los creo por defecto

    if(existData.length == 0)
    {
        const user1 = new user ({

            username: "marlon yoel",
            lastname: "esteban ",
            email: "marlon@hotmal.com",
            password: "123456",
            address: "direccion administrador",
            admin: true,
            state: true
        })
        const user2 = new user ({

            username: "ingrid paola",
            lastname: "jimenez ",
            email: "ingrid@hotmal.com",
            password: "123456",
            address: "direccion usuario 2",
            admin: false,
            state: true
        })

        user1.save();
        user2.save();
    }

})();

