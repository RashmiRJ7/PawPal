// Heart Icon Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all heart icons
    const heartIcons = document.querySelectorAll('.heart-icon');
    
    // Add click event listener to each heart
    heartIcons.forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle the 'active' class
            this.classList.toggle('active');
            
            // Optional: Add a small bounce animation
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Optional: Store favorites in localStorage
            const petId = this.getAttribute('data-pet');
            toggleFavorite(petId);
        });
    });
    
    // Load saved favorites on page load
    loadFavorites();
});

// Function to toggle favorite status
function toggleFavorite(petId) {
    // Get existing favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if pet is already in favorites
    const index = favorites.indexOf(petId);
    
    if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
    } else {
        // Add to favorites
        favorites.push(petId);
    }
    
    // Save back to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to load favorites on page load
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    favorites.forEach(petId => {
        const heart = document.querySelector(`[data-pet="${petId}"]`);
        if (heart) {
            heart.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Quiz form validation (optional enhancement)
const quizForm = document.getElementById('quizForm');
if (quizForm) {
    quizForm.addEventListener('submit', function(e) {
        const vibe = document.querySelector('input[name="vibe"]:checked');
        const home = document.querySelector('input[name="home"]:checked');
        const time = document.querySelector('input[name="time"]:checked');
        
        if (!vibe || !home || !time) {
            e.preventDefault();
            alert('Please answer all questions before finding your match!');
        }
    });
}