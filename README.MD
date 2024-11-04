# Aplicativo de Conversão de Moeda

## Visão Geral
Este aplicativo JavaScript permite aos usuários converter entre várias moedas e o Real Brasileiro (BRL). Ele usa a API de conversão de moeda da AwesomeAPI para buscar as taxas de câmbio mais recentes para USD, EUR, GBP e BTC. Os usuários podem inserir um valor e selecionar uma moeda, e o aplicativo fornecerá o valor equivalente em BRL.

## Funcionalidades
- Busca taxas de câmbio em tempo real para USD, EUR, GBP e BTC usando a AwesomeAPI.
- Permite que os usuários insiram um valor em uma moeda estrangeira e o convertam para BRL.
- Exibe a taxa de conversão e o valor calculado em BRL.
- Valida a entrada do usuário para garantir que contenha apenas valores numéricos válidos.

## Tecnologias Utilizadas
- **JavaScript**: Linguagem principal usada para a lógica do aplicativo.
- **HTML & CSS**: HTML e CSS básicos são usados para a interface do usuário.
- **Fetch API**: Usada para fazer requisições HTTP e buscar as taxas de câmbio mais recentes.

## Como Funciona
1. **Busca de Taxas de Câmbio**: A função `fetchGet()` é usada para recuperar as taxas de câmbio para USD, EUR, GBP e BTC. Os dados são armazenados nos objetos `currentRates` e `createDates` para uso posterior.
2. **Validação da Entrada do Usuário**: O aplicativo monitora as mudanças na entrada do usuário (`amount.oninput`) e restringe a entrada a caracteres numéricos válidos (dígitos, vírgulas e pontos).
3. **Envio do Formulário**: Quando o formulário é enviado, a moeda selecionada e o valor são usados para calcular o valor equivalente em BRL. O valor calculado e a taxa de câmbio atual são exibidos ao usuário.
4. **Tratamento de Erros**: Erros durante o processo de busca de dados ou conversão são tratados de forma adequada, exibindo alertas apropriados para o usuário.

## Endpoint da API
O aplicativo busca as taxas de câmbio do seguinte endpoint da API:
```
https://economia.awesomeapi.com.br/json/last/USD,EUR,GBP,BTC
```
- **Moedas**: USD (Dólar dos Estados Unidos), EUR (Euro), GBP (Libra Esterlina), BTC (Bitcoin)

## Funções Principais
- **fetchGet()**: Busca as taxas de câmbio e as armazena nos objetos `currentRates` e `createDates`.
- **convertCurrency(amount, price, symbol)**: Converte o valor inserido para BRL com base na taxa de câmbio fornecida e exibe o resultado.
- **formatToBRL(value)**: Formata um valor para o formato de moeda em Real Brasileiro.

## Instruções de Uso
1. Clone ou baixe o repositório contendo os arquivos HTML, CSS e JavaScript.
2. Abra o arquivo HTML em um navegador.
3. Insira o valor desejado para converter.
4. Selecione uma moeda (USD, EUR, GBP, BTC) no menu suspenso.
5. Clique no botão de conversão para ver o valor em BRL.

## Dependências
- É necessária uma conexão ativa com a internet para buscar as taxas de câmbio em tempo real.

## Exemplo
1. O usuário insere **100** e seleciona **USD**.
2. O aplicativo busca a taxa de câmbio de USD para BRL e exibe o resultado, por exemplo, `US$ 1 = R$ 5,25` e `R$ 525,00 Reais`.

## Tratamento de Erros
- Se a solicitação à API falhar ou se as taxas de câmbio ainda não tiverem sido carregadas, o usuário verá um alerta pedindo para tentar novamente mais tarde.
- Se o usuário inserir um valor inválido, um alerta será exibido solicitando a entrada correta.

## Potenciais Melhorias
- Adicionar suporte para mais moedas.
- Implementar um botão de atualização manual das taxas de câmbio.
- Melhorar o design para uma melhor experiência do usuário.

## Licença
Este projeto está licenciado sob a Licença MIT.

