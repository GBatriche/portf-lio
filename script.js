// Seleciona o botão de menu mobile e o menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');
const backToTopButton = document.getElementById('back-to-top');

// Adiciona um ouvinte de evento de clique ao botão de menu mobile
mobileMenuButton.addEventListener('click', () => {
    // Alterna a classe 'hidden' no menu mobile para mostrá-lo/escondê-lo
    mobileMenu.classList.toggle('hidden');
});

// Adiciona ouvinte de evento de clique para links de navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do link

        // Fecha o menu mobile se estiver aberto
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }

        // Obtém o elemento de destino usando o href do link
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Calcula a posição de rolagem ajustada para a barra de navegação fixa
        const navbarHeight = navbar.offsetHeight;
        const offsetTop = targetElement.offsetTop - navbarHeight;

        // Rola suavemente para o elemento de destino
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// Mostra ou esconde o botão de voltar ao topo
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Rola para o topo da página quando o botão é clicado
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Adiciona sombra à navbar ao rolar
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('shadow-xl');
    } else {
        navbar.classList.remove('shadow-xl');
    }
});

// Animações de entrada para as seções
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // A seção será observada quando 10% dela estiver visível
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Quando a seção entra na viewport, ativa as animações
            entry.target.querySelectorAll('.animate-fade-in-down, .animate-fade-in-up').forEach(element => {
                element.style.animationPlayState = 'running';
            });
            observer.unobserve(entry.target); // Para de observar depois de animar
        }
    });
}, observerOptions);

// Observa cada seção para ativar suas animações
sections.forEach(section => {
    sectionObserver.observe(section);
});
