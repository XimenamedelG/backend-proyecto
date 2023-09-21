import express from 'express'
import cors from 'cors'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCX6QwX6pv3lhx_4ez83SgvmEO68w577L4",
    authDomain: "proyecto-back-front-3eac3.firebaseapp.com",
    projectId: "proyecto-back-front-3eac3",
    storageBucket: "proyecto-back-front-3eac3.appspot.com",
    messagingSenderId: "819191299582",
    appId: "1:819191299582:web:85e140fa62ba25603b94af"
  };


const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)

// Settings de la aplicacion
const app = express()
app.use(express.json())
app.use(cors())

const Users = await collection(db, 'Users')
// Creación de rutas
app.get('/', async(req, res) => {
    try {
        const Users = await collection(db, 'Users')
        const listUsers = await getDocs(Users)
        const  aux = []
    listUsers.forEach((doc) => {
        const obj = {
            id: doc.id,
            ...doc.data()
        }
        aux.push(obj)
    })
    res.send({
        'msg': 'Success',
        'data': aux
    })
    } catch {
        res.send({
            'msg': 'error',
            'data': error
        }) 
    }
})

//Todas las rutas deben ir arriba del listen
app.post('/create', async(req, res) => {
    try {
        const body = req.body 
        const Users = await collection(db, 'Users')
        await addDoc(Users, body)
        res.send({
            'msg': 'sucess',
        }) 
    } catch(error) {
        res.send({
            'msg': 'error',
            'data': error
        }) 
    }
})

app.get('/delete/:id', async(req, res) => {
    //console.log('@@@ param => ', req.params.id)
    const id = req.params.id 
    try { 
        await deleteDoc(doc(db, 'Users', id))
        res.send({
            'msg': 'user deleted'
        })
    } catch(error){
        res.send({
            'msg': 'error',
            'data': error
        })
    }
})

app.get('/get-update/:id', async(req, res) => {
    const id = req.params.id 

    const userRef = doc(db, 'Users', id) 
    const user = await getDoc(userRef)
    
    if(user.exists()) {
        res.send({
            'msg': 'Success',
            'data': user.data()
        })
    } else {
        res.send({
            'msg': 'user doesnt exist'
        })
    }
})

app.post('/update', async(req, res) => {
    const { id, firstname, lastname, address, city, phone, cp} = req.body
    const newData = {
        firstname,
        lastname,
        address, 
        city, 
        phone,
        cp
    }
     await updateDoc (doc(db, 'Users', id), newData)
    res.send({
        'msg': 'Success'
    })
})
// Servidor
app.listen(9000, () => {
    console.log('Servidor trabajando');
});
