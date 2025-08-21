const info = document.getElementById('info');
const container = document.getElementById('container');
const attendance = document.getElementById('attendance');

let lEmail =  localStorage.getItem("ams_user_email");
let lPassword = localStorage.getItem("ams_user_pwd");



if(lEmail && lPassword){
   
    fetchUserDetails();
    
}
else{
    container.innerHTML = "<h2><em>Your are not Logged in</em> <a style = 'color: white' href ='./index.html'><h3>Home</h3></a></h2>"
}


function logout(){
    let action =  'logout';
    const bodyData = new URLSearchParams ({action, lPassword, lEmail});
    fetch('./api/loginout.php', {
         method: 'POST',
         body: bodyData,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then(res => res.text())
        .then(data => {
            if(data.toLowerCase().trim() === 'true'){
                localStorage.setItem("ams_user_pwd", '');
                localStorage.setItem("ams_user_email", '');
                window.location = "./index.html";
            }else{
                alert(data)
            }
        })
}


 async function fetchUserDetails() {
        let formData = new URLSearchParams({lEmail, lPassword});
        await fetch('./api/fetchUserDetails.php', {
            method: 'POST',
            body: formData,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
                }})
        .then(response => response.json())
        .then(data => {
                let user = data[0];

                if(user){
                    let userActions = [];
                    info.innerHTML = `
                    <h2>${user.fullname}</h2>
                    <p>Matric: ${user.matric}</p>
                    <p>📞 ${user.mobileno}</p>
                    <p>📧 ${user.email}</p>
                    `
                   fetch('./api/fetchuseraction.php', {
                        method: 'POST',
                        body: new URLSearchParams({ email: lEmail }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        // Build HTML for each user action
                        const userActions = data.map((item) => {
                            let dateTime = item.actiontime.split(" ");
                            return `
                                <div class="attendance-card glassEffect">
                                    <p><b>Action:</b> ${item.activity}</p>
                                    <p><b>Date:</b> ${dateTime[0]}</p>
                                    <p><b>Time:</b> ${dateTime[1]}</p>
                                </div>
                            `;
                        }).join("");

                        // Inject into the container
                        attendance.innerHTML = userActions;
                    })
                    .catch(err => console.error("Error fetching actions:", err));

                }else{
                    info.innerHTML = `
                    <h2>No User</h2>
                    <p>Null</p>
                    <p>📞 Null</p>
                    <p>📧 NUll</p>
                `}
            }
            
        )
        .catch(Error => alert('cant retrive data\n', Error))
}

