class PluginFileReader{
  constructor(inputEl, imgEl){
    this.inputEl = inputEl;
    this.imgEl = imgEl;
   
    this.initInput();
  }

  initInput(){
    document.querySelector(this.inputEl).addEventListener("change", e =>{
      this.reader(e.target.files[0]).then(result =>{
        document.querySelector(this.imgEl).src = result;
      });
    });
  }

  reader(file){
    return new Promise((resolve,reject) =>{
      let reader = new FileReader();

      reader.onload = function(){
        resolve(reader.result);
      }

      reader.onerror = function(){
        reject('Not reader Image');
      }

      reader.readAsDataURL(file);
    });
    
  }
}