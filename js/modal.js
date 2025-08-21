  const login = document.getElementById('login');
const signup = document.getElementById('signup');
const closemodal = document.querySelector('.closeModal');


let modalIsShown = false;

// Initialize positions
login.style.transform = 'translateX(400px)';
signup.style.transform = 'translateX(-400px)';
closemodal.style.transform = 'scale(0)'


function showSignUp() {
  
  login.style.transform = 'translateX(400px)';
  signup.style.transform = 'translateX(0px)';
  modalIsShown = true;
  closemodal.style.transform = 'scale(1)'


}

function showLogin() {
  login.style.transform = 'translateX(0px)';
  signup.style.transform = 'translateX(-400px)';
  closemodal.style.transform = 'scale(1)'

  modalIsShown = true;
}

function closeModal(){
  if(modalIsShown){
    login.style.transform = 'translateX(400px)';
    signup.style.transform = 'translateX(-400px)';
    closemodal.style.transform = 'scale(0)';
  }
}



