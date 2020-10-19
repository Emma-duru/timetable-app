const signUp = $('.signUp');
const login = $('.login');

class User {
    constructor(firstName, lastName, userName, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }
}


// To sign up
signUp.click((e) => {
    e.preventDefault();

    const firstName = $('#signup-form .first-name').val();
    const lastName = $('#signup-form .last-name').val();
    const userName = $('#signup-form .username').val();
    const password1 = $('#signup-form .password1').val();

    const user = new User(firstName, lastName, userName, password1);

    console.log(user.firstName, user.lastName, user.userName, user.password1)
    addUserToStorage(user);
    $("#signup-form").trigger("reset");  
    goToTable();
})

const getUsersFromStorage = () => {
    let users;
    if (localStorage.getItem('users') === null) users = [];
    else users = JSON.parse(localStorage.getItem('users'));
    return users;
};

const addUserToStorage = (user) => {
    users = getUsersFromStorage();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
};


// Redirects to the Timetable
const goToTable = () => {
    $(location).attr("href", "table.html");
};


// To Login
login.click((e) => {
    e.preventDefault();
    const username = $('#login-form .username').val();
    const password = $('#login-form .password').val();

    users = getUsersFromStorage();

    users.forEach((user) => {
        if(user.userName === username 
            && user.password === password) {
                goToTable();
            }
    })

    $('#login-form').trigger("reset");
})