const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine',hbs);

console.log(__dirname);


app.use((req,res,next)=>{
    res.render('maintenance.hbs',{
        maintennace : 'This web site is on maintennace'
    });
//next();
});
app.use(express.static('public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err)=>{
            if (err){
                console.log('Error Writing to log file');
            }
    });
    next();
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screemIt',(text)=>{
    return text.toUpperCase();
});
app.get('/',(req,res)=>{
   res.render('home.hbs',{
            pageTitle:'Home  page',
            welcome:"Welcome Home "
   })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page'
    })
});

app.get('/bad',(req,res)=>{
    res.send({
        "error": 'error'
    })
});
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
});
