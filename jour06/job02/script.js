$(function () {
  $('#buyButterfly').on('click', function () {
    $('#modalPapillon').modal('show');
  });

  const quotes = [
    "Tous ces moments se perdront dans l’oubli, comme des larmes dans la pluie.",
    "J’ai vu des choses que vous ne croiriez pas.",
    "Il est temps de mourir.",
    "J'ai fait des choses terribles... mais je vois la beauté du monde."
  ];
  $('#rebootBtn').on('click', function () {
    const i = Math.floor(Math.random() * quotes.length);
    $('#jumboText').text(quotes[i]);
  });

  $('.page-link').on('click', function (e) {
    e.preventDefault();
    const page = $(this).data('page');
    $('#jumboText').text('Coucou n° ' + page + ' de Sam.');
  });

  $('#sinsList .list-group-item').on('click', function (e) {
    e.preventDefault();
    $('#sinsList .list-group-item').removeClass('active');
    $(this).addClass('active');
  });

  let progress = 60;
  function updateProgress() {
    $('#progressBar').css('width', progress + '%').text(progress + '%');
  }
  $('#plus').on('click', function () {
    if (progress < 100) { progress += 10; updateProgress(); }
  });
  $('#minus').on('click', function () {
    if (progress > 0) { progress -= 10; updateProgress(); }
  });

  let keys = [];
  $(document).on('keydown', function (e) {
    keys.push(e.key.toUpperCase());
    if (keys.slice(-3).join('') === 'DGC') {
      const email = $('#formEmailLeft').val();
      const pass = $('#formPasswordLeft').val();
      const url = $('#formUrlLeft').val();
      $('#modalInfos .modal-body').html(
        '<strong>Email :</strong> ' + (email || '(vide)') + '<br>' +
        '<strong>Mot de passe :</strong> ' + (pass || '(vide)') + '<br>' +
        '<strong>URL :</strong> ' + url
      );
      $('#modalInfos').modal('show');
    }
  });

  $('#rightForm').on('submit', function (e) {
    e.preventDefault();
    const email = $('#formEmailRight').val();
    const pass = $('#formPasswordRight').val();
    if (email && pass) {
      const colors = ['text-primary', 'text-success', 'text-danger', 'text-warning', 'text-info'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      $('#spinner').removeClass().addClass('spinner-border spinner-border-sm ' + color);
    }
  });
});
