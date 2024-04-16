
const login = document.querySelector("#login");

async function loginForm(event) {
    event.preventDefault();

    try {
    
        fetch('http://localhost:5001/instagram/user/signinInsta', {

        method: 'POST',     // Specify the HTTP method
        body: new FormData(document.querySelector('#login')) // Collect form data
        })

        .then(response => response.json()) // Read response as text

        .then((data) => {
            console.log(data);

            console.log(data.message);
            alert(data.message);
        })
    } 
    catch (error) {
        console.log(" error occured in login form ");
    }
}

login.addEventListener("submit", loginForm);