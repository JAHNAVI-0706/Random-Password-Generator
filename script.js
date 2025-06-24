document.addEventListener('DOMContentLoaded', () => {
    const passwordEl = document.getElementById('password');
    const copyEl = document.getElementById('copy');
    const lengthEl = document.getElementById('length');
    const uppercaseEl = document.getElementById('uppercase');
    const lowercaseEl = document.getElementById('lowercase');
    const numbersEl = document.getElementById('numbers');
    const symbolsEl = document.getElementById('symbols');
    const generateEl = document.getElementById('generate');
    const strengthBarEl = document.getElementById('strength-bar');
    const excludeAmbiguousEl = document.getElementById('exclude-ambiguous');

    let uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const ambiguousCharacters = 'Il1O0';

    function generatePassword() {
        if (excludeAmbiguousEl.checked) {
            uppercaseLetters = 'ABCDEFGHJKMNPQRSTUVWXYZ';
            lowercaseLetters = 'abcdefghijkmnopqrstuvwxyz';
            numbers = '23456789';
            symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        } else {
            uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
            numbers = '0123456789';
            symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        }

        const length = lengthEl.value;
        let characters = '';
        let password = [];

        if (uppercaseEl.checked) {
            characters += uppercaseLetters;
            password.push(uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]);
        }
        if (lowercaseEl.checked) {
            characters += lowercaseLetters;
            password.push(lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]);
        }
        if (numbersEl.checked) {
            characters += numbers;
            password.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }
        if (symbolsEl.checked) {
            characters += symbols;
            password.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }

        if (characters === '') {
            alert('Please select at least one character type');
            passwordEl.value = '';
            return;
        }

        const remainingLength = length - password.length;
        for (let i = 0; i < remainingLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password.push(characters[randomIndex]);
        }

        passwordEl.value = password.sort(() => Math.random() - 0.5).join('');
        updateStrengthMeter();
    }

    function updateStrengthMeter() {
        const password = passwordEl.value;
        let score = 0;
        if (password.length > 8) score++;
        if (password.length > 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const width = (score / 6) * 100;
        strengthBarEl.style.width = `${width}%`;

        if (score <= 2) {
            strengthBarEl.style.backgroundColor = '#f00'; // red
        } else if (score <= 4) {
            strengthBarEl.style.backgroundColor = '#fa0'; // orange
        } else {
            strengthBarEl.style.backgroundColor = '#0f0'; // green
        }
    }

    generateEl.addEventListener('click', generatePassword);

    copyEl.addEventListener('click', async () => {
        const password = passwordEl.value;
        if (!password) {
            return;
        }

        try {
            await navigator.clipboard.writeText(password);
            alert('Password copied to clipboard');
        } catch (err) {
            console.error('Failed to copy password: ', err);
            alert('Failed to copy password');
        }
    });
}); 