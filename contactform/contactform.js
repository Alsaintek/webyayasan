jQuery(document).ready(function ($) {
  "use strict";

  $("form.contactForm").submit(function (event) {
    event.preventDefault();

    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    var mailtoLink = `mailto:alsaintek@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\n\n" + message
    )}`;

    window.location.href = mailtoLink;
  });
});
