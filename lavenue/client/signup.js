Template.SignUp.events({  
  'submit .sign-up-form': function (event, template) {
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
      console.log("Creating account...");
      Accounts.createUser({
        email: emailAddress,
        password: password
      }, function (error) {
        if (error) {
          console.log('Account creation failed for unknown reasons :(');
        }
      });
    }
  }
});