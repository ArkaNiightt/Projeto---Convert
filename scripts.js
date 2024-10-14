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

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

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

    let total = amount * price

    // Verifica se o resultado não é um número
    if (isNaN(total)) {
        return alert("Por favor, digite o valor corretamente para converter")        
    }
    // Exibe o resultado total
    result.textContent = `${formatCurrancyBRL(total).replace("R$", "")} Reais`
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
