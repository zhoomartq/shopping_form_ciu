document.addEventListener('DOMContentLoaded', function() {
    const paymentTypeRadios = document.querySelectorAll('input[name="payment-type"]');
    const cardDetailsSection = document.getElementById('card-details-section');

    paymentTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.id === 'credit-card') {
                cardDetailsSection.style.display = 'block';
            } else {
                cardDetailsSection.style.display = 'none';
            }
        });
    });
});

function goBack() {
    alert("Back button clicked. Implement your logic here.");
}

function continuePayment() {
    const cardNumber = document.getElementById('card-number').value;
    const expirationDate = document.getElementById('expiration-date').value;
    const cvv = document.getElementById('cvv').value;

    if (document.getElementById('credit-card').checked) {
        if (!cardNumber || !expirationDate || !cvv) {
            alert("Please fill out all credit card details.");
            return;
        }
    }

    window.location.href = 'shopping.html';
}
