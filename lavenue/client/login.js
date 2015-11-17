Template.Login.events({  
  'submit .login-form': function (event, template) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var $emailInput = $form.find('.email-address-input').eq(0);
    var $passwordInput = $form.find('.password-input').eq(0);

    var emailAddress = $emailInput.val() || '';
    var password = $passwordInput.val() || '';

    //trim
    emailAddress = emailAddress.replace(/^\s*|\s*$/g, '');
    password = password.replace(/^\s*|\s*$/g, '');

    //validate
    var isValidEmail = checkEmailIsValid(emailAddress);
    var isValidPassword = checkPasswordIsValid(password);

    if (!isValidEmail || !isValidPassword) {
      if (!isValidEmail) {
        console.log("Invalid email");
      }
      if (!isValidPassword) {
        console.log("Invalid password, must be at least 8 characters long");
      }
    } else {
      Meteor.loginWithPassword(emailAddress, password, function (error) {
        console.log("Authentication pass. Logging in now...");
        if (error) {
          console.log('Account login failed for unknown reasons :(');
        }
      });
    }
  }
});