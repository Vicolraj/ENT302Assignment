const lform = document.getElementById('loginForm');

const id_ = document.getElementById('id');
const password_ = document.getElementById('password');

lform.addEventListener('submit', function(event) {
  event.preventDefault();


  let formData = new URLSearchParams({id: id_.value, password: password_.value});
   fetch('./api/admin.php',{
        method: 'POST',
        body: formData,
        headers:{
             'Content-Type': 'application/x-www-form-urlencoded'
            }})
   .then(res => res.text())
   .then(data => {
    if (data === 'true') {
        localStorage.setItem('admin', 'true');
        window.location.href = './adminDashboard.html';
    } else {
        alert(data);
    }
   })
});