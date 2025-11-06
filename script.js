// photo upload handler
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

// project files upload handler
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
        
        // clear input so same file can be uploaded again
        e.target.value = '';
    });
}

// scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// intersection observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    requestAnimationFrame(() => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // remove visible class when scrolling back up for re-animation
                entry.target.classList.remove('visible');
            }
        });
    });
}, observerOptions);

// observe all sections and animated elements
document.addEventListener('DOMContentLoaded', function() {
    // observe full sections
    const sections = document.querySelectorAll('.full-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // observe project items
    const projectItems = document.querySelectorAll('.project-item-large');
    projectItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });

    // observe education items
    const educationItems = document.querySelectorAll('.education-item-large');
    educationItems.forEach(item => {
        observer.observe(item);
    });

    // observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category-large');
    skillCategories.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });

    // observe experience items
    const experienceItems = document.querySelectorAll('.experience-item-large');
    experienceItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });

    // observe certification items
    const certItems = document.querySelectorAll('.cert-item-large');
    certItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });
    
    // add scroll animation to all text elements
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, .project-title-large, .project-description-large, .project-badge-large, .education-title-large, .education-year-large, .skill-category-title-large, .skill-tag-large, .experience-title-large, .experience-description-large, .tech-category-title-large, .tech-tag-large, .about-text-large, .contact-item-large, .resume-link');
    
    textElements.forEach((element, index) => {
        // skip elements in hero section or already animated
        if (element.closest('.hero-section') || element.classList.contains('letter') || element.closest('.planets-legend')) {
            return;
        }
        
        // add scroll-animate class
        element.classList.add('scroll-animate');
        
        // observe with staggered delay
        setTimeout(() => {
            observer.observe(element);
        }, index * 10);
    });
    
    // ensure about section heading is correct
    const aboutHeading = document.querySelector('#about .about-text-container .section-heading');
    if (aboutHeading && aboutHeading.textContent.trim() !== 'Who am I?') {
        aboutHeading.textContent = 'Who am I?';
    }
});

// shooting star that appears periodically above hero section
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // randomize top position (15-25% from top)
    const randomTop = 15 + Math.random() * 10;
    star.style.top = randomTop + '%';
    
    // randomize animation duration (1.5-2.5s)
    const randomDuration = 1.5 + Math.random() * 1;
    star.style.setProperty('--star-duration', randomDuration + 's');
    
    document.body.appendChild(star);
    
    // trigger animation
    requestAnimationFrame(() => {
        star.classList.add('active');
    });
    
    // remove star after animation completes
    setTimeout(() => {
        star.remove();
    }, (randomDuration * 1000) + 500);
    
    return star;
}

function spawnShootingStar() {
    // random spawn interval (5-12 seconds)
    const randomDelay = 5000 + Math.random() * 7000;
    
    setTimeout(() => {
        createShootingStar();
        spawnShootingStar(); // schedule next spawn
    }, randomDelay);
}

// start spawning shooting stars after page loads
document.addEventListener('DOMContentLoaded', function() {
    // initial delay before first star spawn (3-6 seconds)
    const initialDelay = 3000 + Math.random() * 3000;
    setTimeout(() => {
        createShootingStar();
        spawnShootingStar();
    }, initialDelay);
});

// fog cursor follower - creates fog effect that follows cursor
document.addEventListener('DOMContentLoaded', function() {
    // create stars container
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    
    // create individual stars
    const numStars = 65;
    const starPositions = [];
    
    // generate random star positions
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
        // no shine animation for stars
        starsContainer.appendChild(starElement);
    });
    
    document.body.appendChild(starsContainer);
    
    // create shooting star cursor
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
    
    // create svg for curved trail
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
    
    // create gradient for trail
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
    
    // create fog element
    const fog = document.createElement('div');
    fog.className = 'cursor-fog';
    document.body.appendChild(fog);
    
    // update viewbox on resize
    window.addEventListener('resize', () => {
        svg.setAttribute('width', window.innerWidth);
        svg.setAttribute('height', window.innerHeight);
        svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    });
    
    // mouse tracking variables
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let fogX = mouseX;
    let fogY = mouseY;
    const trailPoints = [];
    const maxTrailPoints = 30;
    
    // track mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        fog.classList.add('active');
        cursor.style.opacity = '1';
        
        // add point to trail
        trailPoints.push({ x: e.clientX, y: e.clientY });
        if (trailPoints.length > maxTrailPoints) {
            trailPoints.shift();
        }
    });
    
    // smooth animation loop
    function animateCursor() {
        // smooth interpolation for cursor position
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;
        
        // update cursor position
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // update curved trail path
        if (trailPoints.length >= 2) {
            // smooth the trail points
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
            
            // create smooth curved path using cubic bezier curves
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
        
        // smooth interpolation for fog
        fogX += (mouseX - fogX) * 0.1;
        fogY += (mouseY - fogY) * 0.1;
        fog.style.left = fogX + 'px';
        fog.style.top = fogY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // initialize cursor position
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // start animation
    animateCursor();
    
    // hide/show cursor on mouse leave/enter
    window.addEventListener('mouseleave', () => {
        fog.classList.remove('active');
        cursor.style.opacity = '0';
    });
    
    window.addEventListener('mouseenter', () => {
        fog.classList.add('active');
        cursor.style.opacity = '1';
    });
});

// letter floating animation
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;
    
    // wrap each letter in a span
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // non-breaking space
        heroTitle.appendChild(span);
    }
    
    const letters = heroTitle.querySelectorAll('.letter');
    
    // trigger floating animation on a random letter
    function triggerFloatingAnimation() {
        // only animate non-space letters
        const nonSpaceLetters = Array.from(letters).filter((letter) => {
            return letter.textContent.trim() !== '';
        });
        
        if (nonSpaceLetters.length < 2) return; // need at least 2 letters
        
        // pick a random letter (not first or last)
        const randomIndex = Math.floor(Math.random() * (nonSpaceLetters.length - 2)) + 1;
        const floatingLetter = nonSpaceLetters[randomIndex];
        
        // find adjacent letter (prefer left, can be right if first)
        let adjacentLetter = null;
        const floatingIndex = Array.from(letters).indexOf(floatingLetter);
        
        // try to find left neighbor first
        for (let i = floatingIndex - 1; i >= 0; i--) {
            if (letters[i].textContent.trim() !== '') {
                adjacentLetter = letters[i];
                break;
            }
        }
        
        // if no left neighbor, find right neighbor
        if (!adjacentLetter) {
            for (let i = floatingIndex + 1; i < letters.length; i++) {
                if (letters[i].textContent.trim() !== '') {
                    adjacentLetter = letters[i];
                    break;
                }
            }
        }
        
        if (!adjacentLetter) return;
        
        // trigger animations
        floatingLetter.classList.add('floating');
        adjacentLetter.classList.add('pulling');
        
        // remove animation classes after animation completes
        setTimeout(() => {
            floatingLetter.classList.remove('floating');
            adjacentLetter.classList.remove('pulling');
        }, 1500);
    }
    
    // trigger animation randomly every 4-8 seconds
    function scheduleNextAnimation() {
        const delay = 4000 + Math.random() * 4000; // 4-8 seconds
        setTimeout(() => {
            triggerFloatingAnimation();
            scheduleNextAnimation(); // schedule next animation
        }, delay);
    }
    
    // start first animation after short delay
    setTimeout(() => {
        scheduleNextAnimation();
    }, 2000);
});

// dramatic opening animation
document.addEventListener('DOMContentLoaded', function() {
    // add fade overlay
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
    
    // fade out overlay after delay
    setTimeout(() => {
        fadeOverlay.style.opacity = '0';
        setTimeout(() => {
            fadeOverlay.remove();
        }, 1500);
    }, 500);
    
});

// orbiting planets navigation
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
                // remove active class from previously active planet
                if (activePlanet && activePlanet !== this) {
                    activePlanet.classList.remove('active');
                }

                // add active class to clicked planet
                this.classList.add('active');
                activePlanet = this;

                // smooth scroll to section
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // remove active class after animation
                setTimeout(() => {
                    if (this === activePlanet) {
                        this.classList.remove('active');
                        activePlanet = null;
                    }
                }, 2000);
            }
        });
    });

    // hide planets and legend when scrolled past hero section
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

// fun arrow typing animation (repeating)
document.addEventListener('DOMContentLoaded', function() {
    const arrowContainer = document.querySelector('.fun-arrow-container');
    const arrowText = document.querySelector('.arrow-text');
    const arrowPath = document.querySelector('.arrow-path');
    const arrowHead = document.querySelector('.arrow-head');
    
    if (!arrowContainer || !arrowText || !arrowPath || !arrowHead) return;
    
    const fullText = 'really cool guy btw';
    
    function resetAnimation() {
        // reset all elements
        arrowContainer.classList.remove('animate');
        arrowText.classList.remove('typing');
        arrowText.textContent = '';
        arrowPath.style.strokeDashoffset = '200';
        arrowHead.style.opacity = '0';
        arrowContainer.style.opacity = '0';
    }
    
    function playAnimation() {
        resetAnimation();
        
        // force reflow
        void arrowContainer.offsetWidth;
        
        // start animation
        arrowContainer.classList.add('animate');
        arrowText.classList.add('typing');
        
        // start typing animation when arrow path is drawn (after 1.7s total)
        setTimeout(() => {
            let currentIndex = 0;
            
            function typeNextChar() {
                if (currentIndex < fullText.length) {
                    arrowText.textContent = fullText.substring(0, currentIndex + 1);
                    currentIndex++;
                    setTimeout(typeNextChar, 80); // 80ms per character
                }
            }
            
            typeNextChar();
        }, 1700);
        
        // fade out after typing completes
        const typingTime = fullText.length * 80;
        setTimeout(() => {
            arrowContainer.style.opacity = '0';
            arrowContainer.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                arrowContainer.style.transition = '';
            }, 500);
        }, 1700 + typingTime + 1000);
    }
    
    // check if about section is visible
    function checkAndPlay() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;
        
        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && arrowContainer.style.opacity === '0' || !arrowContainer.classList.contains('animate')) {
            // only play if not already animating
            if (!arrowContainer.classList.contains('animate')) {
                playAnimation();
            }
        }
    }
    
    // initial check
    setTimeout(checkAndPlay, 1000);
    
    // repeat animation every 8-10 seconds
    function scheduleNextAnimation() {
        const delay = 8000 + Math.random() * 2000; // 8-10 seconds
        setTimeout(() => {
            checkAndPlay();
            scheduleNextAnimation();
        }, delay);
    }
    
    // start scheduling after initial animation
    setTimeout(scheduleNextAnimation, 9000);
    
    // also check on scroll
    window.addEventListener('scroll', checkAndPlay);
});

// draw connecting lines for journey timeline
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.journey-timeline');
    if (!timeline) return;
    
    const items = [
        document.querySelector('.journey-item-1'),
        document.querySelector('.journey-item-2'),
        document.querySelector('.journey-item-3'),
        document.querySelector('.journey-item-4')
    ];
    
    if (items.some(item => !item)) return;
    
    function drawLines() {
        const svg = timeline.querySelector('.journey-lines');
        if (!svg) return;
        
        // get positions of each image (center points)
        const positions = items.map(item => {
            const rect = item.getBoundingClientRect();
            const timelineRect = timeline.getBoundingClientRect();
            return {
                x: (rect.left + rect.width / 2 - timelineRect.left) / timelineRect.width * 100,
                y: (rect.top + rect.height / 2 - timelineRect.top) / timelineRect.height * 100
            };
        });
        
        // create path connecting all points
        let path = `M ${positions[0].x} ${positions[0].y}`;
        for (let i = 1; i < positions.length; i++) {
            const prev = positions[i - 1];
            const curr = positions[i];
            // create curved path with control points
            const midX = (prev.x + curr.x) / 2;
            const midY = (prev.y + curr.y) / 2;
            // add some wiggle
            const wiggleX = (i % 2 === 0) ? 5 : -5;
            path += ` Q ${midX + wiggleX} ${midY} ${curr.x} ${curr.y}`;
        }
        
        const line = svg.querySelector('.journey-line');
        if (line) {
            line.setAttribute('d', path);
        }
    }
    
    // draw lines after images load
    setTimeout(drawLines, 100);
    window.addEventListener('resize', drawLines);
});

// journey photo click descriptions
document.addEventListener('DOMContentLoaded', function() {
    // type out "click on the pictures" instruction
    const clickInstruction = document.querySelector('.click-instruction');
    if (clickInstruction) {
        const instructionText = 'click on the pictures';
        clickInstruction.textContent = '';
        clickInstruction.classList.add('typing');
        
        setTimeout(() => {
            let currentIndex = 0;
            function typeNextChar() {
                if (currentIndex < instructionText.length) {
                    clickInstruction.textContent = instructionText.substring(0, currentIndex + 1);
                    currentIndex++;
                    setTimeout(typeNextChar, 80);
                }
            }
            typeNextChar();
        }, 1000);
    }
    
    // descriptions for each image (top-left=journey-item-1, etc.)
    const descriptions = {
        'journey-item-1': "i liked nutella sandwiches", // top-left
        'journey-item-2': "i grew up loving basketball, still play sometimes... let's 1v1", // second position
        'journey-item-3': "idk how i didn't make provincials", // third position
        'journey-item-4': "i've been getting into building more personal arduino projects, ill add those to here soon..." // fourth position
    };
    
    // add click handlers to each journey card
    const journeyItems = document.querySelectorAll('.journey-item');
    
    journeyItems.forEach(item => {
        const card = item.querySelector('.journey-card');
        const cardText = item.querySelector('.journey-card-text');
        
        if (!card || !cardText) return;
        
        card.addEventListener('click', function() {
            const itemClass = Array.from(item.classList).find(cls => cls.startsWith('journey-item-'));
            if (!itemClass) return;
            
            const description = descriptions[itemClass];
            if (!description) return;
            
            // toggle flip
            const isFlipped = card.classList.contains('flipped');
            
            if (isFlipped) {
                // flip back to front
                card.classList.remove('flipped');
                cardText.classList.remove('typing');
                cardText.textContent = '';
            } else {
                // flip to back and type description
                card.classList.add('flipped');
                cardText.classList.add('typing');
                cardText.textContent = '';
                
                // type out description after flip animation starts
                setTimeout(() => {
                    let currentIndex = 0;
                    function typeNextChar() {
                        if (currentIndex < description.length) {
                            cardText.textContent = description.substring(0, currentIndex + 1);
                            currentIndex++;
                            setTimeout(typeNextChar, 50);
                        }
                    }
                    typeNextChar();
                }, 300);
            }
        });
    });
});

