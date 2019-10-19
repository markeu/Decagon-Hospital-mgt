//Search single patient
$("table").hide();
$(document).ready(() => {
    $("form").submit((event) => {
        event.preventDefault();
        let phoneNumber = $("#phoneNumber").val();

        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/patients',
            success: function (data) {
               for(let i = 0; i < data.length; i++){
                   if(phoneNumber == data[i].PhoneNumber){
                        $("table").show();
                        let add = '<tr>';
                        add += '<th scope="row">' + data[i].id + '</th>';
                        add += '<td>' +  data[i].name + '</td>';
                        add += '<td>' +  data[i].age + '</td>'
                        add += '<td>' +  data[i].address + '</td>'
                        add += '<td>' +  data[i].PhoneNumber + '</td>'
                        add += '<td>' +  data[i].bloodGroup + '</td>'
                        add += '<td>' +  data[i].genotype + '</td>'
                        add += '</tr>'; 
                        $('table tbody').append(add);    
                   }
               }
            }
        });
    });
}); 