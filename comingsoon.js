// COMING SOON COUNTDOWN
function updateCountdown() {
    const launchDate = new Date('2024-12-31T23:59:59').getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
}

// Update every minute
setInterval(updateCountdown, 60000);
updateCountdown();

// Notify button
document.querySelector('.notify-btn').addEventListener('click', (e) => {
    e.preventDefault();
    // Simulate notification
    const btn = e.target;
    const originalText = btn.textContent;
    btn.textContent = 'Notified! 🎉';
    btn.style.background = '#059669';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
});