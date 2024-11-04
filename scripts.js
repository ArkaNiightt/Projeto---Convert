// Cotação de moedas do dia

const USD = 5.61;
const EUR = 5.32;
const GBP = 7.33;
const BTC = 351100.61;

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Capturando o evento de input para formatar o valor conforme o usuário digita
amount.oninput = () => {
    // Obtém o valor atual do input e remove todos os caracteres não numéricos usando uma expressão regular
    // \D corresponde a qualquer caractere que não seja um dígito e o "g" aplica a remoção globalmente
    let value = amount.value.replace(/\D/g, "");

    // Transforma o valor em centavos (exemplo: 150 se tornará 1.50)
    // Divide o valor numérico por 100 para obter o valor monetário correto
    value = Number(value) / 100;

    // Atualiza o valor do input formatando-o para o padrão da moeda brasileira (R$)
    amount.value = formatCurrencyBRL(value);
};

// Função que formata o valor para o formato de moeda brasileiro (BRL)
function formatCurrencyBRL(value) {
    // Utiliza a função toLocaleString para formatar o valor como moeda BRL
    return value.toLocaleString("pt-BR", {
        style: "currency", // Define o estilo como "currency" (moeda)
        currency: "BRL", // Define a moeda como Real Brasileiro (BRL)
    });
}

// Capturando o evento de submit no formulário
form.onsubmit = (event) => {
    event.preventDefault();

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$");
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€");
            break;

        case "GBP":
            convertCurrency(amount.value, GBP, "£");
            break;
        case "BTC":
            convertCurrency(amount.value, BTC, "₿");
            break;
    }
};

// Função para converter a moeda

function convertCurrency(amount, price, symbol) {
    // console.log(amount, price, symbol)

    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrancyBRL(price)}`;

        let total = amount * price;

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
function formatCurrancyBRL(value) {
    // Converte para número para utilizar o toLocaleString para  formatar no padrão BRL
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
