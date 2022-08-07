 class Invoice_model{
        Org_des;
         Cus_nm;
         gstin;
         pos;
         Inv_num;
         Ord_num;
         Inv_dt;
         Term;
         Due_dt;
         Subj;
         st;
         Itm;
         Sub_tot;
         gstArr;
         Cus_note;
         Dis;
         Dis_val;
         tds_tcs;
         tax_per;
         tax_val;
         Adj;
         Grd_tot;
    constructor(Org_des,Cus_nm,gstin,pos,Inv_num,Ord_num,Inv_dt,Term,Due_dt,Subj,st,Itm,Sub_tot,gstArr,Cus_note,Dis,Dis_val,tds_tcs,tax_per,tax_val,Adj,Grd_tot)
    {
        this.Org_des = Org_des;
        this.Cus_nm = Cus_nm;
        this.gstin = gstin;
        this.pos = pos;
        this.Inv_num = Inv_num;
        this.Ord_num = Ord_num;
        this.Inv_dt = Inv_dt;
        this.Term = Term;
        this.Due_dt = Due_dt;
        this.Subj = Subj;
        this.st = st;
        this.Itm = Itm;
        this.Sub_tot = Sub_tot;
        this.gstArr = gstArr;
        this.Cus_note = Cus_note;
        this.Dis = Dis;
        this.Dis_val = Dis_val;
        this.tds_tcs = tds_tcs;
        this.tax_per=tax_per;
        this.tax_val=tax_val;
        this.Adj = Adj;
        this.Grd_tot = Grd_tot;
    }

}module.exports = {Invoice_model};



//     var data = {
    //         Cus_nm: req.body.Cus_nm,
    //         gstin : req.body.gstin,
    //         pos : req.body.pos,
    //         Inv_num : req.body.Inv_num,
    //         Ord_num:req.body.Ord_num,
    //         Inv_dt : req.body.Inv_dt,
    //         Term : req.body.Term,
    //         Due_dt : req.body.Due_dt,
    //         Subj : req.body.Subj,
    //         Itm : req.body.Itm,
    //         Cus_note : req.body.Cus_note,
    //         Dis : req.body.Dis,
    //         tds_tcs : req.body.tds_tcs,
    //         Adj : req.body.Adj,
    //         Grd_tot :req.body.Grd_tot
    // }