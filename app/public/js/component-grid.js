class Grid{
  constructor(configs){
    configs.listeners = Object.assign({},{
      afterUpdateClick: (e) =>{
        $('#modal-update').modal('show');
      },
      afterDeleteClick: (e) =>{
        window.location.reload();
      },
      
      afterFormCreate: (e) =>{
        window.location.reload();
      },

      afterFormUpdate: (e) =>{
        window.location.reload();
      },

      afterFormUpdateError: (e) =>{
        alert('Error On Form!');
      },

      afterFormCreateError: (e) =>{
        alert('Error On Form!');
      }

      
    } ,configs.listeners)
    this.options = Object.assign({},{
      formCreate: '#modal-create form',
      formUpdate: '#modal-update form',
      btnUpdate: 'btn-update',
      btnDelete: 'btn-delete',
      onUpdateLoad:(form,name,data) =>{
        let input = form.querySelector('[name='+name+ ']');
        if(input) input.value = data[name];
      }
    } ,configs);

    this.rows = [...document.querySelectorAll('table tbody tr')];

    this.initForms();
    this.initButtons();
  }

  initForms(){

    this.formCreate = document.querySelector(this.options.formCreate);

    this.formCreate.save().then(json =>{
      this.fireEvent('afterFormCreate')
    }).catch(error =>{
      this.fireEvent('afterFormCreateError')
      console.log(error);
    });

    this.formUpdate = document.querySelector(this.options.formUpdate);

    this.formUpdate.save().then(json =>{
      this.fireEvent('afterFormUpdate')
    }).catch(error =>{
      this.fireEvent('afterFormUpdateError')
      console.log(error);
    });
  }

  fireEvent(name, args){
    if(typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args);
  }

  getTrData(e){
    let tr = e.path.find(el =>{
      return (el.tagName.toUpperCase() === 'TR');
    });

    return JSON.parse(tr.dataset.row);
  }

  btnUpdateClick(e){
    this.fireEvent('beforeUpdateClick');

    let data = this.getTrData(e);

    for( let name in data){
      this.options.onUpdateLoad(this.formUpdate,name,data);
    }

    this.fireEvent('afterUpdateClick');

  }

  btnDeleteClick(e){
    this.fireEvent('beforeDeleteClick');

    let data = this.getTrData(e);

    if(confirm(eval('`'+this.options.deleteMessage+'`'))){
      fetch(eval('`'+this.options.deleteUrl+'`'),{
        method: 'DELETE'
      })
      .then(response =>{
        response.json();
      })
      .then(json =>{
        this.fireEvent('afterDeleteClick');
      });
    }
  }

  initButtons(){

    this.rows.forEach(row =>{
      [...row.querySelectorAll('.btn')].forEach(btn =>{
        btn.addEventListener('click', e =>{
          if(e.target.classList.contains(this.options.btnUpdate)){
            this.btnUpdateClick(e);
          }else if(e.target.classList.contains(this.options.btnDelete)){
            this.btnDeleteClick(e);
          }else{
            this.fireEvent('buttonClick', [e.target, this.getTrData(e), e]);
          }
        });
      });
    });
  }
}