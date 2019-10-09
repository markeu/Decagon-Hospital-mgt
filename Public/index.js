  // Admin sign-in
$(document).ready(() => {
    let submit = $("#submit"); 
    let url = "http://localhost:3000/users";
    submit.click(function (e) {
        e.preventDefault();
        const email = $('#InputEmail').val();
        const password = $('#InputPassword').val();
        if (email.trim().length < 1) {
            alert("Please enter your email address");
        } else if (password.trim().length < 1) {
            alert("Please enter your password");
        } else {
            $.ajax({
                url: url + `?email=${email}&&password=${password}`,
                type: 'GET',
                dataType: 'json'
            }).done((data) => {
                data.length === 0 ? alert('User login credentials incorrect') : window.location.replace("admin.html")         
            })
        }
        return false;
    })
});
  
    
  
