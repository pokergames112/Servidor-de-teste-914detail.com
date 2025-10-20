document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE ROLAGEM SUAVE E LINKS INTERNOS ---
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Permite que links de WhatsApp passem direto
            if (!this.getAttribute('href').startsWith('#')) {
                return; 
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Rola suavemente para o elemento, compensando o header fixo
                window.scrollTo({
                    top: targetElement.offsetTop - 100, 
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- LÓGICA DO HEADER INTELIGENTE (SMART HEADER) ---
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > 80) {
            // Rolar para baixo
            if (currentScroll > lastScrollTop) {
                header.classList.add('hidden');
            } 
            // Rolar para cima
            else if (currentScroll < lastScrollTop) {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('hidden');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false); 
    
    // --- LÓGICA DO BOTÃO VOLTAR AO TOPO ---
    const scrollBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 1. INICIALIZAÇÃO DO CARROSSEL DE SERVIÇOS (COM NAVEGAÇÃO/SETAS) ---
    new Swiper(".mySwiper", {
        loop: true, 
        autoplay: {
            delay: 8000, // Aumentei o delay para melhor leitura
            disableOnInteraction: false, 
        },
        speed: 1000, 
        
        // ADICIONADO: Configuração das setas de navegação
        navigation: {
            nextEl: ".mySwiper .swiper-button-next",
            prevEl: ".mySwiper .swiper-button-prev",
        },
        
        slidesPerView: 2, 
        slidesPerColumn: 2, 
        spaceBetween: 20, 

        // Responsividade para Serviços (5 colunas, 2 linhas no desktop)
        breakpoints: {
            320: {
                slidesPerView: 1, 
                slidesPerColumn: 1, 
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2, 
                slidesPerColumn: 2, 
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 5, 
                slidesPerColumn: 2,
                spaceBetween: 30,
            },
        },
    });


    // --- 2. INICIALIZAÇÃO DO CARROSSEL DE PACOTES EXCLUSIVOS (COM NAVEGAÇÃO/SETAS) ---
    new Swiper(".mySwiperPacotes", {
        loop: true, 
        autoplay: {
            delay: 8000, // Aumentei o delay para melhor leitura
            disableOnInteraction: false, 
        },
        speed: 1000, 
        
        // ADICIONADO: Configuração das setas de navegação
        navigation: {
            nextEl: ".mySwiperPacotes .swiper-button-next",
            prevEl: ".mySwiperPacotes .swiper-button-prev",
        },
        
        slidesPerView: 1, 
        slidesPerColumn: 1, 
        spaceBetween: 30, 
        
        // Responsividade para Pacotes (3 colunas, 1 linha no desktop)
        breakpoints: {
            320: {
                slidesPerView: 1, 
                slidesPerColumn: 1, 
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2, 
                slidesPerColumn: 1, 
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3, 
                slidesPerColumn: 1,
                spaceBetween: 30,
            },
        },
    });
    
    
    // --- 3. INICIALIZAÇÃO DO CARROSSEL DE AVALIAÇÕES (Original) ---
    // Aumentei a responsividade no mobile estreito para 1 slide por vez.
    new Swiper(".mySwiperReviews", {
        loop: true, 
        autoplay: {
            delay: 5000, // Aumentei o delay para melhor leitura
            disableOnInteraction: false, 
        },
        speed: 800, 
        slidesPerView: 2, // Padrão 2 no desktop
        spaceBetween: 30, 

        pagination: {
            el: ".swiper-pagination", // Padrão Swiper (garantindo que funcione com o HTML modificado)
            clickable: true,
        },
        
        // Responsividade: 1 slide no mobile estreito, 2 nos tablets e desktop
        breakpoints: {
            320: {
                slidesPerView: 1, 
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2, 
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 2, 
                spaceBetween: 30,
            },
        },
    });


    // --- LÓGICA DO MODAL (LEIA MAIS) ---
    const modalContainer = document.getElementById('modal-container');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalWhatsappLink = document.getElementById('modal-whatsapp-link');
    const leiaMaisButtons = document.querySelectorAll('.btn-leia-mais');

    // Função para abrir o modal
    const openModal = (titulo, descricao) => {
        modalTitle.innerHTML = titulo;
        modalDescription.innerHTML = descricao;
        // O link do WhatsApp já está no HTML (o botão "AGENDAR" dentro do modal)
        modalContainer.style.display = 'flex'; 
        document.body.style.overflow = 'hidden'; // Bloqueia a rolagem do body
    };

    // Função para fechar o modal
    const closeModal = () => {
        modalContainer.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura a rolagem do body
    };

    // 1. Adicionar evento de clique para todos os botões "Leia Mais"
    leiaMaisButtons.forEach(button => {
        button.addEventListener('click', () => {
            const titulo = button.getAttribute('data-titulo');
            const descricao = button.getAttribute('data-descricao'); 
            openModal(titulo, descricao);
        });
    });

    // 2. Adicionar evento de clique para o botão de fechar (X)
    modalClose.addEventListener('click', closeModal);

    // 3. Adicionar evento de clique no fundo (fora do modal) para fechar
    modalContainer.addEventListener('click', (e) => {
        // Verifica se o clique foi diretamente no container (e não no conteúdo)
        if (e.target === modalContainer) {
            closeModal();
        }
    });
    
    // 4. Fechar com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.style.display === 'flex') {
            closeModal();
        }
    });

    // --- LÓGICA DO DROPDOWN PARA MOBILE (TOQUE) ---
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = document.querySelector('.dropdown-btn');

    if (dropdown && dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Impede a ação padrão do botão
            
            // Alterna a classe 'active' para mostrar/esconder o menu
            dropdown.classList.toggle('active');
            
            // Se o menu estiver visível, fecha ao clicar fora
            if (dropdown.classList.contains('active')) {
                document.addEventListener('click', closeDropdownOutside);
            } else {
                document.removeEventListener('click', closeDropdownOutside);
            }
        });

        const closeDropdownOutside = (e) => {
            // Verifica se o clique não foi no dropdown e nem dentro dele
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                document.removeEventListener('click', closeDropdownOutside);
            }
        };
    }
    // FIM DA LÓGICA DO DROPDOWN

});