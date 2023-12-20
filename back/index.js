/* using insomnia */
import express from 'express';


const app = express();


app.use(express.json());//read json req 

/* ==================== */
app.get('/', (req, res) => {
    res.send('hello world');
}); 
//req - будет храниться о том что мне прислал клиент 
//res - что я буду передовать клиенту
/* ====================== */

/* get Login and password through json  */
app.post('/auth/login', (req, res) => {
    console.log(req.body);
    res.json({
        success:true,
    });
})




app.listen(4444,(err) =>{
    if(err){
        return console.error(err);
    }
    console.log('server ok')
})