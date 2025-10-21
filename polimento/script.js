document.addEventListener('DOMContentLoaded', function() {
    
    // Configuração de Constantes
    const header = document.querySelector('.header');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const menuMobile = document.querySelector('.menu-mobile');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const backToMainBtn = document.getElementById('backToMainBtn'); 
    const scrollThreshold = 300; 
    let lastScrollY = 0; // Inicializado corretamente

    // --- 0. Funções Utilitárias ---

    // Função para gerenciar o estado do menu mobile
    function toggleMobileMenu(isOpen) {
        if (hamburgerBtn && menuMobile) {
            const shouldOpen = isOpen !== undefined ? isOpen : !menuMobile.classList.contains('active');
            
            menuMobile.classList.toggle('active', shouldOpen);
            hamburgerBtn.classList.toggle('is-open', shouldOpen);
            hamburgerBtn.setAttribute('aria-expanded', shouldOpen);
            
            // Bloqueia/restaura a rolagem do body
            document.body.style.overflow = shouldOpen ? 'hidden' : 'auto';
            
            // Se o menu estiver fechando, garante que o header não esteja escondido (caso o usuário tenha parado de rolar)
            if (!shouldOpen) {
                 header.classList.remove('hide');
            }
        }
    }

    // --- 1. Lógica do MENU HAMBÚRGUER ---
    
    if (hamburgerBtn) {
        // Ação de clique no botão (alterna o estado)
        hamburgerBtn.addEventListener('click', () => {
            toggleMobileMenu();
        });
    }

    if (menuMobile) {
        // Fechar o menu mobile ao clicar em um link interno
        const menuLinks = menuMobile.querySelectorAll('a[href^="#"]');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Fechar o menu imediatamente
                toggleMobileMenu(false); 

                // Lógica de rolagem suave (usando a função melhorada)
                const targetId = link.getAttribute('href').substring(1);
                smoothScroll(targetId);
            });
        });
    }

    // --- 2. Lógica do Header Inteligente (Smart Header) ---
    
    window.addEventListener('scroll', () => {
        // Ignora a lógica se o menu mobile estiver aberto
        if (menuMobile && menuMobile.classList.contains('active')) {
            lastScrollY = window.scrollY; // Atualiza mesmo que ignorando
            return;
        }

        const currentScrollY = window.scrollY;

        // Se rolou para baixo E não está no topo
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            header.classList.add('hide');
        } 
        // Se rolou para cima OU está no topo
        else if (currentScrollY < lastScrollY || currentScrollY <= 150) {
            header.classList.remove('hide');
        }
        
        // Atualiza a última posição de rolagem
        lastScrollY = currentScrollY;
    });

    // --- 3. Lógica dos Links de Rolagem Suave (Links Internos) ---
    
    // Função unificada para rolagem suave (pode ser chamada de dentro do menu mobile também)
    function smoothScroll(targetId) {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Usa scrollIntoView com comportamento suave. 
            // O CSS pode ser ajustado para usar 'scroll-padding-top' no HTML/Body para compensar o header fixo.
            // Para maior compatibilidade (Chrome/Safari), ainda usamos o scrollTo:
            window.scrollTo({
                top: targetElement.offsetTop - (header ? header.offsetHeight : 0) - 20, // Ajuste para altura do header + margem
                behavior: 'smooth'
            });
        }
    }

    const links = document.querySelectorAll('a[href^="#"]:not(.menu-mobile a)'); // Seleciona apenas os links internos que não são do menu mobile

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });


    // --- 4. Lógica dos Botões Fixos (Scroll to Top / Voltar) ---
    
    function toggleVisibility() {
        const isVisible = window.scrollY > scrollThreshold;

        // Simplifica o uso de classes:
        if (scrollToTopBtn) scrollToTopBtn.classList.toggle('show', isVisible);
        // O backToMainBtn está no HTML como link simples, mas pode ser controlado aqui:
        if (backToMainBtn) backToMainBtn.classList.toggle('show', isVisible); 
    }

    // Adiciona o evento de scroll para controlar a visibilidade dos botões
    window.addEventListener('scroll', toggleVisibility);

    // Adiciona a funcionalidade de clique para rolar suavemente para o topo
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Chama a função uma vez no carregamento para checar a posição inicial
    toggleVisibility();

    // --- 5. Atualização do Ano no Footer (Boas Práticas) ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});