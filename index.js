
const express=require('express');
const path=require('path');
var mysql=require('mysql');
var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'school'
});
con.connect(err=>{
    if(err){
        throw err;
    }
    console.log("mysql is conncted");
})
const app=express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(8081,(err)=>{
    if(err) throw err;
    else console.log("port is running");
});
app.post('/present',function(req,res){
    var sql="insert into student_data1 values('"+req.body.date+"',"+req.body.class+", "+req.body.roll_no+",'"+req.body.name+"','"+req.body.attendance+"')";
    con.query(sql,(err)=>{
        if(err) throw err;
        else 
        {console.log("inserted sucussfully");
         res.sendFile(path.join(__dirname,'/present.html'));
        }
    })
});
app.get('/Home.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Home.html'));
});
app.get('/Attendance.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Attendance.html'));
});
app.get('/present.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/present.html'));
});
app.get('/fetch_details.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/fetch_details.html'));
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/home_page.html'));
});
app.get('/Time_tables.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Time_tables.html'));
});
app.post('/user-list', function(req, res, next) {
    var sql='SELECT * FROM student_data1 where roll_no='+req.body.roll_no;
    con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  });
});
app.get('/add_home_work.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/add_home_work.html'));
});
app.post('/home_work',(req,res)=>{
    var subject=req.body.subject;
    var sql="insert into "+req.body.subject+" values('"+req.body.date+"','"+req.body.question+"')";
    con.query(sql,(err)=>{
        if(err) return err;
        else {
            console.log("inserted succussfully");
            res.sendFile(path.join(__dirname,'/present.html'))
        }
    });
});
app.get('/fetch_assignment.html',(req,res)=>{
        res.sendFile(path.join(__dirname,'/fetch_assignment.html'));
})
app.post('/assignment',(req,res,next)=>{
        var sql="select * from "+req.body.subject+" where day='"+req.body.date+"'";
        con.query(sql,(err,data,fields)=>{
            if(err) return err;
            else{
                res.render('assignment',{title:'subject_data',subject_data:data});
            } 
        });
});
app.get("/Class6.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'/Class6.html'));
});
app.get("/Class7.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'/Class7.html'));
});
app.get('/Class8.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Class8.html'));
});
app.get("/Class9.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'/Class9.html'));
});
app.get("/Class10.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'/Class10.html'));
});

