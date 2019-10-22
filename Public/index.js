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
                data.length === 0 ? alert('Unauthorized access') : window.location.replace("admin.html")         
            })
        }
        return false;
    });
});

 //get all items(patients) from database
$(document).ready(() => {
    var id = sessionStorage.getItem("user");
   
    $.ajax({
      method: 'GET',
      url: "http://localhost:3000/patients",
      dataType: 'json'
    }).done(data => {
      $.map(data, patient => {
        let add = '<tr>';
        add += '<th scope="row">' + parseInt(data.indexOf(patient) + 1)+ '</th>';
        add += '<td><a  id="' + patient.id + '" class="clientName checkPatient" data-toggle="modal" data-target="#dataModal">' + patient.name + '</a></td>';
        add += '<td>' + patient.age + '</td>'
        add += '<td>' + patient.address + '</td>'
        add += '<td>' + patient.PhoneNumber + '</td>'
        add += '<td>' + patient.bloodGroup + '</td>'
        add += '<td>' + patient.genotype + '</td>'
        add += '<td>' + patient.status + '</td>'
        add += '<th class="text-center">' + '<button id="' + patient.id + '" class="d-none d-sm-inline btn btn-sm btn-warning shadow-sm update main-color-bg updateBtn" data-toggle="modal" data-target="#updatModal"> Edit </button>' + '</th>'
        add += '<th class="text-center">' + '<button <a href="#" id="' + patient.id + '" class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm remove main-color-bg tableWist deleteItem type="button">Delete</button></a>' + '</th>'
        add += '</tr>'; 
        $('table tbody').append(add);
      });
      if (data.length < 1) {
        $("p").append("You don't have any patient record")
      }
    });

//delete item from database
    $(document).on("click", ".deleteItem", function(e) {
    e.preventDefault();
    let id = $( this ).attr("id")
    if(confirm("Are you sure?")){
        $.ajax({
            url: `http://localhost:3000/patients/${id}`,
            type: 'DELETE',
            error: () => {
                alert('oopp!.. error something when wrong')
            },
            success: () => {
                location.reload(true);
                alert('Patient Data Deleted Successful')
            }
        });
    } 
});

//Read single patients
    $(document).on("click", ".checkPatient", function(e) {
        e.preventDefault();
        let id = $(this).attr("id")
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/patients/${id}`,
            dataType: 'json'
          }).done(data => {
            let add = '<div class="display-data">';
            add += '<div>' + '<span class="data-key">Name:</span>' + '<span>  ' + data.name + '</span></div>'
            add += '<div>' + '<span class="data-key">Address:</span>' + '<span>  ' + data.address + '</span></div>'
            add += '<div>' + '<span class="data-key">Age:</span>' + '<span>  ' + data.age + '</span></div>'
            add += '<div>' + '<span class="data-key">Phone-Number:</span>' + '<span>  ' + data.PhoneNumber + '</span></div>'
            add += '<div>' + '<span class="data-key">Blood-group:</span>' + '<span>  ' + data.bloodGroup + '</span></div>'
            add += '<div>' + '<span class="data-key">Genotype:</span>' + '<span>  ' + data.genotype + '</span></div>'
            add += '</div>'
            $('.disModal').html(add);
          });
    });

//Fetch Patients details for update modal
$(document).on("click", ".updateBtn", function() {
        let id = $(this).attr("id");
        let url = `http://localhost:3000/patients/${id}`;
        $.ajax({
            type: "GET",
            url,
            success: function(data){
                $("input[type='text']#updateName").val(`${data.name}`);
                $("input[type='text']#updateAddress").val(`${data.address}`);
                $("input[type='text']#updateAge").val(`${data.age}`);
                $("input[type='text']#updatePhonenumber").val(`${data.PhoneNumber}`);
                $("input[type='text']#updateBloodGroup").val(`${data.bloodGroup}`);
                $("input[type='text']#updateGenotype").val(`${data.genotype}`);
                $("#updateMe").attr("value", data.id);
            }

        });

//Update patient's data       
    $("#updateMe").on("click", function(e) {
        e.preventDefault();
        let id = $("#updateMe").attr("value");         
        let url = `http://localhost:3000/patients/${id}`;

        let name = $("input[type='text']#updateName").val();
        let address = $("input[type='text']#updateAddress").val();
        let age = $("input[type='text']#updateAge").val();
        let PhoneNumber = $("input[type='text']#updatePhonenumber").val();
        let bloodGroup =  $("input[type='text']#updateBloodGroup").val();
        let genotype = $("input[type='text']#updateGenotype").val();
        let date = new Date().toLocaleDateString("en-US");
        let status = "Check-Out";

        let data = {
          name,
          address,
          age,
          PhoneNumber,
          bloodGroup,
          genotype,
          date,
          status
        } 
      
    $.ajax({
            url: url,
            data: data,
            type: "PUT",
            success: function() {
              console.log(data);
              alert("Patient details updated succefully!");   
            },
            error: () => {
                alert('oopp!.. error something when wrong')
            }
          });
       });
    });
});

//Add patients
$(document).ready(() => {
    let submit = $("#modalbtn");
    submit.click((e) => {
        e.preventDefault();
        let id = sessionStorage.getItem("user");
        
        let name = $('#client-name').val();
        let address = $('#address').val();
        let age = $("#client-age").val();
        let PhoneNumber = $("#phone-number").val();
        let bloodGroup = $('#bloodGroup').val();
        let genotype = $('#genotype').val();
        let date = new Date().toLocaleDateString("en-US");
        let status = "Check-Out";
        let time = "19:06";
       

        let data = { name, address, age, PhoneNumber, bloodGroup, genotype, date, status, time};

    if (name.trim().length < 3) {
        alert("Please enter a valid name");
    } else if (address.trim().length < 3) {
        alert("Please enter a valid address");
    } else if (!(/\w{11,}/g).test(PhoneNumber)) {
        alert("Please enter a valid phone number");
    } else if(isNaN(age) || age < 1 || age > 150){
        alert("The age must be a number between 1 and 150")
    }else {
        $.ajax({
            url: "http://localhost:3000/patients",
            type: 'POST',
            dataType: 'json',
            data: data,
            error: () => {
                alert('error')
            },
            success: (data) => {
                alert(" Patient succesfully created")
            }
        });
      }
    });
});


  


  
