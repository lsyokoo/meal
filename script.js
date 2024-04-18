document.addEventListener('DOMContentLoaded', function() {
    const h1Text = 'Healthy Meal Divination!';
    let i = 0;
    const speed = 100; 
    const h1 = document.querySelector('h1');
    const p1 = document.getElementById('instruction');
    const p2 = document.getElementById('instruction2');

    function typeWriter() {
        if (i < h1Text.length) {
            h1.innerHTML += h1Text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);

        } else {
            p1.textContent = 'Enter the name of the food that you want to eat today,';
            p2.textContent = 'we will provide healthy suggestion of recipes for you!';
            p1.classList.add('active');
            p2.classList.add('active');
        }
    }



    typeWriter(); 

    const fetchMealPlans = () => {
        const foodItem = document.getElementById('foodInput').value;
        const apiKey = '458957a366c14e6486bd23fe1fabf2a4'; 
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${foodItem}&addRecipeInformation=true&number=5&apiKey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                document.getElementById("adviceDisplay").style. display = "inline-block";
                displayMealPlans(data);
                document.getElementById("instruction"). innerHTML = "Here are some recommended healty recipies for you!";
                document.getElementById("instruction2"). innerHTML = "CHECK IT OUT!";
                })
                
                .catch(error => console. error('Error:', error));
                };


    const displayMealPlans = (data) => {
        const adviceDiv = document.getElementById('adviceDisplay');
        if (data.results && data.results.length > 0) {
            const mealPlans = data.results.map(recipe => `<div><h3>${recipe.title}</h3><p>${recipe.summary}</p></div>`).join('');
            adviceDiv.innerHTML = mealPlans;
        } else {
            adviceDiv.innerHTML = "Sorry, no meal plans found for this item.";
        }
    };

   
    document.querySelector('button').addEventListener('click', fetchMealPlans);
});



