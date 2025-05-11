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



document.addEventListener('DOMContentLoaded', function() {
    // Seletores
    const timelineItems = document.querySelectorAll('.timeline-item');
    const faseCards = document.querySelectorAll('.fase-card');
    const navButtons = document.querySelectorAll('.nav-btn');
    const copyButtons = document.querySelectorAll('.copy-btn');
    const visaoGeralBtn = document.querySelector('.visao-geral-btn');
    
    // Função para mostrar fase específica
    function mostrarFase(targetId) {
        // Atualizar timeline
        timelineItems.forEach(item => {
            if (item.dataset.target === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Atualizar cards
        faseCards.forEach(card => {
            if (card.id === targetId) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
    
    // Navegação pelos itens da timeline
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            mostrarFase(this.dataset.target);
        });
    });
    
    // Navegação pelos botões
    navButtons.forEach(button => {
        if (!button.disabled && button.dataset.target) {
            button.addEventListener('click', function() {
                mostrarFase(this.dataset.target);
                
                // Scroll suave para a seção
                document.getElementById('ciclo-vida').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    });
    
    // Funcionalidade de cópia de código
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block').querySelector('pre');
            const textArea = document.createElement('textarea');
            textArea.value = codeBlock.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Feedback visual
            const originalText = this.textContent;
            this.textContent = '✓ Copiado!';
            this.style.color = '#28a745';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
            }, 2000);
        });
    });
    
    // Visão geral do ciclo
    let visaoGeralAtiva = false;
    visaoGeralBtn.addEventListener('click', function() {
        if (!visaoGeralAtiva) {
            // Mostrar todas as fases
            faseCards.forEach(card => {
                card.classList.add('active');
            });
            
            // Mudar texto do botão
            this.textContent = 'Voltar à visualização normal';
            visaoGeralAtiva = true;
        } else {
            // Mostrar apenas fase ativa
            const activeTimeline = document.querySelector('.timeline-item.active');
            mostrarFase(activeTimeline.dataset.target);
            
            // Restaurar texto do botão
            this.textContent = 'Ver visão geral do ciclo completo';
            visaoGeralAtiva = false;
        }
    });
    
    // Inicialização: mostrar a primeira fase por padrão
    mostrarFase('requisitos');
});