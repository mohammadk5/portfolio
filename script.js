// Modern Skills Animation
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for skill bars animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation delay for skill items in this category
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
                
                // Stop observing this category once animated
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        skillObserver.observe(category);
    });
    
    // Smooth scroll for navigation links
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
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.6
    });
    
    sections.forEach(section => {
        navObserver.observe(section);
    });
});
