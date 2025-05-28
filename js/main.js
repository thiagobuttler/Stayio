const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (event) => {
    const value = formatString(event.target.value);
    // Seleciona *todos* os elementos que são as colunas (divs com classes col-*)
    const columns = document.querySelectorAll('.main-content .results > .row > [class*="col-"]');

    columns.forEach(column => {
        // Dentro de cada coluna, encontra o card .property
        const property = column.querySelector('.property');
        
        // Verifica se o card e o elemento de localização existem dentro desta coluna
        if (property) {
            const locationElement = property.querySelector('.property-location h6');
            
            if (locationElement) {
                const locationText = formatString(locationElement.textContent);

                // Se o texto da localização do card (dentro desta coluna) contiver o valor de pesquisa
                if (locationText.includes(value)) {
                    // Remove a classe 'd-none' para que a coluna seja mostrada
                    column.classList.remove('d-none');
                } else {
                    // Adiciona a classe 'd-none' para esconder a coluna inteira
                    column.classList.add('d-none');
                }
            } else {
                // Se não encontrar o elemento de localização no card, esconde a coluna por segurança
                column.classList.add('d-none');
            }
        } else {
            // Se a coluna não contiver um card .property, esconde a coluna por segurança (improvável, mas bom ter)
            column.classList.add('d-none');
        }
    });
});

function formatString(value) {
    return value
        .toLowerCase()
        .trim();
}

$('input[data-toggle="toggle"]').bootstrapToggle({
    onlabel: '',
    offlabel: '',
});
