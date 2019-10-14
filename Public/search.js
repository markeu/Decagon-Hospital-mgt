//Search single patient
$("table").hide();
$(document).ready(() => {
    $("form").submit((event) => {
        event.preventDefault();
        let phoneNumber = $("#phoneNumber").val();
       
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/patients?phoneNumber=${phoneNumber}`,
            success: function (data, patient) {
                console.log(data)
                $("table").show();
                let add = '<tr>';
                add += '<th scope="row">' + data[0].id + '</th>';
                add += '<td>' +  data[0].name + '</td>';
                add += '<td>' +  data[0].age + '</td>'
                add += '<td>' +  data[0].address + '</td>'
                add += '<td>' +  data[0].PhoneNumber + '</td>'
                add += '<td>' +  data[0].bloodGroup + '</td>'
                add += '<td>' +  data[0].genotype + '</td>'
                add += '</tr>'; 
 
                $('table tbody').append(add);
            }
        });
    });
}); 