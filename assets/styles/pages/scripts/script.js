// Menu Toggle para dispositivos móveis
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Rolagem suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os itens da timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const faseCards = document.querySelectorAll('.fase-card');
    
    // Adicionar evento de clique a cada item da timeline
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover classe active de todos os itens
            timelineItems.forEach(i => i.classList.remove('active'));
            faseCards.forEach(card => card.classList.remove('active'));
            
            // Adicionar classe active ao item clicado
            this.classList.add('active');
            
            // Mostrar o card correspondente
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
});