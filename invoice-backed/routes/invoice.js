const express = require('express');
const router = express.Router();
const {Invoice_model} = require('../models/invoice_model');
var fs = require('fs');
var db  = new Array();

function savaData(data){
    const jsonData = JSON.stringify(data);
    fs.writeFile('./db.json', jsonData, 'utf8', function clbk(err,res){
        if(err){
            console.error({"error":err});
        }
    });
}
function getData(){
    var data = fs.readFileSync('./db.json','utf8');
    invoiceList = JSON.parse(data); 
    return invoiceList;
}

router.get('/', async(req,resp)=>{
    try {
        var invoiceList = getData(); 
        resp.send(invoiceList);
    } catch (error) {
        console.error(error);
    }
});

router.post('/',function(req,res){
try {
    
    var data = new Invoice_model(req.body.Org_des,
                                req.body.Cus_nm,
                                req.body.gstin,
                                req.body.pos,
                                req.body.Inv_num,
                                req.body.Ord_num,
                                req.body.Inv_dt,
                                req.body.Term,
                                req.body.Due_dt,
                                req.body.Subj,
                                req.body.st,
                                req.body.Itm,
                                req.body.Sub_tot,
                                req.body.gstArr,
                                req.body.Cus_note,
                                req.body.Dis,
                                req.body.Dis_val,
                                req.body.tds_tcs,
                                req.body.tax_per,
                                req.body.tax_val,
                                req.body.Adj,
                                req.body.Grd_tot);

    db2 = getData();
    db1 = new Array();
    db1.push(data);
    db = db2.concat(db1);
    console.log(req.body);
    res.status(200).send({"message":"Data Received"});
    console.log({"Saved data":data});
    savaData(db);

} catch (error) {
    console.error(error);
    res.json("Client error");
}
});
router.put("/",(req,res)=>{
    try {
        var data = new Invoice_model(
            req.body.Org_des,
            req.body.Cus_nm,
            req.body.gstin,
            req.body.pos,
            req.body.Inv_num,
            req.body.Ord_num,
            req.body.Inv_dt,
            req.body.Term,
            req.body.Due_dt,
            req.body.Subj,
            req.body.Itm,
            req.body.Sub_tot,
            req.body.gstArr,
            req.body.Cus_note,
            req.body.Dis,
            req.body.Dis_val,
            req.body.tds_tcs,
            req.body.tax_per,
            req.body.tax_val,
            req.body.Adj,
            req.body.Grd_tot);

    db2 = getData();
   for(let i=0;i<db2.length;i++){
    if(db2[i].Inv_num === req.body.Inv_num){
        db.push(data);
    }
    else{
        db.push(db2[i]);
    }
   }
   savaData(db);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;