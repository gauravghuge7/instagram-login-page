
const login = document.querySelector("#login");

async function loginForm(event) {
    event.preventDefault();

    try {
    
        let response = fetch('http://localhost:5001/instagram/user/signinInsta', {

        method: 'POST',     // Specify the HTTP method
        body: new FormData(document.querySelector('#login')) // Collect form data
        })

            
        .then((response) => response.json())

        // if(response.ok) {

        //     response.json()

        //     .then((data) => {
        //         console.log(data);
                
        //         let repo =  document.cookie = `token=${data.token}; path=/`;

        //         console.log(repo);

        //         console.log(data.message);
        //         alert(data.message);
        //     })
        // }
        

        .then((data) => {
            console.log(data);
            
            let repo =  document.cookie = `token=${data.token}; path=/`;

            console.log(repo);

            console.log(data.message);
            alert(data.message);

            document.getElementById("username").innerHTML = data.data.username;
            document.getElementById("email").innerHTML = data.data.email;
            document.getElementById("bio").innerHTML = data.data.bio;

            document.getElementById("username").style = "color: deeppink";
            document.getElementById("email").style = "color: deeppink";
            document.getElementById("bio").style = "color: deeppink";
        })

        
    } 
    catch (error) {
        console.log(" error occured in login form ");
    }
}

login.addEventListener("submit", loginForm);



// get user info method declaration 

const getUser = document.querySelector("#getUser");

async function getUserInfo(event) {
    event.preventDefault();


    try {
    
        fetch("http://localhost:5001/instagram/user/getUser", {

            method: 'GET',

            body: new Headers({
                token: token
            }),
            
                
            


        })

        .then(response => response.json()) // Read response as text

        .then((data) => {
            console.log(data);

            console.log(data.message);
            
        })
    } 
    catch (error) {

        console.log(" error occured in get user info ");
        document.getElementById("demo").innerHTML = error;
    }
}


getUser.addEventListener("click", getUserInfo);