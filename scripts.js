let currentRates = {};

async function fetchGet() {
    try {
        const response = await fetch(
            "https://economia.awesomeapi.com.br/json/last/USD,EUR,GBP,BTC",
            {
                method: "GET",
            }
        );

        const data = await response.json();
        currentRates = {
            USD: parseFloat(data.USDBRL.bid),
            EUR: parseFloat(data.EURBRL.bid),
            GBP: parseFloat(data.GBPBRL.bid),
            BTC: parseFloat(data.BTCBRL.bid),
        };
    } catch (error) {
        console.error("Erro ao buscar as cotações:", error);
        alert(
            "Não foi possível buscar as cotações. Tente novamente mais tarde."
        );
    }
}

fetchGet();

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números e vírgula/ponto.
amount.oninput = () => {
    const hasCharactersRegex = /[^\d.,]/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
    amount.value = amount.value.replace(",", ".");
};

// Capturando o evento de submit no formulário
form.onsubmit = (event) => {
    event.preventDefault();

    if (Object.keys(currentRates).length === 0) {
        alert("As cotações ainda não foram carregadas. Por favor, aguarde.");
        return;
    }

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, currentRates.USD, "US$");
            break;
        case "EUR":
            convertCurrency(amount.value, currentRates.EUR, "€");
            break;
        case "GBP":
            convertCurrency(amount.value, currentRates.GBP, "£");
            break;
        case "BTC":
            convertCurrency(amount.value, currentRates.BTC, "₿");
            break;
    }
};

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrancyBRL(price)}`;

        let total = parseFloat(amount) * price;

        // Verifica se o resultado não é um número
        if (isNaN(total)) {
            return alert(
                "Por favor, digite o valor corretamente para converter"
            );
        }
        // Exibe o resultado total
        result.textContent = `${formatCurrancyBRL(total).replace(
            "R$",
            ""
        )} Reais`;
        // Aplica a classe que exibe o footer com o resultado
        footer.classList.add("show-result");
    } catch (error) {
        // Remove a classe do footer da tela
        footer.classList.remove("show-result");
        console.log(error);
        alert("Não foi possível converter. Tente novamente mais tarde.");
    }
}

// Formata a moeda em Real Brasileiro
const formatCurrencyBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

function formatCurrancyBRL(value) {
    return formatCurrencyBRL.format(value);
}
