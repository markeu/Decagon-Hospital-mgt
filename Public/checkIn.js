//patients check-in/ check-out 

$(document).ready(() => {
    $.ajax({
        method: 'GET',
        url: "http://localhost:3000/patients",
        dataType: 'json'
      }).done(data => {
        $.map(data, patient => {
            if(patient.status === "Check-Out"){
                let add = '<tr>';
                add += '<th scope="row">' + parseInt(data.indexOf(patient) + 1) + '</th>';
                add += '<td>' +  patient.name + '</td>';
                add += '<td>' +  patient.date + '</td>';
                add += '<td>' +  patient.time + '</td>';
                add += '<td>' +  patient.status + '</td>';
                add += '<td class="text-center">' + '<button <a href="#" id="' + patient.id + '" class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm remove  checkInButton" type="button" data-toggle="modal" data-target="#checkInModal">Check-in</button></a>' + '</td>'
                add += '<td class="text-center">' + '<button <a href="#" id="' + patient.id + '" class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm remove main-color-bg  checkInHistory" type="button" data-toggle="modal" data-target="#historyModal">History</button></a>' + '</td>'
                add += '</tr>'; 
                $("#checkIn").attr("value", patient.id);
                $('.append').append(add);
            }else{
                let add = '<tr>';
                add += '<th scope="row">' + parseInt(data.indexOf(patient) + 1) + '</th>';
                add += '<td>' +  patient.name + '</td>';
                add += '<td>' +  patient.date + '</td>';
                add += '<td>' +  patient.time + '</td>';
                add += '<td>' +  patient.status + '</td>';
                add += '<td class="text-center">' + '<button <a href="#" id="' + patient.id + '" class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm remove main-color-bg  checkInButton" type="button" data-toggle="modal" data-target="#checkInModal">Check-out</button></a>' + '</td>'
                add += '<td class="text-center">' + '<button <a href="#" id="' + patient.id + '" class="d-none d-sm-inline btn btn-sm btn-danger shadow-sm remove main-color-bg  checkInHistory" type="button" data-toggle="modal" data-target="#historyModal">History</button></a>' + '</td>'
                add += '</tr>'; 
                $("#checkIn").attr("value", patient.id);
                $('.checkOut').append(add);
            }  
        });
      });
});

$(document).on("click", ".checkInButton", function() {
        let id = $(this).attr("id");
        let url = `http://localhost:3000/patients/${id}`;
        $.ajax({
            type: "GET",
            url,
            success: function(data,){
                $("input[type='text']#checkInName").val(`${data.name}`);
                $("select#checkInStatus").val(`${data.status}`);
                $("input[type='text']#checkInAge").val(`${data.age}`);
                $("input[type='text']#checkInAddress").val(`${data.address}`);
                $("input[type='text']#checkInPhoneNumber").val(`${data.PhoneNumber}`);
                $("input[type='text']#checkInBloodGroup").val(`${data.bloodGroup}`);
                $("input[type='text']#checkInGenotype").val(`${data.genotype}`);
                $("#checkInMe").attr("value", data.id);
            }
        });  

        $("#checkInMe").on("change click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            let id = $("#checkInMe").attr("value");         
            let url = `http://localhost:3000/patients/${id}`;
        
            let name = $("input[type='text']#checkInName").val();
            let date =  $("input[type='date']#checkInDate").val();
            let time =  $("input[type='time']#checkInTime").val();
            let address = $("input[type='text']#checkInAddress").val();
            let age = $("input[type='text']#checkInAge").val();
            let PhoneNumber = $("input[type='text']#checkInPhoneNumber").val();
            let bloodGroup =  $("input[type='text']#checkInBloodGroup").val();
            let genotype = $("input[type='text']#checkInGenotype").val();
            let status =  $("select#checkInStatus").val();
            
            let data = { name, address, age, PhoneNumber, bloodGroup, genotype, date,  time,  status} 
    $.ajax({
            url,
            data,
            type: "PUT",
            success: () => {
                alert("Action successfully done");   
            },
            error: () => {
                alert('oopp!.. error something went wrong')
            }
            });
        });
});

$(document).ready(() => {
    let submit = $("#checkInMe");
    submit.click((e) => {
        e.preventDefault();

        let id = $("#checkInMe").attr("value"); 
        let checkIn_date =  $("input[type='date']#checkInDate").val();
        let checkIn_time =  $("input[type='time']#checkInTime").val();
        let checkOut_time = null;
        let checkOut_date = null;

        let data = { id, checkIn_time, checkIn_date, checkOut_time, checkOut_date };

        $.ajax({
            url: "http://localhost:3000/status",
            type: 'POST',
            dataType: 'json',
            data: data,
            error: () => {
                console.log('error')
            },
            success: (data) => {
                console.log(data)
            }
        });
    });
});

$(document).on("click", ".checkInHistory", function(e) {
    e.preventDefault();
    let id = $(this).attr("id");
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/status/${id}`,
        dataType: 'json'
      }).done(data => {
        let add = '<div class="display-data">';
        add += '<div>' + '<span class="data-key">Id:</span>' + '<span>  ' + data.id + '</span></div>'
        add += '<div>' + '<span class="data-key">Checked-in Time:</span>' + '<span>  ' + data.checkIn_time + '</span></div>'
        add += '<div>' + '<span class="data-key">Checked-in Date:</span>' + '<span>  ' + data.checkIn_date + '</span></div>'
        add += '<div>' + '<span class="data-key">Checked-out Time:</span>' + '<span>  ' + data.checkOut_time + '</span></div>'
        add += '<div>' + '<span class="data-key">Checked-out Date:</span>' + '<span>  ' + data.checkOut_date+ '</span></div>'
        add += '</div>'
        $('.disModalHistory').html(add);
      });
});
     
