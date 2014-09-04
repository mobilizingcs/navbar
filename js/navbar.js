if (window != window.top) {
    //escape from iframe in iframe
    window.location.replace("home.html");
} else if(window.location.search.replace(/^[?]/, "")) {
    //steven's hacky nginx redirects
    window.location.hash = window.location.search.replace(/^[?]/, "");
    window.location.search = ""; //this triggers a page refresh
} else {
    //load the actual page
    $(function(){

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
            if(localStorage["survey-responses"]){
                if( window.confirm("Logging out will delete existing survey responses you have in your upload queue. Do you want to continue?") ){
                    delete localStorage["survey-responses"];
                } else {
                    return;
                }
            }
            oh.logout().always(function(){
                window.location.reload();
            })
        });

        var state = window.location.hash.replace(/^#/,"")
        var homepath = $("<a>").attr("href", iframe.attr("src"))[0].pathname;
        if(state) {
            //always map #foo to #/navbar/foo
            iframe.attr("src", "/navbar/" + state)
        }

        //watch iframe changes
        iframe.on("load", function(){
            //update the browser address bar
            //map /navbar/foo back to #foo
            var newloc = iframe[0].contentWindow.location.pathname.replace(/^\/?navbar\//,"");
            if(newloc == homepath){
                location.hash = "";
            } else {
                location.hash = newloc;
            }

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

                //the change password modal
                $('#ChangePwForm').bootstrapValidator({
                    message: 'This value is not valid',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        pw1: { validators: {
                            notEmpty: { message: 'Required Field' }
                        }},
                        pw2: { validators: {
                            notEmpty: { message: 'Required Field' },
                            stringLength: { message: 'New password must be at least 8 characters', min: 8 }
                        }},
                        pw3: {
                        validators: {
                            notEmpty: { message: 'Required Field' },
                            identical: { field: 'pw2', message: 'The passwords do not match' }
                        }}
                    }
                }).on('success.form.bv', function(e) {
                    e.preventDefault();
                    updatePassword();
                });

                //function to update password
                function updatePassword(){
                   oh.user.change_password({
                        user : name,
                        username : name,
                        password : $("#pw1").val(),
                        new_password : $("#pw2").val()
                    }).done(function(){
                        alert("Successfully changed password!");
                         $("#ChangePwCollapse").collapse('hide');
                         $("#pw1").val('');
                         $("#pw2").val('');
                         $("#pw3").val('');
                         $(".modal .btn").removeAttr("disabled");
                    }).error(function(msg){
                        alert("error: " + msg)
                    });
                }
            }).error(function(){
                //if user is not logged in, show login link
                $("#login-li").show();
            }).always(function(){
                $("#help").show();
            });
        }
    });
}
