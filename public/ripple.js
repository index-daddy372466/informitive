const buttons = document.querySelectorAll('.ripple-button');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Get click coordinates relative to the button
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate ripple size (max of button width/height)
    const size = Math.max(button.offsetWidth, button.offsetHeight);

    // Position and size the ripple
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;

    this.appendChild(ripple);

    // Remove the ripple after the animation ends
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
});