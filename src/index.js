
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const colors = require('colors')
const bcrypt = require('bcrypt')

const user = require('./models/user.models')
 
const app = express()

const PORT = process.env.PORT || 4000

//& ====  base de datos ===
    require('./db');
//& =======================

//^ ===== middlewares ===========

app.use(express.json());
app.use(bodyParser.json());

//^ =============================

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//& ==================  R U T A S ======================

app.get('/', (req,res) => {

});

app.post('/register', (req,res) => {

    console.log(req.body);

    const {username,lastname,email,password,foto} = req.body;
    //console.log(username,lastname,email,password);    

    const user1 = new user({username,lastname,email,password,foto})

    res.write({foto})

    // user1.save( err => {

    //     if(err)
    //     {
    //         res.status(500).send('error al registrar al usuario');
    //         console.log(err);
    //         console.log(("error al registrar al usuario ").bgRed);
        
    //     }else{

    //         res.status(200).send('usuario registrado correctamente')
    //     }
    // });

    user1.save();
})

app.post('/authenticate', (req,res)=> {

    const {email} = req.body

    const emailDB = user.findOne({email});

    res.send('ingresado con exito')

    // user.findOne({email}, (err, User) => {

    //     if(err)
    //     {
    //         res.status(500).send('error al autenticar el usuario ')
        
    //     }else if(!user){
         
    //         res.status(500).send('el usuario no existe en la base de datos')

    //     }else{

    //         user.isCorrectPassword(password, (err, result) => {

    //             if(err)
    //             {
    //                 res.status(500).send('error al autenticar el usuario')
    //             }else if(result){

    //                 res.status(200).send('usuario autenticado correctamente')
    //             }else{
    //                 res.status(500).send('usuario y/o contraseña incorrecta')
    //             }
    //         })

    //     }
    //})

})

//& ====================================================

//^ ============  configuracion puerto de escucha ================

app.listen(PORT, ()=> {

    console.log(("escuchando desde localhost:"+PORT+" ").inverse);

})