
        // Function to generate unique placeholder for each student
    function generatePlaceholderImage(studentName) {
        // Create a simple hash from student name for consistency
        let hash = 0;
        for (let i = 0; i < studentName.length; i++) {
            const char = studentName.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        
        // Use hash to create slight size variations (190-210px range)
        const size = 200 + (Math.abs(hash) % 21) - 10; // 190-210
        const seed = Math.abs(hash) % 1000; // Use hash as seed for consistent image per student
        
        return `https://picsum.photos/seed/${seed}/${size}/${size}?grayscale&blur=1`;
    }
    
    let rickrolledCount = 0;
    let totalChecked = 0;
    
    // Find all student images and add error listeners
    const studentImages = document.querySelectorAll('.student img');
    
    studentImages.forEach(function(img) {
        const originalSrc = img.getAttribute('src');
        const studentName = img.getAttribute('alt');
        const parentLink = img.closest('a');
        
        console.log(`Setting up stealth detection for ${studentName}: ${originalSrc}`);
        
        // Add error event listener for 404 detection
        img.addEventListener('error', function() {
            console.log(`🎭 404 detected for ${studentName}! Preparing stealth rickroll: ${originalSrc}`);
            
            // Only rickroll if we haven't already (prevent infinite loops)
            if (!this.src.includes('picsum.photos')) {
                rickrolledCount++;
                
                // Replace with unique placeholder image for this student
                const placeholderUrl = generatePlaceholderImage(studentName);
                this.src = placeholderUrl;
                this.alt = `${studentName}`;
                
                console.log(`🖼️ Generated unique placeholder for ${studentName}: ${placeholderUrl}`);
                
                // Create the stealth rickroll system
                if (parentLink) {
                    setupStealthRickroll(parentLink, studentName);
                }
                
                updateRickrollStatus();
            }
        });
        
        // Add load event listener for successful loads
        img.addEventListener('load', function() {
            if (!this.src.includes('picsum.photos')) {
                console.log(`✅ ${studentName} image loaded successfully: ${originalSrc}`);
            }
            totalChecked++;
            checkIfAllImagesProcessed();
        });
        
        // Force a check by temporarily changing and restoring the src
        // This triggers the error event if the image doesn't exist
        const tempSrc = img.src;
        img.src = '';
        img.src = tempSrc;
    });
    
    function setupStealthRickroll(parentLink, studentName) {
        console.log(`🕵️ Setting up stealth rickroll for ${studentName}`);
        
        // Remove any existing href to prevent accidental clicks
        parentLink.removeAttribute('href');
        parentLink.style.cursor = 'default';
        
        // Create invisible video overlay
        const videoOverlay = document.createElement('div');
        videoOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: none;
            justify-content: center;
            align-items: center;
        `;
        
        // Create iframe for Rick Astley video
        const iframe = document.createElement('iframe');
        iframe.style.cssText = `
            width: 80vw;
            height: 60vh;
            border: none;
            border-radius: 10px;
        `;
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        
        videoOverlay.appendChild(iframe);
        document.body.appendChild(videoOverlay);
        
        // Add hover listeners
        parentLink.addEventListener('mouseenter', function() {
            console.log(`🎵 Hover detected on ${studentName} - RICKROLL ACTIVATED!`);
            
            // Set up the video with autoplay
            iframe.src = `https://www.youtube.com/embed/${RICKROLL_VIDEO_ID}?autoplay=1&start=0&rel=0&controls=1`;
            
            // Show the overlay
            videoOverlay.style.display = 'flex';
            
            // Optional: slight delay to make it seem more mysterious
            setTimeout(() => {
                videoOverlay.style.opacity = '1';
            }, 100);
        });
        
        // Click overlay to close (escape route)
        videoOverlay.addEventListener('click', function(e) {
            if (e.target === videoOverlay) {
                console.log(`🎵 Rickroll overlay closed for ${studentName}`);
                videoOverlay.style.display = 'none';
                iframe.src = ''; // Stop the video
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoOverlay.style.display === 'flex') {
                console.log(`🎵 Rickroll overlay closed with ESC for ${studentName}`);
                videoOverlay.style.display = 'none';
                iframe.src = ''; // Stop the video
            }
        });
        
        // Auto-close after video ends (approximately 3.5 minutes)
        setTimeout(() => {
            if (videoOverlay.style.display === 'flex') {
                console.log(`🎵 Auto-closing rickroll for ${studentName} after timeout`);
                videoOverlay.style.display = 'none';
                iframe.src = '';
            }
        }, 220000); // 3:40 minutes
    }
    
    function updateRickrollStatus() {
        if (rickrolledCount > 0) {
            console.log(`🕵️ ${rickrolledCount} student(s) are in stealth rickroll mode`);
            console.log('🎵 Hover over their images for a surprise...');
            
            // Ultra-subtle notification - only visible in browser title
            if (rickrolledCount === 1) {
                document.title = `CF-25 (stealth mode: ${rickrolledCount})`;
            } else {
                document.title = `CF-25 (stealth mode: ${rickrolledCount})`;
            }
        }
    }
    
    function checkIfAllImagesProcessed() {
        if (totalChecked === studentImages.length) {
            if (rickrolledCount === 0) {
                console.log('🎉 All students have their images! No stealth mode needed.');
                document.title = 'CF-25 (all images loaded!)';
            } else {
                console.log(`🕵️ Stealth mode active: ${rickrolledCount} hover rickrolls out of ${studentImages.length}`);
                console.log('👀 Try hovering over students without profile pictures...');
            }
        }
    }
});

// Easter egg: konami code for MEGA rickroll
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        console.log('🎮 KONAMI CODE ACTIVATED! MEGA RICKROLL MODE! 🎮');
        
        // Create full-screen rickroll that activates immediately
        const megaOverlay = document.createElement('div');
        megaOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        `;
        
        const megaIframe = document.createElement('iframe');
        megaIframe.style.cssText = `
            width: 90vw;
            height: 80vh;
            border: none;
            border-radius: 15px;
        `;
        megaIframe.src = `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&start=0&rel=0&controls=1`;
        megaIframe.setAttribute('allow', 'autoplay; fullscreen');
        
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close (or ESC)';
        closeButton.style.cssText = `
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        
        megaOverlay.appendChild(megaIframe);
        megaOverlay.appendChild(closeButton);
        document.body.appendChild(megaOverlay);
        
        // Close handlers
        closeButton.addEventListener('click', () => {
            document.body.removeChild(megaOverlay);
            console.log('🎮 Mega rickroll closed!');
        });
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(megaOverlay)) {
                    document.body.removeChild(megaOverlay);
                    console.log('🎮 Mega rickroll closed with ESC!');
                }
                document.removeEventListener('keydown', escHandler);
            }
        });
        
        konamiCode = []; // Reset
    }
});

// Debug helper function
function checkImageStatus() {
    const images = document.querySelectorAll('.student img');
    console.log('=== STEALTH MODE STATUS REPORT ===');
    images.forEach(img => {
        const name = img.alt;
        const src = img.src;
        const isRickroll = src.includes('picsum.photos');
        console.log(`${name}: ${src} ${isRickroll ? '(STEALTH RICKROLL - HOVER TO ACTIVATE)' : '(SAFE)'}`);
    });
    console.log('===================================');
}

// Add global hint for students who open console
console.log('🕵️ Psst... if someone doesn\'t have a profile picture, try hovering over their image... 😈');
console.log('💡 Type checkImageStatus() to see who\'s in stealth mode!');
console.log('🎨 Each student gets a unique placeholder image based on their name!');
