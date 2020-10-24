const express=require("express");
const app=express();
const bodyParser=require('body-parser');

const port =3000
var urlencoded=bodyParser.urlencoded({extended:false});

app.use(express.static('public'));
app.use("/css",express.static(__dirname+"public/css"));
app.use("/js",express.static(__dirname+"public/js"));
app.use("/img",express.static(__dirname+"public/img"));

app.set('views',"./views")
app.set('view engine','ejs')

let hotels=[
    {name:"TAJ HOTEL",city:"AGRA",type:"VEG",style:"INDIAN"},
    {name:"KEDIA INTERNATIONAL",city:"DELHI",type:"NON-VEG",style:"CHINESE"},
    {name:"REGENT",city:"DELHI",type:"NON-VEG",style:"INDIAN"},
    {name:"GULMOHAR",city:"PATNA",type:"NON-VEG",style:"CHINESE"},
]

 
let getUniqueCIty=()=>{
    let cities=[];
    for(h of hotels){
        if(!cities.includes(h.city)){
            cities.push(h.city)
        }
    }
    cities.unshift("");
    return cities;
}


app.get('/',(req,res)=>{
    res.render('index',{text:'This is EJS'})
})

app.get('/add',(req,res)=>{
    res.render('add')
})

app.get('/view',(req,res)=>{
    res.render('list',{hotel:hotels})
})

app.get('/search',(req,res)=>{
    res.render('search',{city:getUniqueCIty()})
})

app.post('/search',urlencoded,(req,res)=>{
    var selected=hotels;
    if(req.body.city){
        selected=selected.filter((h)=>{
            if(req.body.city===h.city)
                return true;
            else
                return false;
        })
    }
    if(req.body.type){
        selected=selected.filter((h)=>{
            if(req.body.type===h.type)
                return true;
            else
                return false;
        })
    }
    if(req.body.style){
        selected=selected.filter((h)=>{
            if(req.body.style===h.style)
                return true;
            else
                return false;
        })
    }

    res.render('list',{hotel:selected})
})

app.post('/add',urlencoded,(req,res)=>{
    hotels.push({
        name:req.body.name.toUpperCase(),
        city:req.body.city.toUpperCase(),
        type:req.body.type.toUpperCase(),
        style:req.body.style.toUpperCase(),
    });

   
    res.render('list',{hotel:hotels})
})

app.listen(port,()=>console.info(`Listening on PortNo. ${port}`));