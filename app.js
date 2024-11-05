// Definindo os itens por categoria
const itensPorCategoria = {
    limpeza: ["Sabão", "Detergente", "Álcool"],
    alimentacao: ["Arroz", "Feijão", "Leite"],
    utilidades: ["Papel Toalha", "Lâmpada", "Pilha"]
};

document.addEventListener("DOMContentLoaded", () => {
    const categoriaSelect = document.getElementById("categoria");
    const itensContainer = document.getElementById("itens-container");
    const itensLista = document.getElementById("itens-lista");
    const adicionarItensBtn = document.getElementById("adicionar-itens");
    const listaItensSelecionados = document.getElementById("lista-itens-selecionados");
    const escreverItemBtn = document.getElementById("escreverItemBtn");
    const itemPersonalizadoInput = document.getElementById("itemPersonalizado");

    // Carrega itens salvos ao abrir a página
    carregarItensSalvos();

    // Exibe itens da categoria selecionada
    categoriaSelect.addEventListener("change", () => {
        const categoria = categoriaSelect.value;
        itensLista.innerHTML = ""; // Limpa itens anteriores

        if (categoria && itensPorCategoria[categoria]) {
            itensContainer.style.display = "block"; // Mostra o container dos itens

            // Adiciona checkboxes para cada item da categoria
            itensPorCategoria[categoria].forEach(item => {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = item;
                checkbox.id = item;

                const label = document.createElement("label");
                label.htmlFor = item;
                label.textContent = item;

                const div = document.createElement("div");
                div.appendChild(checkbox);
                div.appendChild(label);
                itensLista.appendChild(div);
            });
        } else {
            itensContainer.style.display = "none"; // Oculta o container se nenhuma categoria for selecionada
        }
    });

    // Exibe o campo de entrada para um item personalizado
    escreverItemBtn.addEventListener("click", () => {
        itemPersonalizadoInput.style.display = "inline-block"; // Exibe o campo de texto
        itemPersonalizadoInput.focus(); // Foca no campo para digitação
    });

    // Adiciona itens selecionados e personalizados à lista
    adicionarItensBtn.addEventListener("click", () => {
        const checkboxes = itensLista.querySelectorAll("input[type=checkbox]:checked");
        checkboxes.forEach(checkbox => {
            adicionarItemSelecionado(checkbox.value);
        });

        // Adiciona o item personalizado se houver texto digitado
        const itemPersonalizado = itemPersonalizadoInput.value.trim();
        if (itemPersonalizado) {
            adicionarItemSelecionado(itemPersonalizado);
            itemPersonalizadoInput.value = ""; // Limpa o campo de entrada
            itemPersonalizadoInput.style.display = "none"; // Oculta o campo novamente
        }

        salvarItens(); // Salva todos os itens no localStorage
    });

    // Função para adicionar item à lista selecionada e criar o botão de exclusão
    function adicionarItemSelecionado(item) {
        const li = document.createElement("li");
        li.textContent = item;

        const removerBtn = document.createElement("button");
        removerBtn.textContent = "Excluir";
        removerBtn.addEventListener("click", () => {
            li.remove();
            salvarItens();
        });

        li.appendChild(removerBtn);
        listaItensSelecionados.appendChild(li);
    }

    // Salva itens no localStorage
    function salvarItens() {
        const itens = [];
        listaItensSelecionados.querySelectorAll("li").forEach(li => {
            itens.push(li.childNodes[0].textContent);
        });
        localStorage.setItem("itensSelecionados", JSON.stringify(itens));
    }

    // Carrega itens salvos do localStorage
    function carregarItensSalvos() {
        const itensSalvos = JSON.parse(localStorage.getItem("itensSelecionados")) || [];
        itensSalvos.forEach(item => adicionarItemSelecionado(item));
    }
});
