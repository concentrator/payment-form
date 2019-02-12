import './scss/style.scss';

var error;
var navButton = $('#nav-toggle');
var navList = $('#nav-list');

navButton.on('click', function () {
  navButton.toggleClass('navigation__button--opened');
  navList.toggleClass('navigation__list--opened');
});

var cardNumber = $('#card-form .card-form__input--digit');
var cvv = $('#card-form .card-form__input--cvv');
var cardHolder = $('#card-form .card-form__input--name');

var removeAllExceptDigits = function (input) {
  $(input).val(function(i, val) {
    return val.replace(/\D+/g, '');
  });
}

var validateMinLength = function(min, input) {
  if ($(input).val().length < min) {
    $(input).addClass('card-form__input--invalid');
    error = 1;
  } else {
    $(input).removeClass('card-form__input--invalid');
  }
}

var validate = function () {
  error = 0;

  if (navigator.userAgent.match(/msie/i) ) {

    $(cardNumber).each(function() {
      validateMinLength(4, $(this));
    });
    validateMinLength(4, cardHolder);
    validateMinLength(3, cvv);
  }

  if($('.card-form__input--invalid')) {
    $('.card-form__input--invalid')[0].focus()
    error = 1;
  }
}

$(cardNumber).on('input', function () {
  var input = $(this);
  removeAllExceptDigits(input);
  validateMinLength(4, input);

  if($(this).val().length == $(this).attr('maxlength')) {
    $(this).next('input').focus();
  }
});

$(cvv).on('input', function () {
  var input = $(this);
  removeAllExceptDigits(input);
  validateMinLength(3, input);
});

$(cardHolder).on('input', function () {
  var input = $(this);
  input.val(function(i, val) {
    return val.replace(/[^A-Za-z ]/, '').toUpperCase();
  });
  validateMinLength(4, input);
});

$('#card-form input[required]').each(function () {
  $(this).on('invalid', function(evt) {
    evt.preventDefault();
    $(this).addClass('card-form__input--invalid');
    $('#card-form input:invalid')[0].focus();
  });
});

$('#card-form').on('submit', function (evt) {
  validate();

  if (error === 1) {
    evt.preventDefault();
  }

});
