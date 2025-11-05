// Handle photo upload (guarded if upload input exists)
const photoInput = document.getElementById('photo-upload');
const photoPreview = document.getElementById('photo-preview');
const photoOverlay = document.querySelector('.photo-overlay-large');

if (photoInput) {
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (photoPreview) {
                    photoPreview.src = e.target.result;
                    photoPreview.classList.add('active');
                }
                if (photoOverlay) {
                    photoOverlay.style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

// Handle project files upload (guarded / may be removed)
const projectFilesInput = document.getElementById('project-files-upload');
const filesList = document.getElementById('files-list');

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getFileIcon(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    const icons = {
        'pdf': '📄',
        'doc': '📝',
        'docx': '📝',
        'xls': '📊',
        'xlsx': '📊',
        'ppt': '📊',
        'pptx': '📊',
        'zip': '📦',
        'rar': '📦',
        'jpg': '🖼️',
        'jpeg': '🖼️',
        'png': '🖼️',
        'gif': '🖼️',
        'cad': '🔧',
        'dwg': '🔧',
        'step': '🔧',
        'stp': '🔧',
        'txt': '📄',
        'csv': '📊'
    };
    return icons[ext] || '📎';
}

function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.dataset.fileName = file.name;
    
    const fileIcon = document.createElement('span');
    fileIcon.className = 'file-icon';
    fileIcon.textContent = getFileIcon(file.name);
    
    const fileInfo = document.createElement('div');
    fileInfo.className = 'file-info';
    
    const fileName = document.createElement('div');
    fileName.className = 'file-name';
    fileName.textContent = file.name;
    
    const fileSize = document.createElement('div');
    fileSize.className = 'file-size';
    fileSize.textContent = formatFileSize(file.size);
    
    fileInfo.appendChild(fileName);
    fileInfo.appendChild(fileSize);
    
    const fileRemove = document.createElement('button');
    fileRemove.className = 'file-remove';
    fileRemove.textContent = '×';
    fileRemove.title = 'Remove file';
    fileRemove.addEventListener('click', function() {
        fileItem.remove();
    });
    
    fileItem.appendChild(fileIcon);
    fileItem.appendChild(fileInfo);
    fileItem.appendChild(fileRemove);
    
    return fileItem;
}

if (projectFilesInput && filesList) {
    projectFilesInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const fileItem = createFileItem(file);
            filesList.appendChild(fileItem);
        });
        
        // Clear the input so the same file can be uploaded again if needed
        e.target.value = '';
    });
}

// Scroll animations - optimized for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Use requestIdleCallback for better scroll performance
const observer = new IntersectionObserver((entries) => {
    // Use requestAnimationFrame to batch updates
    requestAnimationFrame(() => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when scrolling back up for re-animation
                entry.target.classList.remove('visible');
            }
        });
    });
}, observerOptions);

// Observe all sections and animated elements
document.addEventListener('DOMContentLoaded', function() {
    // Observe full sections
    const sections = document.querySelectorAll('.full-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe project items
    const projectItems = document.querySelectorAll('.project-item-large');
    projectItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });

    // Observe education items
    const educationItems = document.querySelectorAll('.education-item-large');
    educationItems.forEach(item => {
        observer.observe(item);
    });

    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category-large');
    skillCategories.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });

    // Observe experience items
    const experienceItems = document.querySelectorAll('.experience-item-large');
    experienceItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });

    // Observe certification items
    const certItems = document.querySelectorAll('.cert-item-large');
    certItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });
    
    // Add scroll animation to ALL text elements (headings, paragraphs, spans, etc.)
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, .project-title-large, .project-description-large, .project-badge-large, .education-title-large, .education-year-large, .skill-category-title-large, .skill-tag-large, .experience-title-large, .experience-description-large, .tech-category-title-large, .tech-tag-large, .about-text-large, .contact-item-large, .resume-link');
    
    textElements.forEach((element, index) => {
        // Skip elements that are already in animated containers or are in hero section
        if (element.closest('.hero-section') || element.classList.contains('letter') || element.closest('.planets-legend')) {
            return;
        }
        
        // Add scroll-animate class
        element.classList.add('scroll-animate');
        
        // Observe with staggered delay for smooth effect
        setTimeout(() => {
            observer.observe(element);
        }, index * 10);
    });
    
    // Ensure About section heading reflects latest copy
    const aboutHeading = document.querySelector('#about .about-text-container .section-heading');
    if (aboutHeading && aboutHeading.textContent.trim() !== 'Who am I?') {
        aboutHeading.textContent = 'Who am I?';
    }
});

// Shooting Star - Appears periodically above the hero section
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // Randomize top position (15% to 25% from top - above "Walid Latif")
    const randomTop = 15 + Math.random() * 10;
    star.style.top = randomTop + '%';
    
    // Randomize animation duration (1.5s to 2.5s)
    const randomDuration = 1.5 + Math.random() * 1;
    star.style.setProperty('--star-duration', randomDuration + 's');
    
    document.body.appendChild(star);
    
    // Trigger animation
    requestAnimationFrame(() => {
        star.classList.add('active');
    });
    
    // Remove star after animation completes
    setTimeout(() => {
        star.remove();
    }, (randomDuration * 1000) + 500);
    
    return star;
}

function spawnShootingStar() {
    // Random spawn interval (5 to 12 seconds)
    const randomDelay = 5000 + Math.random() * 7000;
    
    setTimeout(() => {
        createShootingStar();
        spawnShootingStar(); // Schedule next spawn
    }, randomDelay);
}

// Start spawning shooting stars after page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initial delay before first star spawn (3-6 seconds)
    const initialDelay = 3000 + Math.random() * 3000;
    setTimeout(() => {
        createShootingStar();
        spawnShootingStar();
    }, initialDelay);
});

// Fog cursor follower - creates fog effect that follows cursor
document.addEventListener('DOMContentLoaded', function() {
    // Create stars container
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    
    // Create individual stars with shine effect - create a good amount of stars
    const numStars = 65;
    const starPositions = [];
    
    // Generate random star positions
    for (let i = 0; i < numStars; i++) {
        starPositions.push({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() < 0.7 ? 1 : 2
        });
    }
    
    starPositions.forEach((star, index) => {
        const starElement = document.createElement('div');
        starElement.className = 'star';
        starElement.style.position = 'absolute';
        starElement.style.left = star.x + '%';
        starElement.style.top = star.y + '%';
        starElement.style.width = star.size + 'px';
        starElement.style.height = star.size + 'px';
        starElement.style.borderRadius = '50%';
        starElement.style.background = 'white';
        // No shine animation or box-shadow for stars
        starsContainer.appendChild(starElement);
    });
    
    document.body.appendChild(starsContainer);
    
    // Create shooting star cursor - rebuilt from scratch
    const cursor = document.createElement('div');
    cursor.className = 'shooting-star-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '4px';
    cursor.style.height = '4px';
    cursor.style.background = '#FFFFFF';
    cursor.style.borderRadius = '50%';
    cursor.style.boxShadow = '0 0 8px #FFFFFF, 0 0 16px rgba(255, 255, 255, 0.8), 0 0 24px rgba(255, 255, 255, 0.6)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '99999';
    cursor.style.opacity = '1';
    cursor.style.left = '0px';
    cursor.style.top = '0px';
    document.body.appendChild(cursor);
    
    // Create SVG for curved trail
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'fixed';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100vw';
    svg.style.height = '100vh';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '99998';
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'white');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.style.filter = 'blur(0.5px)';
    path.style.opacity = '0.9';
    svg.appendChild(path);
    
    // Create gradient for trail
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGradient.setAttribute('id', 'trailGradient');
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('x2', '100%');
    linearGradient.setAttribute('y2', '0%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'white');
    stop1.setAttribute('stop-opacity', '0.9');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('stop-color', 'white');
    stop2.setAttribute('stop-opacity', '0.4');
    
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', 'white');
    stop3.setAttribute('stop-opacity', '0');
    
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    linearGradient.appendChild(stop3);
    gradient.appendChild(linearGradient);
    svg.insertBefore(gradient, path);
    
    document.body.appendChild(svg);
    
    // Create fog element
    const fog = document.createElement('div');
    fog.className = 'cursor-fog';
    document.body.appendChild(fog);
    
    // Update viewBox on resize
    window.addEventListener('resize', () => {
        svg.setAttribute('width', window.innerWidth);
        svg.setAttribute('height', window.innerHeight);
        svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    });
    
    // Mouse tracking variables
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let fogX = mouseX;
    let fogY = mouseY;
    const trailPoints = [];
    const maxTrailPoints = 30;
    
    // Track mouse movement - use window instead of document for better coverage
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        fog.classList.add('active');
        cursor.style.opacity = '1';
        
        // Add point to trail
        trailPoints.push({ x: e.clientX, y: e.clientY });
        if (trailPoints.length > maxTrailPoints) {
            trailPoints.shift();
        }
    });
    
    // Smooth animation loop
    function animateCursor() {
        // Smooth interpolation for cursor position
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;
        
        // Update cursor position
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Update curved trail path
        if (trailPoints.length >= 2) {
            // Smooth the trail points
            const smoothedPoints = [];
            for (let i = 0; i < trailPoints.length; i++) {
                if (i === 0) {
                    smoothedPoints.push(trailPoints[i]);
                } else {
                    const prev = smoothedPoints[smoothedPoints.length - 1];
                    const current = trailPoints[i];
                    smoothedPoints.push({
                        x: prev.x + (current.x - prev.x) * 0.2,
                        y: prev.y + (current.y - prev.y) * 0.2
                    });
                }
            }
            
            // Create smooth curved path using cubic bezier curves
            let pathData = `M ${smoothedPoints[0].x} ${smoothedPoints[0].y}`;
            
            if (smoothedPoints.length === 2) {
                pathData += ` L ${smoothedPoints[1].x} ${smoothedPoints[1].y}`;
            } else if (smoothedPoints.length > 2) {
                for (let i = 1; i < smoothedPoints.length; i++) {
                    const prev = smoothedPoints[i - 1];
                    const current = smoothedPoints[i];
                    const next = smoothedPoints[i + 1] || current;
                    
                    const tension = 0.3;
                    const cp1x = prev.x + (current.x - prev.x) * (1 - tension);
                    const cp1y = prev.y + (current.y - prev.y) * (1 - tension);
                    const cp2x = current.x - (next.x - current.x) * tension;
                    const cp2y = current.y - (next.y - current.y) * tension;
                    
                    pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${current.x} ${current.y}`;
                }
            }
            
            path.setAttribute('d', pathData);
            path.setAttribute('stroke', 'url(#trailGradient)');
        }
        
        // Smooth interpolation for fog
        fogX += (mouseX - fogX) * 0.1;
        fogY += (mouseY - fogY) * 0.1;
        fog.style.left = fogX + 'px';
        fog.style.top = fogY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // Initialize cursor position
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // Start animation
    animateCursor();
    
    // Hide/show cursor on mouse leave/enter
    window.addEventListener('mouseleave', () => {
        fog.classList.remove('active');
        cursor.style.opacity = '0';
    });
    
    window.addEventListener('mouseenter', () => {
        fog.classList.add('active');
        cursor.style.opacity = '1';
    });
});

// Letter floating animation
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;
    
    // Wrap each letter (and space) in a span
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Non-breaking space
        heroTitle.appendChild(span);
    }
    
    const letters = heroTitle.querySelectorAll('.letter');
    
    // Function to trigger floating animation on a random letter
    function triggerFloatingAnimation() {
        // Only animate non-space letters
        const nonSpaceLetters = Array.from(letters).filter((letter) => {
            return letter.textContent.trim() !== '';
        });
        
        if (nonSpaceLetters.length < 2) return; // Need at least 2 letters
        
        // Pick a random letter (not the first or last)
        const randomIndex = Math.floor(Math.random() * (nonSpaceLetters.length - 2)) + 1;
        const floatingLetter = nonSpaceLetters[randomIndex];
        
        // Find the adjacent letter (prefer left, but can be right if it's the first)
        let adjacentLetter = null;
        const floatingIndex = Array.from(letters).indexOf(floatingLetter);
        
        // Try to find left neighbor first
        for (let i = floatingIndex - 1; i >= 0; i--) {
            if (letters[i].textContent.trim() !== '') {
                adjacentLetter = letters[i];
                break;
            }
        }
        
        // If no left neighbor, find right neighbor
        if (!adjacentLetter) {
            for (let i = floatingIndex + 1; i < letters.length; i++) {
                if (letters[i].textContent.trim() !== '') {
                    adjacentLetter = letters[i];
                    break;
                }
            }
        }
        
        if (!adjacentLetter) return;
        
        // Trigger animations
        floatingLetter.classList.add('floating');
        adjacentLetter.classList.add('pulling');
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            floatingLetter.classList.remove('floating');
            adjacentLetter.classList.remove('pulling');
        }, 1500);
    }
    
    // Trigger animation randomly every 4-8 seconds
    function scheduleNextAnimation() {
        const delay = 4000 + Math.random() * 4000; // 4-8 seconds
        setTimeout(() => {
            triggerFloatingAnimation();
            scheduleNextAnimation(); // Schedule next animation
        }, delay);
    }
    
    // Start the first animation after a short delay
    setTimeout(() => {
        scheduleNextAnimation();
    }, 2000);
});

// Dramatic opening animation
document.addEventListener('DOMContentLoaded', function() {
    // Add fade overlay
    const fadeOverlay = document.createElement('div');
    fadeOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        z-index: 9999;
        opacity: 1;
        transition: opacity 1.5s ease-out;
        pointer-events: none;
    `;
    document.body.appendChild(fadeOverlay);
    
    // Fade out overlay after a delay
    setTimeout(() => {
        fadeOverlay.style.opacity = '0';
        setTimeout(() => {
            fadeOverlay.remove();
        }, 1500);
    }, 500);
    
});

// Orbiting Planets Navigation
document.addEventListener('DOMContentLoaded', function() {
    const planets = document.querySelectorAll('.planet');
    let activePlanet = null;

    planets.forEach(planet => {
        planet.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);

            if (targetSection) {
                // Remove active class from previously active planet
                if (activePlanet && activePlanet !== this) {
                    activePlanet.classList.remove('active');
                }

                // Add active class to clicked planet
                this.classList.add('active');
                activePlanet = this;

                // Smooth scroll to section
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Remove active class after animation
                setTimeout(() => {
                    if (this === activePlanet) {
                        this.classList.remove('active');
                        activePlanet = null;
                    }
                }, 2000);
            }
        });
    });

    // Hide planets and legend when scrolled past hero section
    function updatePlanetVisibility() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const planetsContainer = document.querySelector('.planets-container');
        
        if (planetsContainer) {
            if (scrollY > windowHeight * 0.5) {
                planetsContainer.style.opacity = '0';
                planetsContainer.style.pointerEvents = 'none';
                document.body.classList.add('scrolled');
            } else {
                planetsContainer.style.opacity = '1';
                planetsContainer.style.pointerEvents = 'auto';
                document.body.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', updatePlanetVisibility);
    updatePlanetVisibility();
});

