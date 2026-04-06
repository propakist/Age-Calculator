// ============ QUOTE DATABASE ============
const quotes = {
    she: [
        { text: "You are stronger than you think. Your journey is inspiring.", author: "Maya Angelou" },
        { text: "A woman is the full circle. Within her is the power to create, nurture, and transform.", author: "Diane Mariechild" },
        { text: "She believed she could, so she did. And her story continues to inspire.", author: "Unknown" },
        { text: "The most beautiful thing you can do is live authentically and love deeply.", author: "Warsan Shire" },
        { text: "Your potential is limitless. Keep shining brighter every day.", author: "Cristina" },
        { text: "Every day is a chance to write a new chapter of your amazing story.", author: "Unknown" },
        { text: "You are worthy of love, respect, and all the good things in life.", author: "Louise Hay" },
        { text: "Life is too short to settle. You deserve extraordinary things.", author: "Unknown" },
        { text: "Your age is just a number; your spirit is timeless.", author: "Unknown" },
        { text: "Be the woman you needed when you were younger. Lead with love.", author: "Unknown" }
    ],
    he: [
        { text: "You have the power to change your life with your choices today.", author: "Unknown" },
        { text: "A true man knows his worth but remains humble in his approach.", author: "Unknown" },
        { text: "Your strength lies not in never falling, but in rising every time.", author: "Unknown" },
        { text: "Live boldly. Love fiercely. Make your mark on this world.", author: "Unknown" },
        { text: "The greatest glory in life is not in never falling, but in rising again.", author: "Nelson Mandela" },
        { text: "You are stronger than you believe and braver than you think.", author: "Unknown" },
        { text: "Build a legacy that speaks louder than words ever could.", author: "Unknown" },
        { text: "Your age is your wisdom. Use it to inspire others.", author: "Unknown" },
        { text: "Life rewards the bold. Be courageous in your pursuits.", author: "Unknown" },
        { text: "You are the author of your own story. Keep writing it beautifully.", author: "Unknown" }
    ],
    they: [
        { text: "Your identity is valid. Your journey is beautiful. You matter.", author: "Unknown" },
        { text: "Authenticity is the most powerful thing you can be.", author: "Unknown" },
        { text: "Your uniqueness is your superpower. Never apologize for being yourself.", author: "Unknown" },
        { text: "Every moment of your life has been preparing you for this moment.", author: "Unknown" },
        { text: "You are a masterpiece in progress. Keep becoming.", author: "Unknown" },
        { text: "Life is about being true to yourself and spreading love.", author: "Unknown" },
        { text: "Your voice matters. Your existence matters. You matter.", author: "Unknown" },
        { text: "Celebrate every part of who you are. You're incredible.", author: "Unknown" },
        { text: "Age is just a number; your spirit is infinite.", author: "Unknown" },
        { text: "You have survived 100% of your worst days. You're stronger than you know.", author: "Unknown" }
    ]
};

// ============ ZODIAC SIGNS ============
const zodiacSigns = {
    "1-20": { sign: "Capricorn", emoji: "♑" },
    "1-21": { sign: "Aquarius", emoji: "♒" },
    "2-19": { sign: "Aquarius", emoji: "♒" },
    "2-20": { sign: "Pisces", emoji: "♓" },
    "3-21": { sign: "Aries", emoji: "♈" },
    "4-20": { sign: "Taurus", emoji: "♉" },
    "5-21": { sign: "Gemini", emoji: "♊" },
    "6-21": { sign: "Cancer", emoji: "♋" },
    "7-23": { sign: "Leo", emoji: "♌" },
    "8-23": { sign: "Virgo", emoji: "♍" },
    "9-23": { sign: "Libra", emoji: "♎" },
    "10-23": { sign: "Scorpio", emoji: "♏" },
    "11-22": { sign: "Sagittarius", emoji: "♐" },
    "12-22": { sign: "Capricorn", emoji: "♑" }
};

// ============ FUN FACTS ============
const funFacts = [
    "Your heart beats about 100,000 times per day!",
    "Your body contains approximately 206 bones.",
    "Your brain uses 20% of your body's energy.",
    "You shed about 30,000 to 40,000 dead skin cells every minute.",
    "Your left lung is smaller to make room for your heart.",
    "You have unique fingerprints and eye patterns.",
    "Your nose can remember 50,000 different scents.",
    "You can't sneeze with your eyes open.",
    "Your ears are still growing throughout your life.",
    "Your body is 60% water."
];

// ============ STATE VARIABLES ============
let currentGender = null;
let calculatedAge = null;

// ============ DOM ELEMENTS ============
const birthDateInput = document.getElementById('birthDate');
const errorBox = document.getElementById('errorBox');
const errorText = document.getElementById('errorText');
const successBox = document.getElementById('successBox');
const successText = document.getElementById('successText');
const resultsCard = document.getElementById('resultsCard');
const celebrationModal = document.getElementById('celebrationModal');

// ============ SET MAX DATE ============
birthDateInput.max = new Date().toISOString().split('T')[0];

// ============ EVENT LISTENERS ============
birthDateInput.addEventListener('change', () => {
    hideMessages();
});

// ============ VALIDATION & ERROR HANDLING ============
function validateBirthDate(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();

    // Check if date is empty
    if (!dateString) {
        return { valid: false, error: '⚠️ Please select your birth date to continue' };
    }

    // Check if birth date is in the future
    if (birthDate > today) {
        return { valid: false, error: '⚠️ Your birth date cannot be in the future' };
    }

    // Check if person is too old (over 150 years)
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age > 150) {
        return { valid: false, error: '⚠️ Please enter a valid birth date' };
    }

    // Check if person is less than 0 years old
    if (age < 0) {
        return { valid: false, error: '⚠️ Birth date cannot be in the future' };
    }

    return { valid: true };
}

// ============ SHOW/HIDE MESSAGES ============
function showError(message) {
    hideMessages();
    errorText.textContent = message;
    errorBox.style.display = 'flex';
    resultsCard.style.display = 'none';
}

function showSuccess(message) {
    hideMessages();
    successText.textContent = message;
    successBox.style.display = 'flex';
}

function hideMessages() {
    errorBox.style.display = 'none';
    successBox.style.display = 'none';
}

// ============ GET ZODIAC SIGN ============
function getZodiacSign(month, day) {
    const key = `${month}-${day}`;
    for (const range in zodiacSigns) {
        const [m, d] = range.split('-').map(Number);
        if (month === m && day >= d) {
            return zodiacSigns[range];
        }
    }
    // Default fallback
    return { sign: "Capricorn", emoji: "♑" };
}

// ============ GET RANDOM FACT ============
function getRandomFact() {
    return funFacts[Math.floor(Math.random() * funFacts.length)];
}

// ============ CALCULATE AGE ============
function calculateAge() {
    const birthDateValue = birthDateInput.value;

    // Validate input
    const validation = validateBirthDate(birthDateValue);
    if (!validation.valid) {
        showError(validation.error);
        return;
    }

    try {
        const birthDate = new Date(birthDateValue);
        const today = new Date();

        // Calculate age components
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // Adjust for negative days
        if (days < 0) {
            months--;
            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += previousMonth.getDate();
        }

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate totals
        const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;

        // Calculate days until next birthday
        let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday < today) {
            nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
        }
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        // Get day of week born
        const dayOfWeekBorn = birthDate.toLocaleDateString('en-US', { weekday: 'long' });

        // Get zodiac sign
        const zodiac = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate());

        // Get fun fact
        const fact = getRandomFact();

        // Store calculation
        calculatedAge = {
            years,
            months,
            days,
            totalDays,
            totalHours,
            totalMinutes,
            daysUntilBirthday,
            dayOfWeekBorn,
            zodiac,
            fact
        };

        // Display results
        displayResults(calculatedAge);
        showSuccess('✓ Age calculated successfully!');

    } catch (error) {
        showError('⚠️ An error occurred. Please try again.');
        console.error('Calculation error:', error);
    }
}

// ============ DISPLAY RESULTS ============
function displayResults(age) {
    // Update main age display
    document.getElementById('yearsDisplay').textContent = age.years;
    document.getElementById('monthsDisplay').textContent = age.months;
    document.getElementById('daysDisplay').textContent = age.days;

    // Update statistics
    document.getElementById('totalDaysDisplay').textContent = age.totalDays.toLocaleString();
    document.getElementById('totalHoursDisplay').textContent = age.totalHours.toLocaleString();
    document.getElementById('totalMinutesDisplay').textContent = age.totalMinutes.toLocaleString();
    document.getElementById('daysUntilDisplay').textContent = age.daysUntilBirthday;

    // Update details
    document.getElementById('dayOfWeekDisplay').textContent = age.dayOfWeekBorn;
    document.getElementById('zodiacDisplay').textContent = `${age.zodiac.emoji} ${age.zodiac.sign}`;
    document.getElementById('milestoneDisplay').textContent = `${age.years + 1} years in ${age.daysUntilBirthday} days`;
    document.getElementById('factDisplay').textContent = age.fact;

    // Show results card
    resultsCard.style.display = 'block';
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============ CELEBRATION MESSAGE ============
function showCelebration() {
    if (!calculatedAge) {
        showError('⚠️ Please calculate age first');
        return;
    }

    // Set default gender if not selected
    if (!currentGender) {
        currentGender = 'they';
    }

    // Update modal with calculated data
    document.getElementById('modalAge').textContent = calculatedAge.years;
    document.getElementById('modalHours').textContent = calculatedAge.totalHours.toLocaleString();
    document.getElementById('modalDays').textContent = calculatedAge.totalDays.toLocaleString();
    document.getElementById('modalBirthday').textContent = calculatedAge.daysUntilBirthday;
    document.getElementById('modalDayOfWeek').textContent = calculatedAge.dayOfWeekBorn;

    // Generate initial quote
    generateNewQuote();

    // Show modal
    celebrationModal.classList.add('active');
}

// ============ QUOTE GENERATION ============
function generateNewQuote() {
    if (!currentGender) {
        currentGender = 'they';
    }
    updateQuoteDisplay(currentGender);
}

function updateQuote(gender) {
    currentGender = gender;
    updateQuoteDisplay(gender);

    // Update active button
    document.querySelectorAll('.gender-option').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.gender-option').classList.add('active');
}

function updateQuoteDisplay(gender) {
    const quoteList = quotes[gender] || quotes['they'];
    const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

    document.getElementById('quoteText').textContent = `"${randomQuote.text}"`;
    document.getElementById('quoteAuthor').textContent = `— ${randomQuote.author}`;

    // Add animation
    const quoteSection = document.querySelector('.quote-section');
    quoteSection.style.animation = 'none';
    setTimeout(() => {
        quoteSection.style.animation = 'slideUp 0.3s ease-out';
    }, 10);
}

// ============ MODAL FUNCTIONS ============
function closeCelebration() {
    celebrationModal.classList.remove('active');
    currentGender = null;
}

// Close modal on outside click
celebrationModal.addEventListener('click', (e) => {
    if (e.target === celebrationModal) {
        closeCelebration();
    }
});

// ============ RESET CALCULATOR ============
function resetCalculator() {
    birthDateInput.value = '';
    hideMessages();
    resultsCard.style.display = 'none';
    celebrationModal.classList.remove('active');
    calculatedAge = null;
    currentGender = null;
    birthDateInput.focus();
}

// ============ KEYBOARD SUPPORT ============
birthDateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateAge();
    }
});

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', () => {
    // Set focus on input
    birthDateInput.focus();
    
    // Log initialization
    console.log('Age Calculator Pro loaded successfully!');
});
