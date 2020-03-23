function saveprocess()
{
 let fieldvalue={
   fullname:$('#txtfullname').val(),
   email:$('#txtemail').val(),
   mobile:$('#txtphone').val(),
   id:$('#hfid').val()
 }
 $.ajax({
    url: "/insert",
    data: JSON.stringify(fieldvalue),
    type: 'POST',
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (data) {
     
     cleardata()
     getlist()
     alert(data.message)
     
    },
    error: function (errormessage) {

       //alert( JSON.stringify(errormessage));
    }

});
return false
}


// A $( document ).ready() block.
$( document ).ready(function() {
getlist();
});

function getlist()
{
  $.ajax({
    url:'/list',
    type:'get',
    success: function (result) {
     $('#gvlist tbody').empty('')
     $.each(result.data,function(i,v){
        var row = '<tr><td>' + v.sno + '</td>' +
        '<td><label>' + v.fullname + '</label></td>' +
        '<td><label>' + v.email + '</label></td>' +
        '<td><label>' + v.mobile + '</label></td>' +
        '<td><input type="button" value="Edit" onclick="edit('+ v.id+')"  class="btn btn-sm btn-primary">&nbsp;&nbsp;<input type="button" onclick="deletedata('+ v.id+')" value="Delete"  class="btn btn-sm btn-danger"></td>'
       '<tr/>'
         $('#gvlist tbody').append(row);
      })
    },
    error: function (errormessage) {

        toastr.error(errormessage.responseText);
    }
  })
}
function edit(id)
{
  $.ajax({
    url:'/edit/'+id,
    type:'get',
    success: function (result) {
      $('#txtfullname').val(result.fullname)
  $('#txtemail').val(result.email)
  $('#txtphone').val(result.mobile)
  $('#hfid').val(result.id)
    },
    error: function (errormessage) {

        toastr.error(errormessage.responseText);
    }
  }) 
}
function deletedata(id)
{
$.ajax({
    url:'/delete/'+id,
    type:'put',
    success: function (result) {
      getlist();
    },
    error: function (errormessage) {

        toastr.error(errormessage.responseText);
    }
  }) 

}
function cleardata()
{
  $('#txtfullname').val('')
  $('#txtemail').val('')
  $('#txtphone').val('')
  $('#hfid').val('')
}