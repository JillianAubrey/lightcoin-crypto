class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    return this.transactions.reduce((bal, t) => bal += t.value, 0);
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
  isAllowed() {
    return this.amount > 0;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return super.isAllowed() && this.amount < this.account.balance;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

const myAccount = new Account("Jillian's Account", 500);
console.log('Starting balance is 0:', myAccount.balance);
const t0 = new Deposit(500, myAccount);
console.log('Status of depositing $500', t0.commit());
console.log('Current balance:', myAccount.balance);
const t1 = new Withdrawal(50.25, myAccount);
console.log('Status of withdrawing $50.25:',t1.commit());
console.log('Current balance:', myAccount.balance);
const t3 = new Deposit(-120.00, myAccount);
console.log('Status of Depositing -$120:',t3.commit());
console.log('Current balance:', myAccount.balance);
const t4 = new Withdrawal(1000, myAccount);
console.log('Status of Withdrawing $1000:',t4.commit());
console.log('Current balance:', myAccount.balance);
const t5 = new Withdrawal(-1, myAccount);
console.log('Status of Withdrawing -$1:',t5.commit());
console.log('Current balance:', myAccount.balance);

console.log('Transaction list');
console.log(myAccount.transactions);
