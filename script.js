// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 2000);
    });

    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.width = '25px';
        cursor.style.height = '25px';
        cursor.style.borderColor = 'var(--color-primary-dark)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.borderColor = 'var(--color-primary)';
    });
    
    // Add hover effect to links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .accordion-header, .tab-btn, .slider-arrow, .dot');
    
    interactiveElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.borderColor = 'var(--color-primary-dark)';
            cursorDot.style.backgroundColor = 'var(--color-primary-dark)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderColor = 'var(--color-primary)';
            cursorDot.style.backgroundColor = 'var(--color-primary)';
        });
    });

    // Mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    mobileMenuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    tabButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            tabPanels.forEach(function(panel) {
                panel.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            tabPanels[index].classList.add('active');
            
            // Move indicator
            if (window.innerWidth > 576) {
                tabIndicator.style.transform = `translateX(${index * 100}%)`;
            }
        });
    });

    // Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(function(item) {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(function(accItem) {
                accItem.classList.remove('active');
                accItem.querySelector('.accordion-content').style.maxHeight = '0';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Reviews slider
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    let cardWidth = 0;
    let cardsPerView = 3;
    
    function updateSliderLayout() {
        if (window.innerWidth < 768) {
            cardsPerView = 1;
        } else if (window.innerWidth < 1200) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        
        cardWidth = reviewsTrack.parentElement.offsetWidth / cardsPerView;
        
        reviewCards.forEach(function(card) {
            card.style.minWidth = `${cardWidth - 20}px`;
        });
        
        updateSlider();
    }
    
    function updateSlider() {
        reviewsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        dots.forEach(function(dot, index) {
            dot.classList.remove('active');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
        });
    }
    
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentIndex < reviewCards.length - cardsPerView) {
            currentIndex++;
            updateSlider();
        }
    });
    
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    window.addEventListener('resize', updateSliderLayout);
    updateSliderLayout();

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Countdown timer
    const countdownDays = document.getElementById('countdown-days');
    const countdownHours = document.getElementById('countdown-hours');
    const countdownMinutes = document.getElementById('countdown-minutes');
    const countdownSeconds = document.getElementById('countdown-seconds');
    
    // Set the countdown date (3 days from now)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownDays.textContent = days.toString().padStart(2, '0');
        countdownHours.textContent = hours.toString().padStart(2, '0');
        countdownMinutes.textContent = minutes.toString().padStart(2, '0');
        countdownSeconds.textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Video modal
    const playButton = document.querySelector('.play-button');
    
    playButton.addEventListener('click', function() {
        alert('Видео демонстрации будет доступно после покупки.');
    });

    // Current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .review-card, .stat-card');
    
    function checkScroll() {
        animateElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    animateElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Particle effect in hero section
    function createParticles() {
        const heroSection = document.querySelector('.hero');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        
        heroSection.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add particle styles
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }
        
        .particle {
            position: absolute;
            background-color: var(--color-primary);
            border-radius: 50%;
            opacity: 0.3;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(particleStyles);
    createParticles();
});