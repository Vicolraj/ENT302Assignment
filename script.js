const form = document.getElementById('registrationForm');
const lform = document.getElementById('loginForm');
// Lform meang login form

form.addEventListener('submit', function(event) {
  event.preventDefault();

  let formData = getAllData(['fullname', 'email', 'mobileno', 'matric', 'password']);
  formData = new URLSearchParams(formData);
  
   fetch('./api/signup.php',{
        method: 'POST',
        body: formData,
        headers:{
             'Content-Type': 'application/x-www-form-urlencoded'
            }})
   .then(res => res.text())
   .then(data => { 
      if(data.toLowerCase().trim() === 'true'){
        fetch('./api/creatTable.php', {
            method: 'POST',
            body: formData,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
                }})
        .then(response => response.text())
        .then(data => alert(data))
      
      }else{
        alert(data);
      }
    
   })
});



lform.addEventListener('submit', function(event) {
  event.preventDefault();

  let formData = getAllData(['lEmail', 'lPassword']);
  formData = {...formData, action:'login'}
  formData = new URLSearchParams(formData);
  
   fetch('./api/loginout.php',{
        method: 'POST',
        body: formData,
        headers:{
             'Content-Type': 'application/x-www-form-urlencoded'
            }})
   .then(res => res.text())
   .then(data => {
    if(data.toLowerCase().trim().includes('true')){
        let hashPwd = data.split(' ');
        hashPwd = hashPwd[1].replace(/\r?\n|\r/g, "");
        localStorage.setItem("ams_user_pwd", hashPwd);
        localStorage.setItem("ams_user_email", gIDValue('lEmail'));

        if(localStorage.getItem("ams_user_email") && localStorage.getItem("ams_user_pwd")){
          window.location = "./users.html"
        }
    }
    else{
      alert(data)
    }
   })
});

function getAllData(element){
  let allElement = null;
  for(x of element){
    allElement = {...allElement, [x]: gIDValue(x)}
  }
  return allElement;
}

function gIDValue(x){
  return document.getElementById(x).value;
}

 