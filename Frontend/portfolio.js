let portfolioData = [];
const investmentList = document.getElementById("investment-list");

function displayPortfolio() {
    investmentList.innerHTML = "";

    portfolioData.forEach((investment) => {
        const item = document.createElement("li");
        item.textContent = `Ativo: ${investment.symbol} | Quantidade: ${investment.quantity} | Preço Médio: $${investment.avgPrice.toFixed(2)} | Data de Compra: ${investment.addDate}`;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.className = "delete-button";

        item.appendChild(deleteButton);
        investmentList.appendChild(item);
    });
}

function addInvestment() {
    const symbolInput = document.getElementById("symbol").value.trim();
    const quantityInput = parseFloat(document.getElementById("quantity").value);
    const avgPriceInput = parseFloat(document.getElementById("avg-price").value);
    const purchaseDateInput = document.getElementById("purchase-date").value;

    if (symbolInput === '' || isNaN(quantityInput) || isNaN(avgPriceInput) || purchaseDateInput === '') {
        alert("Por favor, preencha todos os campos com valores válidos.");
        return;
    }

    portfolioData.push({
        symbol: symbolInput,
        quantity: quantityInput,
        avgPrice: avgPriceInput,
        addDate: purchaseDateInput,
    });

    displayPortfolio();
    saveData();
    resetAddInvestmentForm();
}

function resetAddInvestmentForm() {
    document.getElementById("symbol").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("avg-price").value = "";
    document.getElementById("purchase-date").value = "";
}

function deleteInvestment(index) {
    portfolioData.splice(index, 1);
    displayPortfolio();
    saveData();
}

document.getElementById("submit-investment-btn").addEventListener("click", addInvestment);

investmentList.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("delete-button")) {
        const listItem = e.target.parentNode;
        const index = Array.from(listItem.parentNode.children).indexOf(listItem);
        if (index >= 0) {
            deleteInvestment(index);
        }
    }
});

function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

function loadSavedData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        portfolioData = JSON.parse(savedData);
        displayPortfolio();
    }
}

loadSavedData();
