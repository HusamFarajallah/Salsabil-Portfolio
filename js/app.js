// Typing Animation
const typingText = document.querySelector('.typing-text');
const typingCursor = document.querySelector('.typing-cursor');
const words = ['مصممة واجهات مستخدم', 'مطورة تجربة مستخدم', 'مصممة UI/UX'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100; // Typing speed in milliseconds

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Delete character
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        // Type character
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing speed
    }

    // Check if word is complete
    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at end of word
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, typeSpeed);
}

// Start typing animation when the page loads
if (typingText) {
    setTimeout(type, 1000); // Start after 1 second
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.querySelector('i').classList.toggle('fa-bars');
        mobileMenuButton.querySelector('i').classList.toggle('fa-times');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#!') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('i').classList.remove('fa-times');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
            }
            
            // Calculate the target position with offset for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update URL without adding to history
            history.pushState(null, null, targetId);
        }
    });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    let scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`nav a[href*=${sectionId}]`).classList.add('text-purple-600');
            document.querySelector(`nav a[href*=${sectionId}]`).classList.remove('text-gray-700');
        } else {
            const navLink = document.querySelector(`nav a[href*=${sectionId}]`);
            if (navLink) {
                navLink.classList.remove('text-purple-600');
                navLink.classList.add('text-gray-700');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

// Smooth scroll to top
backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
}

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('bg-purple-600', 'text-white'));
        filterButtons.forEach(btn => btn.classList.add('bg-gray-100', 'text-gray-700'));
        
        // Add active class to clicked button
        button.classList.remove('bg-gray-100', 'text-gray-700');
        button.classList.add('bg-purple-600', 'text-white');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                item.style.display = 'block';
                // Add animation class
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
        successMessage.setAttribute('role', 'alert');
        successMessage.innerHTML = `
            <strong class="font-bold">تم الإرسال بنجاح!</strong>
            <span class="block sm:inline">شكراً لتواصلك معي. سأرد عليك في أقرب وقت ممكن.</span>
        `;
        
        const formContainer = document.querySelector('.form-container');
        formContainer.appendChild(successMessage);
        
        // Reset form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Animate skills on scroll
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.parentElement.getAttribute('data-percent');
        bar.style.width = width;
    });
};

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
            
            // Animate skills when skills section is in view
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, observerOptions);

// Observe all sections with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(section => {
    observer.observe(section);
});

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.project-overlay').style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.project-overlay').style.opacity = '0';
    });
});
