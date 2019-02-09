// function _(id) {
//   return document.getElementById(id);
// }

// function submitForm() {
//   // var name 		= jQuery(".contact_form #name").val();
//   // var email 		= jQuery(".contact_form #email").val();
//   // var message 	= jQuery(".contact_form #message").val();
//   // var subject 	= jQuery(".contact_form #subject").val();
//   // var success     = jQuery(".contact_form .returnmessage").data('success');
//   // var dataString = 'name='+ name + '&email=' + email + '&message=' + message;

//   console.log("I am in scripts.js");


//   let formdata = new FormData();
//   formdata.append("name", _("name").value);  
//   formdata.append("email", _("email").value);
//   formdata.append("message", _("message").value);
//   let ajax = new XMLHttpRequest();

//   ajax.open("POST", "../src/contactForm/contact.php");
//   ajax.ponreadystatechange = function() {
//     if(ajax.readyState == 4 && ajax.status == 200) {
//      _("contact_form").innerHTML = '<h2>Thanks ' + name + ' your message has been sent. </h2>';
//     } else {
//       _("status").innerHTML = ajax.responseText;
//     }
//   }
//   ajax.send(formdata);
// }