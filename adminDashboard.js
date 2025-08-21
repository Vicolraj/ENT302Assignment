if(localStorage.getItem('admin') !== 'true'){
      alert('You are not logged in');
      window.location.href = './admin.html';
    }else{
      const tablebody = document.getElementById('tablebody');
      tablebody.innerHTML = "<tr><td>...</td><td>...</td><td>...</td><td>Loading ....</td><td>...</td><td>...</td></tr>";
      const studentLogs = document.getElementById('studentLogs');
      const loader = document.getElementById('loaderContainer');
      let active = 0;


      // STYLING 
      studentLogs.style.transform = 'translateX(-80vw)';
      loader.style.scale = '0';

      window.onload = () => {
          fetchallrecord();
      }

     

      function showLogs(id){
          studentLogs.innerHTML = `
          <div style = "border: none; background: none;">
              <p><em>loading...</em></p>
          </div>
          `;
          studentLogs.style.transform = 'translateX(0)';

          fetch('./api/fetchuseraction.php', {
              method: 'POST',
              body: new URLSearchParams({ email: id }),
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          .then(res => res.json())
          .then(data => {
              // Build HTML for each user action
              if(data.length > 1){
                  const userActions = data.map((item) => {
                      let dateTime = item.actiontime.split(" ");
                      return `
                          <div>
                              <p><b>Action:</b> ${item.activity}</p>
                              <p><b>Date:</b> ${dateTime[0]}</p>
                              <p><b>Time:</b> ${dateTime[1]}</p>
                          </div>
                      `;
                  }).join("");
                  studentLogs.innerHTML = userActions;
              }
              else{
                  studentLogs.innerHTML = "No activities yet"
              }
              
          })
          .catch(err => console.error("Error fetching actions:", err));
      }

      function closeDialog() {
          studentLogs.style.transform = 'translateX(-80vw)';
      }

      function refresh(){
          fetchallrecord('hasvalue');
      }

      function fetchallrecord(x = null){

          if(x){
              loader.style.scale = '1';
          }

          fetch('./api/fetchallrecord.php', {
              method: 'GET'})
          .then(res => res.json())
          .then(data => {
            active = 0;
              tablebody.innerHTML  = data.map(
                  (student, sn) => {
                      student.isActive && student.isActive.toLowerCase() === 'true' ? active += 1 : active += 0; 
                      let word = `${active} student${active > 1 ? 's': ''} active`
                      document.getElementById('active').innerText = word;
                      return(`
                      <tr>
                          <td>${sn + 1}</td>
                          <td>${student.fullname}</td>
                          <td>${student.matric}</td>
                          <td>${student.email}</td>
                          <td>${student.mobileno}</td>
                          <td>${student.isActive && student.isActive.toLowerCase() === 'true' ? '<div class = "isactive"></div>' : '<div class = "notactive"></div>'}</td>
                          <td>
                              <button onclick ="showLogs('${student.email}')" class="btn">View Log</button>
                          </td>
                      </tr>
                          `)
                  }
              ).join(" ")
              loader.style.scale = '0'  
          })
      }

      localStorage.setItem('admin', '')
    }



    
    