console.log('ok 1');


$(document).ready(function () {
  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 50000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  $.ajax({
    type: "GET",
    url: "https://api.covid19api.com/summary",
    header: { "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864" },
    data: "data",
    dataType: "JSON",
    success: function (response) {
      let global = response.Global;
      console.log(global);
      $("#total").text(global.TotalConfirmed).addClass("count");
      $("#deaths").text(global.TotalDeaths).addClass("count");
      $("#recovered").text(global.TotalRecovered).addClass("count");
    },
  });
});

$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 50000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

function checkPassword(form) { 
  password1 = form.password.value; 
  password2 = form.confPass.value; 

  // If password not entered 
  if (password1 == '') 
      alert ("Please enter Password"); 
        
  // If confirm password not entered 
  else if (password2 == '') 
      alert ("Please enter confirm password"); 
        
  // If Not same return False.     
  else if (password1 != password2) { 
      alert ("Password did not match: Please try again.") 
      return false; 
  } 
  // If same return True. 
  else{ 
      alert("Password Match: Welcome to COVIDNOW") 
      return true; 
  } 
} 
