function showhide()
{
    const boutton = document.querySelector("#button");
    const citation = document.querySelector("#citation");

    citation.style.visibility = 'hidden';

    boutton.addEventListener("click", () => { 
        if (citation.style.visibility === 'hidden')
             {
                citation.style.visibility = 'visible';
            }
             else 
                {
                    citation.style.visibility = 'hidden';
                }

    });
}
showhide();