// ============================================
// Typing Effect
// ============================================

const typingText = document.getElementById('typingText');

if (typingText) {
    const phrases = [
        'Senior Android Developer',
        'Microsoft Stack & Mobile',
        'AI/ML Engineer',
        'Cybersecurity Specialist',
        '10+ Years Experience',
        'Kotlin Expert',
        'Jetpack Compose Master',
        'Firebase Guru',
        'Clean Architecture Advocate',
        'DevOps Practitioner'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing phrase, pause before deleting
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    type();
}
