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
  $(document).on('click','.suspendeUser', function (e) {
    e.preventDefault();
    var UserId = $(this).attr('attr-user');
    swal({
        title: 'Delete',
        text: 'Suspend User?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Suspend',
        confirmButtonColor: '#d33',
        cancelButtonText: 'Cancel',
      }).then(function(inputValue) {
        if (UserId){
          $.ajax({
            url: '/appuser/suspendUser',
            method: 'POST',
            contentType: 'application/json',
            processData: false,
            data:JSON.stringify({UserId:UserId}),
            success: function(responce){
              if (responce.status == 'logout'){
                window.location.href = '/';
              } else if (responce.status == 'success'){
                swal({
                    title: "Done!",
                    text:  'User Suspended!',
                    type: 'success',
                    allowOutsideClick: false
                }).then(function(inputValue) {
                  window.location.reload();
                });
              } else {
                swal(
                  'Error!',
                  'Error while suspending User',
                  'error'
                );
              }
            },
            error:function () {
              swal(
                'Error!',
                'Error while sustaining User',
                'error'
              );
            }
          })
        } else {
          swal(
            'Error!',
            'Unknown User',
            'error'
          );
        }
      });
  });

  $(document).on('click','.sustainUser', function (e) {
    e.preventDefault();
    var UserId = $(this).attr('attr-user');
    swal({
        title: 'Delete',
        text: 'Sustain User?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sustain',
        cancelButtonText: 'Cancel',
      }).then(function(inputValue) {
        if (UserId){
          $.ajax({
            url: '/appuser/sustainUser',
            method: 'POST',
            contentType: 'application/json',
            processData: false,
            data:JSON.stringify({UserId:UserId}),
            success: function(responce){
              if (responce.status == 'logout'){
                window.location.href = '/';
              } else if (responce.status == 'success'){
                swal({
                    title: "Done!",
                    text:  'User Sustained!',
                    type: 'success',
                    allowOutsideClick: false
                }).then(function(inputValue) {
                  window.location.reload();
                });
              } else {
                swal(
                  'Error!',
                  'Error while sustaining User',
                  'error'
                );
              }
            },
            error:function () {
              swal(
                'Error!',
                'Error while sustaining User',
                'error'
              );
            }
          })
        } else {
          swal(
            'Error!',
            'Unknown User',
            'error'
          );
        }
      });
  });

  $(document).on('click','.extentExpiration', function (e) {
    e.preventDefault();
    var UserId = $(this).attr('attr-user');
    if (UserId){
      swal({
        title: 'Date picker',
        html: '<div id="datepicker"></div>',
        showCancelButton: true,
        cancelButtonText: "Set as expired",
        cancelButtonColor: '#d33',
        onOpen: function() {
        	$('#datepicker').datepicker();
        },
        preConfirm: function() {
          var date_selected = $('#datepicker').datepicker('getDate');
          if (date_selected=='Invalid Date'){
            return Promise.reject('Invalid Date');
          } else if (moment(date_selected).isAfter(moment(),'days')){
            return Promise.resolve(date_selected);
          } else {
            return Promise.reject('Select date after ' + moment().format('DD-MMM-YYYY'));
          }
        }
        }).then(
          function(result) {
            $.ajax({
              url: '/appuser/setExpiration',
              method: 'POST',
              contentType: 'application/json',
              processData: false,
              data:JSON.stringify({UserId:UserId, date:result}),
              success: function(responce){
                if (responce.status == 'logout'){
                  window.location.href = '/';
                } else if (responce.status == 'success'){
                  swal({
                      title: "Done!",
                      text:  'Expiration Extended successfully!',
                      type: 'success',
                      allowOutsideClick: false
                  }).then(function(inputValue) {
                    window.location.reload();
                  });
                } else {
                  swal(
                    'Error!',
                    'Error while expanding expiration date',
                    'error'
                  );
                }
              },
              error:function () {
                swal(
                  'Error!',
                  'Error while expanding expiration date',
                  'error'
                );
              }
            });
          },
          function (err) {
            if (err == 'cancel'){
              swal({
                title: 'Set as Expired',
                text: 'Sure you want to set user status as expired?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#d33',
                cancelButtonText: 'Cancel',
              }).then(function(inputValue) {
                $.ajax({
                  url: '/appuser/setAsExpired',
                  method: 'POST',
                  contentType: 'application/json',
                  processData: false,
                  data:JSON.stringify({UserId:UserId}),
                  success: function(responce){
                    if (responce.status == 'logout'){
                      window.location.href = '/';
                    } else if (responce.status == 'success'){
                      swal({
                          title: "Done!",
                          text:  'Status saved as expired successfully!',
                          type: 'success',
                          allowOutsideClick: false
                      }).then(function(inputValue) {
                        window.location.reload();
                      });
                    } else {
                      swal(
                        'Error!',
                        'Error while updating status',
                        'error'
                      );
                    }
                  },
                  error:function () {
                    swal(
                      'Error!',
                      'Error while updating status',
                      'error'
                    );
                  }
                });
              }, function () {
                swal(
                  'Cancelled',
                  'You did not add anything :)',
                  'error'
                );
              });
            }
          }
        );
    } else {
      swal(
        'Error!',
        'Unknown User',
        'error'
      );
    }
  })

  $(document).on('click', '.deleteCustome', function (e) {
    e.preventDefault();
    var title = (($(this).attr('attr-title')) ? $(this).attr('attr-title') : 'Delete');
    var decription = (($(this).attr('attr-decription')) ? $(this).attr('attr-decription') : 'Are you sure you want to Delete');
    var Finalhref = $(this).attr('attr-href');
    if (Finalhref){
      swal({
        title: title,
        text: decription,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#d33',
        cancelButtonText: 'Cancel',
      }).then(function(inputValue) {
        window.location.href = Finalhref;
      })
    } else {
      swal(
        'Error!',
        'Unknown Script',
        'error'
      );
    }
  });
  $(document).on('ifChecked', '#lang_change', function (e) {
    e.preventDefault();
    $('#overlayLoader').show();
    var text1 = $('#title_news').val();
    text1 = (text1) ? text1 : ''
    var text2 = $('#title_decription').val();
    text2 = (text2) ? text2 : ''
    $.ajax({
      url: '/news/translateToHindi',
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data:JSON.stringify({text1:text1,text2:text2}),
      success: function(responce){
        $('#overlayLoader').hide();
        if (responce.status && responce.status == 'success' && responce.data){
          $('#title_news').val(((responce.data && responce.data.text1) ? responce.data.text1 : ''));
          $('#title_decription').val(((responce.data && responce.data.text2) ? responce.data.text2 : ''));
        } else {
          swal(
            'Error!',
            'Error while convrting text',
            'error'
          );
        }
      },
      error:function () {
        $('#overlayLoader').hide();
        swal(
          'Error!',
          'Error while convrting text',
          'error'
        );
      }
    });
  });
  $(document).on('ifUnchecked', '#lang_change', function (e) {
    e.preventDefault();
    $('#overlayLoader').show();
    var text1 = $('#title_news').val();
    text1 = (text1) ? text1 : ''
    var text2 = $('#title_decription').val();
    text2 = (text2) ? text2 : ''
    $.ajax({
      url: '/news/translateToEnglish',
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data:JSON.stringify({text1:text1,text2:text2}),
      success: function(responce){
        $('#overlayLoader').hide();
        if (responce.status && responce.status == 'success' && responce.data){
          $('#title_news').val(((responce.data && responce.data.text1) ? responce.data.text1 : ''));
          $('#title_decription').val(((responce.data && responce.data.text2) ? responce.data.text2 : ''));
        } else {
          swal(
            'Error!',
            'Error while convrting text',
            'error'
          );
        }
      },
      error:function () {
        $('#overlayLoader').hide();
        swal(
          'Error!',
          'Error while convrting text',
          'error'
        );
      }
    });
  });
});
