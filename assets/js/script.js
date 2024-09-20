const amount = document.querySelector("form input");
const selectFrom = document.querySelector(".from select");
const selectTo = document.querySelector(".to select");
const resultButton = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const rateResult = document.querySelector("form .result");

//

[selectFrom, selectTo].forEach((select, i) => {
    for (let currentCode in Country_List) {
        const selected = (i === 0 && currentCode === "USD") || (i === 1 && currentCode === "GBP") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${currentCode}" ${selected}>${currentCode}</option>`);
    };

    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
});


// função para receber dados da API de taxa de câmbio
async function getExchangeRate() {
    const amountVal = amount.value || 1;
    rateResult.innerText = "Obtendo taxa de câmbio..."
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/45d5734abb271f1f32f3e955/latest/${selectFrom.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[selectTo.value];
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        rateResult.innerText = `${amountVal} ${selectFrom.value} = ${totalExRate} ${selectTo.value}`;

    } catch (error) {
        rateResult.innerText = "algo deu errado";
    };
};

// Eventos para clique no button e no ícone de troca
window.addEventListener("load", getExchangeRate);
resultButton.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});


exIcon.addEventListener("click", () => {
    [selectFrom.value, selectTo.value] = [selectTo.value, selectFrom.value];
    [selectFrom, selectTo].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
    getExchangeRate();
});






