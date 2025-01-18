class BankAccount {
    constructor(name) {
        this.name = name;
        this.balance = 0;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    getBalance() {
        return this.balance;
    }
}

let account = null;

function updateBalance() {
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `Current Balance: $${account.getBalance()}`;
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    setTimeout(() => errorElement.textContent = '', 3000);
}

function depositMoney() {
    const nameInput = document.getElementById('accountHolder').value.trim();
    const amountInput = parseFloat(document.getElementById('amount').value);

    if (!account) {
        if (nameInput === '') {
            showError('Please enter account holder\'s name.');
            return;
        }
        account = new BankAccount(nameInput);
    }

    if (account.deposit(amountInput)) {
        updateBalance();
    } else {
        showError('Invalid deposit amount.');
    }
}

function withdrawMoney() {
    if (!account) {
        showError('Please create an account first by depositing money.');
        return;
    }

    const amountInput = parseFloat(document.getElementById('amount').value);

    if (account.withdraw(amountInput)) {
        updateBalance();
    } else {
        showError('Insufficient funds. Please deposit some money.');
    }
}