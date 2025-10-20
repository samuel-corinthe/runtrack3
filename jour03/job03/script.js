$(function() {
  const taille = 3;
  let vide = { x: 2, y: 2 };

  function initJeu() {
    const $cases = $("#taquin .case").toArray();
    $cases.sort(() => Math.random() - 0.5);
    $("#taquin").empty().append($cases);

    $("#taquin .case").each(function(i) {
      const x = i % taille, y = Math.floor(i / taille);
      $(this).attr({ "data-x": x, "data-y": y });
      if ($(this).hasClass("vide")) vide = { x, y };
    });

    $("#message").text("").css("color", "");
    $("#restart").hide();
    majCliquables();
  }

  function majCliquables() {
    $(".case").removeClass("cliquable").filter(function() {
      const x = +$(this).data("x"), y = +$(this).data("y");
      return (Math.abs(x - vide.x) === 1 && y === vide.y) ||
             (Math.abs(y - vide.y) === 1 && x === vide.x);
    }).addClass("cliquable");
  }

  $(document).on("click", ".cliquable", function() {
    const x = +$(this).data("x"), y = +$(this).data("y");
    const temp = { ...vide };
    vide = { x, y };

    const $cases = $("#taquin .case").toArray();
    const thisIndex = y * taille + x, videIndex = temp.y * taille + temp.x;
    [$cases[thisIndex], $cases[videIndex]] = [$cases[videIndex], $cases[thisIndex]];
    $("#taquin").empty().append($cases);

    $(this).attr({ "data-x": temp.x, "data-y": temp.y });
    $(".vide").attr({ "data-x": x, "data-y": y });
    majCliquables();
    checkWin();
  });

  function checkWin() {
    const gagne = $("#taquin .case").toArray().every((el, i) => $(el).data("pos") === i || $(el).hasClass("vide"));
    if (gagne) {
      $("#message").text("Vous avez gagné 🎉").css("color", "green");
      $(".case").removeClass("cliquable").css("pointer-events", "none");
      $("#restart").show();
    }
  }

  $("#restart").click(initJeu);
  initJeu();
});
