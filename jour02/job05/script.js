const myfoo = document.getElementById('myfoo');

window.addEventListener('scroll', () =>{
    if (window.scrollY >= 500 && window.scrollY < 1000) {
        myfoo.style.background = 'red';
    } 
    
    else if (window.scrollY >= 1000 && window.scrollY < 1500) {
        myfoo.style.background = 'orange';
    }
    
    else if (window.scrollY >= 1500 && window.scrollY < 2000) {
        myfoo.style.background = 'yellow';
    }
    
    else if (window.scrollY >= 2000 && window.scrollY < 2500) {
        myfoo.style.background = 'blue';
    }
    else if
    (window.scrollY >= 2500) {
        myfoo.style.background = 'green';
    }
    else {
        myfoo.style.background = 'black';
    }

    ;
});



