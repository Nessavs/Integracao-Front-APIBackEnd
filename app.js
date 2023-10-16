function searchMakeupProducts() {
    const brand = document.getElementById("brand").value;
    const productType = document.getElementById("productType").value;
    const priceGreaterThan = document.getElementById("priceGreaterThan").value;

    //Parametros para pesquisa
    let apiUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";
    const queryParams = [];

    if (brand) {
        queryParams.push(`brand=${brand}`);
    }
    if (productType) {
        queryParams.push(`product_type=${productType}`);
    }
    if (priceGreaterThan) {
        queryParams.push(`price_greater_than=${priceGreaterThan}`);
    }

    if (queryParams.length > 0) {
        apiUrl += "?" + queryParams.join("&");
    }

    // Solicitação na API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => console.error(error));
}

function displayResults(data) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Limpa os resultados anteriores

    if (data.length === 0) {
        resultsContainer.innerHTML = "Nenhum resultado encontrado.";
    } else {
        data.forEach(product => {
            const productInfo = document.createElement("div");
            productInfo.innerHTML = `
                <h2>${product.name}</h2>
                <p>Marca: ${product.brand}</p>
                <p>Tipo de Produto: ${product.product_type}</p>
                <p>Preço: ${product.price}</p>
            `;
            resultsContainer.appendChild(productInfo);
        });
    }
}
