/**
 * 404 Page Interactions
 * Provides subtle magnetic and parallax effects, checking for reduced-motion preferences.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Accessibility Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return; // Exit JS animations if user prefers reduced motion

    // 2. Magnetic Button Effect
    const btnWrapper = document.querySelector('.action-wrapper');
    const btn = document.querySelector('.magnetic-btn');

    if (btnWrapper && btn) {
        btnWrapper.addEventListener('mousemove', (e) => {
            const rect = btnWrapper.getBoundingClientRect();
            // Calculate mouse position relative to the center of the button
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });

        btnWrapper.addEventListener('mouseleave', () => {
            // Spring back to center
            btn.style.transform = `translate(0px, 0px)`;
        });
    }

    // 3. Subtle Spatial Parallax on Illustration
    const illustrationWrapper = document.querySelector('.illustration-wrapper');
    
    if (illustrationWrapper) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Calculate rotation percentages (max 12 degrees)
            const rotateX = ((clientY / windowHeight) - 0.5) * -12;
            const rotateY = ((clientX / windowWidth) - 0.5) * 12;
            
            // Apply 3D rotation
            illustrationWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset rotation when mouse leaves the window
        document.addEventListener('mouseleave', () => {
            illustrationWrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }
});