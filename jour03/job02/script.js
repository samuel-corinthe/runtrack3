$(function() {

  $("#rainbow").sortable();


  $("#shuffle").click(function() {
    let images = $("#rainbow img").toArray();
    images.sort(() => Math.random() - 0.5);   
    $("#rainbow").empty().append(images);     
    $("#message").text("");                   
  });

  $("#rainbow").on("sortupdate", function() {
    let isCorrect = true;

    $("#rainbow img").each(function(index) {
      if ($(this).data("id") !== index + 1) {
        isCorrect = false;
      }
    });

    if (isCorrect) {
      $("#message").text("Vous avez gagné").css("color", "green");
    } else {
      $("#message").text("Vous avez perdu").css("color", "red");
    }
  });
});
