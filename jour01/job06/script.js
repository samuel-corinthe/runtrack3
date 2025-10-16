function fizzbuzz ()
{
    let jourssemaines = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    for (let i=0; i<=151; i++)
        {
                if (i % 3 === 0 ) {
        console.log("Fizz")
    }
    else if (i % 5 === 0 ) {
        console.log("Buzz")
    }
    else if (i % 5 === 0 && i % 3 === 0 ) {
        console.log("FizzBuzz")
    }
   else {
    console.log(i)
   }
        
    }
}

fizzbuzz ()