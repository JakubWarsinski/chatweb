document.getElementById('code').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, '').slice(0, 6);

    const passwordInput = document.getElementById('password');

    if (this.value.length === 6) {
        passwordInput.focus();
    }
});