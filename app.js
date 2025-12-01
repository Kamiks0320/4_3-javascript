const categoriesURL = "http://localhost:3000/jokebook/categories";
const jokeURL = "http://localhost:3000/jokebook/joke/";

const buttonCat = document.getElementById("buttonCat");
const buttonJoke = document.getElementById("buttonJoke");

const outCategory = document.getElementById("outCategory");
const outJoke = document.getElementById("outJoke");

const input = document.getElementById("input");

buttonCat.addEventListener("click", async () => 
{
    fetch(categoriesURL)
        .then((response) => response.json())
        .then((data) => 
        {
            if (data && data.length > 0) outCategory.innerHTML = data.map((category) => `<div>${category}</div>`).join("");
            else outCategory.innerHTML = `<p>Brak kategorii.</p>`;
        })
        .catch(() => 
        {
            outCategory.innerHTML = "<p>Błąd przy pobieraniu kategorii</p>";
        });
});

buttonJoke.addEventListener("click", async () => 
{
    const category = input.value.trim();

    if (!category) 
    {
        outJoke.innerHTML = "<p>Wpisz kategorię żartu.</p>";
        return;
    }

    fetch(jokeURL + category)
        .then((res) => res.json())
        .then((data) => {
            if (data && data.joke) {
                outJoke.innerHTML = `
                <div>Kategoria: ${category}</div>
                <div>${data.joke}</div>
                <div>${data.response}</div>
                `;
            } 
            else outJoke.innerHTML = `<p>Brak żartów w tej kategorii.</p>`;
        })
        .catch(() => 
        {
            outJoke.innerHTML = "<p>Błąd przy pobieraniu żartu.</p>";
        });
});