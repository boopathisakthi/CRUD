var express = require('express');
var router = express.Router();

const Register = require('../models').Register

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/insert', function (req, res) {
  if(req.body.id)
  {
    return Register.findByPk(req.body.id)
    .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: 'Register is Not Found',
          });
        }
        else
        {
         data.update(({
          fullname:req.body.fullname,
          mobile:req.body.mobile,
          email:req.body.email,
          isdeleted:0
          }))
          .then((data2)=>{
           return  res.status(200).send({message:'record updated successfully'});
          })
        }
      })
       
  }
  else
  {
    Register.create({
      fullname:req.body.fullname,
      mobile:req.body.mobile,
      email:req.body.email,
      isdeleted:0
 
    }).then((data)=>{res.status(200).send({status:'Success', message : 'Record Added SuccessFully',data})})
    .catch((error) => res.status(400).send({status:'Error', message : error}));
  }
  


});
router.get('/list', function (req, res) {
 
  Register.sequelize.query(
    'select Row_Number() over (order by id desc)sno,"id","fullname","mobile",email from "Registers" '+
    'where "isdeleted"=0',{raw: true,type: Register.sequelize.QueryTypes.SELECT} 

  )
  .then((cou) => {res.status(200).send({data:cou});})
  .catch((error) => { res.status(400).send(error); });
});
router.get('/edit/:id', function (req, res) {

  return Register.findByPk(req.params.id)
  .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: 'Register is Not Found',
        });
      }
      return res.status(200).send(data);
  })
  .catch((error) => res.status(400).send(error));
});
router.put('/delete/:id', function (req, res) {
    console.log(req.params.id)
   return Register.findByPk(req.params.id)
   .then((data) => {
       if (!data) {
         return res.status(404).send({
           message: 'Register is Not Found',
         });
       }
       else
       {
        data.update(({
           isdeleted:1
         }))
         .then((data2)=>{
          return  res.status(200).send('record deleted successfully');
         })
       }
      ;
   })
   .catch((error) => res.status(400).send(error));
 });
module.exports = router;
