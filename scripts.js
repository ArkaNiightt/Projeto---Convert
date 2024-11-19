let currentRates = {};
let createDates = {};

async function fetchGet() {
    try {
        const response = await fetch(
            "https://economia.awesomeapi.com.br/json/last/USD,EUR,GBP,BTC,DOGE,ETH",
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
            DOGE: parseFloat(data.DOGEBRL.bid),
            ETH: parseFloat(data.ETHBRL.bid),
        };

        createDates = {
            USD: new Date(data.USDBRL.create_date).toLocaleString("pt-BR"),
            EUR: new Date(data.EURBRL.create_date).toLocaleString("pt-BR"),
            GBP: new Date(data.GBPBRL.create_date).toLocaleString("pt-BR"),
            BTC: new Date(data.BTCBRL.create_date).toLocaleString("pt-BR"),
            DOGE: new Date(data.DOGEBRL.create_date).toLocaleString("pt-BR"),
            ETH: new Date(data.ETHBRL.create_date).toLocaleString("pt-BR"),
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
const description_time = document.getElementById("description-time");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números e vírgula/ponto.
amount.oninput = () => {
    const hasCharactersRegex = /[^\d.,]/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
    amount.value = amount.value.replace(",", ".").replace(/(\..*)\./g, "$1");
};

// Capturando o evento de submit no formulário
form.onsubmit = (event) => {
    event.preventDefault();

    if (Object.keys(currentRates).length === 0) {
        alert("As cotações ainda não foram carregadas. Por favor, aguarde.");
        return;
    }

    let createDate;
    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, currentRates.USD, "US$");
            createDate = createDates.USD;
            break;
        case "EUR":
            convertCurrency(amount.value, currentRates.EUR, "€");
            createDate = createDates.EUR;
            break;
        case "GBP":
            convertCurrency(amount.value, currentRates.GBP, "£");
            createDate = createDates.GBP;
            break;
        case "BTC":
            convertCurrency(amount.value, currentRates.BTC, "₿");
            createDate = createDates.BTC;
            break;
        case "DOGE":
            convertCurrency(amount.value, currentRates.DOGE, "Ð");
            createDate = createDates.DOGE;
            break;
        case "ETH":
            convertCurrency(amount.value, currentRates.ETH, "⟠");
            createDate = createDates.ETH;
            break;
        default:
            alert("Moeda inválida.");
            return;
    }

    if (description_time) {
        description_time.textContent = `${createDate}`;
    }
};

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
    try {
        if (!price) {
            throw new Error("Cotação inválida.");
        }
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatToBRL(price)}`;
        let total = parseFloat(amount) * price;

        // Verifica se o resultado não é um número
        if (isNaN(total)) {
            return alert(
                "Por favor, digite o valor corretamente para converter"
            );
        }
        // Exibe o resultado total
        result.textContent = `${formatToBRL(total).replace("R$", "")} Reais`;
        // Aplica a classe que exibe o footer com o resultado
        footer.classList.add("show-result");
    } catch (error) {
        // Remove a classe do footer da tela
        footer.classList.remove("show-result");
        console.error("Erro ao converter a moeda:", error);
        alert("Não foi possível converter. Tente novamente mais tarde.");
    }
}

// Formata a moeda em Real Brasileiro
const formatCurrencyBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

function formatToBRL(value) {
    return formatCurrencyBRL.format(value);
}
