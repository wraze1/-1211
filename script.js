document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = musicBtn.querySelector('i');
    const bgContainer = document.getElementById('bg-container');
    
    // === ЗАПОЛНЕНИЕ ДАННЫХ ИЗ CONFIG.JS ===
    document.getElementById('user-name').textContent = USER_CONFIG.nickname;
    document.getElementById('user-profession').textContent = USER_CONFIG.profession;
    document.getElementById('user-about').textContent = USER_CONFIG.aboutMe;
    
    // Аватарка
    if (USER_CONFIG.avatarUrl) {
        document.getElementById('user-avatar').src = USER_CONFIG.avatarUrl;
        document.getElementById('user-avatar').style.display = 'block';
        document.getElementById('avatar-placeholder').style.display = 'none';
    }

    // Навыки
    const skillsContainer = document.getElementById('user-skills');
    USER_CONFIG.skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill';
        skillDiv.innerHTML = `<i class="fas ${skill.icon}"></i> ${skill.name}`;
        skillsContainer.appendChild(skillDiv);
    });

    // Ссылки
    const linksContainer = document.getElementById('user-links');
    USER_CONFIG.links.forEach(link => {
        const linkEl = document.createElement('a');
        linkEl.className = 'link-item';
        linkEl.href = link.url;
        linkEl.target = '_blank';
        linkEl.innerHTML = `<i class="fab ${link.icon}"></i> <span>${link.name}</span>`;
        linksContainer.appendChild(linkEl);
    });
    // ======================================

    let isPlaying = false;

    // Инициализация Vanilla Tilt
    VanillaTilt.init(document.querySelector(".card"), {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.02,
        gyroscope: false // Отключаем гироскоп, чтобы работал touch-drag
    });

    // Управление музыкой (с поддержкой мобилок)
    function toggleMusic(e) {
        if (e && e.type === 'touchstart') e.preventDefault();
        
        if (isPlaying) {
            audio.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-music');
        } else {
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Браузер блокирует аудио", e));
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-pause');
        }
        isPlaying = !isPlaying;
    }

    musicBtn.addEventListener('click', toggleMusic);
    musicBtn.addEventListener('touchstart', toggleMusic, {passive: false});

    // Генерация частиц (искр), летящих вверх
    setInterval(createParticle, 400);

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Размер
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Позиция по X
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Скорость
        const duration = Math.random() * 10 + 8; // от 8 до 18 секунд
        particle.style.animationDuration = `${duration}s`;
        
        bgContainer.appendChild(particle);

        // Удаление
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
});
