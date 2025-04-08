import express from 'express';

const app = express()
const PORT  = process.env.PORT || 3000;

app.use(express.json())

const main = () =>{
    try{
        app.listen(PORT,()=>{
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

main();