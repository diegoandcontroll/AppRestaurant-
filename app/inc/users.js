const conn = require('./db');
module.exports = {

  render(req,res,error){
    res.render('admin/login',{
      body: req.body,
      error
    });
  },

  login(email,password){
    return new Promise((resolve,reject)=>{
      conn.query(`
        SELECT * FROM tb_users WHERE email = ?
      `,[
        email
      ],(error,results) =>{
        if(error){
          reject(error);
        }else{
          if(!results.length > 0){
            reject('User email or password invalid!');
          }else{
            let row = results[0];

            if(row.password != password){
              reject('User email or password invalid!');
            }else{
              resolve(row);
            }
          }
        }
      })
    });
  },

  getUsers(){
    return new Promise((resolve,reject) =>{
      conn.query("SELECT * FROM tb_users ORDER BY name", (error, result) =>{
        if(error){
          reject(error)
        }else{
          resolve(result);
        }
      });
    });
  },

  save(fields){
    return new Promise((resolve,reject) =>{
      let query,params = [
        fields.name,
        fields.email,
      ];
      
      if(parseInt(fields.id) > 0 ){
        params.push(fields.id);
        query = `
        UPDATE tb_users
        SET 
        name = ?,
        email = ?
        WHERE id = ?`;
      }else{
        query = `
        INSERT INTO tb_users(name,email,password)
        VALUES(?,?,?)
        `;
        params.push(fields.password);
      }
      conn.query(query,params, (error, results) =>{
        if(error){
          reject(error);
        }else{
          resolve(results);
        }

      });
    });
  },

  delete(id){
    return new Promise((resolve,reject) =>{
      conn.query(`
        DELETE FROM tb_users WHERE id = ?
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

  changePassword(req){
    return new Promise((resolve,reject) =>{
     if(!req.fields.password){
      reject('Preencha a senha');
     }else if(req.fields.password !== req.fields.passwordConfirm){
       reject('confirma a senha corretamente');
     }else{
       conn.query(`
        UPDATE tb_users
        SET password = ?
        WHERE id = ?
       `,[
         req.fields.password,
         req.fields.id
       ],(error, results) =>{
         if(error){
           reject(error.message);
         }else{
           resolve(results);
         }
       })
     }
    });
  }
}