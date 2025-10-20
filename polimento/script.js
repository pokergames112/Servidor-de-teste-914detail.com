document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------------------
    // 1. Lógica do Header Inteligente (Sticky Smart Header)
    // ------------------------------------------
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Se a rolagem atual for maior que a anterior (rolando para baixo)
        if (lastScrollY < window.scrollY && window.scrollY > 150) {
            header.classList.add('hide');
        } 
        // Se a rolagem atual for menor que a anterior (rolando para cima) OU estiver muito no topo
        else if (lastScrollY > window.scrollY) {
            header.classList.remove('hide');
        }
        
        // Atualiza a última posição de rolagem
        lastScrollY = window.scrollY;
    });

    // ------------------------------------------
    // 2. Lógica dos Botões Fixos (Scroll to Top / Voltar)
    // ------------------------------------------
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const backToMainBtn = document.getElementById('backToMainBtn');
    const scrollThreshold = 300; 

    function toggleVisibility() {
        if (window.scrollY > scrollThreshold) {
            // Adiciona a classe 'show' para torná-los visíveis
            scrollToTopBtn.classList.add('show');
            backToMainBtn.classList.add('show');
        } else {
            // Remove a classe 'show' para escondê-los
            scrollToTopBtn.classList.remove('show');
            backToMainBtn.classList.remove('show');
        }
    }

    // Adiciona o evento de scroll para controlar a visibilidade dos botões
    window.addEventListener('scroll', toggleVisibility);

    // Adiciona a funcionalidade de clique para rolar suavemente para o topo
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Chama a função uma vez no carregamento para checar a posição inicial
    toggleVisibility();
});