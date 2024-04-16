
const form1 = document.querySelector("#form1");





async function submitform(event) {
    event.preventDefault(); 
    
    // const name = document.getElementById("name").value;
    // const email = document.getElementById("email").value;
    // const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;
    // const bio = document.getElementById("bio").value;

    // const options = {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     username,
    //     password,
    //     bio
    //   })
    // }
  
    try {
      // const targetUrl = "http://localhost:5001/instagram/signupInsta"

      //   let response = await fetch("http://localhost:5001/instagram/signupInsta", options);

        // if (response.ok) {

          
        //   // console.log(response);
        //   // console.log(response.formData);
        //   // console.log(response.ok);
        //   console.log(response.json());

          

        // } 
        // else {

        //   console.log(response);
        //   console.log("error is response is not okay");
        // }

        try {
          fetch('http://localhost:5001/instagram/user/signinInsta', {
            method: 'POST',     // Specify the HTTP method
            body: new FormData(document.querySelector('#form1')) // Collect form data
          })
            .then(response => response.json()) // Read response as text
            

            .then((data) => {
              console.log(data);


              document.getElementById("dispmessage").innerText = data.message;

              document.getElementById("dispName").innerText = data.backend.name;
              document.getElementById("dispUsername").innerText = data.backend.username;
              document.getElementById("dispEmail").innerText = data.backend.email;
              document.getElementById("dispBio").innerText = data.backend.bio;


            }); 

        } catch (error) {
          alert('An error occurred!');
        }
           

    } 
    
    catch (error) {

        console.error('Network error:', error.message);
    }
  }
  
  
  form1.addEventListener("submit", submitform);



