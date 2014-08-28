$(function(){

    //escape from iframe in iframe
    if (window != window.top) {
        window.location.replace("home.html");
        return;
    }
    
    //initiate the client
    var oh = Ohmage("/app", "mobilize-navbar");
    var iframe = $("#meta_iframe");    

    //hide on page load
    $("#username-li").hide();
    $("#logoutlink").hide();
    $("#login-li").hide();
    $("#help").hide();

    //logout link
    $("#logoutlink").click(function(e){
        e.preventDefault();
        oh.logout().always(function(){
            window.location.reload()
        })
    });

    //watch iframe changes
    iframe.on("load", function(){
        //update the browser address bar
        location.hash = btoa(iframe[0].contentWindow.location.href);

        //check if user has logged in or out
        updateUserInfo();
    });

    //populate navbar with username
    function updateUserInfo(){
        //retrieve user info
        oh.user.whoami().done(function(name){
            $("#username").text(name);
            $("#user-modal-username").text(name);
            $("#username-li").show();
            $("#login-li").hide();
            $("#logoutlink").show();

            oh.user.read({user_list : name}).done(function(r){
                $("#user-modal-firstname").text(r[name]["first_name"] || "unknown");
                $("#user-modal-lastname").text(r[name]["last_name"] || "unknown");
                $("#user-modal-org").text(r[name]["organization"] || "unknown");
                $("#user-modal-email").text(r[name]["email_address"] || "unknown");
            });
        }).error(function(){
            $("#login-li").show();
        }).always(function(){
            $("#help").show();
        });        
    }
});


/*
$(document).ready(function() {
    $('#ChangePwForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            pw1: {
                validators: {
                    notEmpty: {
                        message: 'Required Field'
                    }
                }
            },
            pw2: {
                validators: {
                    notEmpty: {
                        message: 'Required Field'
                    },
                    stringLength: {
                     message: 'New password must be at least 8 characters',
                     min: 8
                 }
             }
         },
         pw3: {
            validators: {
                notEmpty: {
                    message: 'Required Field'
                },
                identical: {
                    field: 'pw2',
                    message: 'The passwords do not match'
                }   
            }
        }
    }
})
.on('success.form.bv', function(e) {
  e.preventDefault();
  oh.user.password($("#username").text(), $("#pw1").val(), $("#username").text(), $("#pw2").val(), function(res){
     alert("Successfully changed password!");
     $("#ChangePwCollapse").collapse('hide');
     $("#pw1").val('');
     $("#pw2").val('');
     $("#pw3").val('');
     $(".modal .btn").removeAttr("disabled");
 });
});
});
*/