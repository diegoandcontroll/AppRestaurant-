const conn = require('./db');

const path = require('path');

module.exports = {
  getEmails(){
    return new Promise((resolve,reject) =>{
      conn.query("SELECT * FROM tb_emails ORDER BY id", (error, result) =>{
        if(error){
          reject(error)
        }else{
          resolve(result);
        }
      });
    });
  },

  delete(id){
    return new Promise((resolve,reject) =>{
      conn.query(`
        DELETE FROM tb_emails WHERE id = ?
      `,[
        id
      ],(error,results) =>{
        if(error){
          reject(error);
        }else{
          resolve(results);
        }
      });
    });
  },

  save(req){
    return new Promise((resolve,reject) =>{
      if(!req.fields.email){
        reject('How to email')
      }else{
        conn.query(`
        INSERT INTO tb_emails(email)
        VALUES(?)
      `,[
        req.fields.email
      ],(error, results) =>{
        if(error){
          reject(error.message)
        }else{
          resolve(results)
        }
      })
      }
      
    });
  }
}