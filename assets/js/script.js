$(function () {
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
    $('[data-toggle="tooltip"]').tooltip(); 
    $(".tablesort").DataTable();
  });
});
