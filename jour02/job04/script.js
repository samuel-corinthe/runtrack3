    const keylogger = document.getElementById("keylogger");

    document.addEventListener("keydown", (event) => { if ((event.key >= 'a' && event.key <='z') || (event.key >= 'A' && event.key <='Z') && event.key.length===1 ) {keylogger.value += event.key;}});


