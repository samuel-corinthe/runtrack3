function bisextil (année)
{
    if ((année % 4 === 0 && année % 100 !== 0)|| année % 400 ===0 )
        {
        return true;
    }
    else {
         return false;
    }
    
   
}

alert(bisextil(2026));
