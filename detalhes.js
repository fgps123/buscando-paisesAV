document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const countryCode = urlParams.get("codigo"); // Pegando código do país pela URL

    if (countryCode) {
        try {
            // Fazendo a requisição para obter os dados do país
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            const countryData = await response.json();
            const country = countryData[0];

            // Atualizando os elementos HTML com os dados do país
            document.getElementById("nomeOficial").textContent = country.name.official;
            document.getElementById("bandeira").src = country.flags.png;
            document.getElementById("bandeira").alt = `Bandeira de ${country.name.common}`;
            document.getElementById("capital").textContent = country.capital ? country.capital[0] : "Não disponível";
            document.getElementById("continente").textContent = country.continents ? country.continents[0] : "Não disponível";
            document.getElementById("lingua").textContent = country.languages ? Object.values(country.languages).join(", ") : "Não disponível";
            document.getElementById("moeda").textContent = country.currencies 
                ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(", ") 
                : "Não disponível";
            document.getElementById("populacao").textContent = country.population.toLocaleString();
            document.getElementById("area").textContent = country.area.toLocaleString() + " km²";
            document.getElementById("mapsLink").href = country.maps.googleMaps;

        } catch (error) {
            console.error("Erro ao buscar dados do país:", error);
            alert("Erro ao buscar dados do país. Por favor, tente novamente mais tarde.");
        }
    } else {
        alert("Nenhum país selecionado!");
        window.location.href = "index.html";
    }
});
