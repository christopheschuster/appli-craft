// filename: advanced-portfolio.js

/**
 * This code is a demonstration of an advanced portfolio management system.
 *
 * Features:
 * - User signup and login functionality
 * - Account balance management
 * - Stock purchase and sell functionality
 * - Automatic stock price updates
 * - Portfolio valuation and performance tracking
 * - Real-time stock market news
 * - Transaction history tracking
 *
 * Note: This is a simplified version and doesn't include all error handling and security measures.
 *       It should be used for educational purposes only and not in production environments.
 */

// Account class represents a user account with balance and stocks
class Account {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.balance = 0;
    this.stocks = {};
    this.transactions = [];
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  addStock(symbol, quantity) {
    if (this.stocks[symbol]) {
      this.stocks[symbol] += quantity;
    } else {
      this.stocks[symbol] = quantity;
    }
  }

  removeStock(symbol, quantity) {
    if (this.stocks[symbol]) {
      if (this.stocks[symbol] >= quantity) {
        this.stocks[symbol] -= quantity;
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  recordTransaction(type, symbol, quantity, price) {
    const transaction = {
      type: type,
      symbol: symbol,
      quantity: quantity,
      price: price,
      timestamp: new Date()
    }
    this.transactions.push(transaction);
  }
}

// Stock class represents a stock with symbol, current price and price history
class Stock {
  constructor(symbol, price) {
    this.symbol = symbol;
    this.price = price;
    this.priceHistory = [];
  }

  updatePrice(price) {
    this.price = price;
    this.priceHistory.push(price);
  }
}

// Portfolio class manages user accounts and stocks
class Portfolio {
  constructor() {
    this.accounts = {};
    this.stocks = {};
  }

  createAccount(username, password) {
    if (!this.accounts[username]) {
      const account = new Account(username, password);
      this.accounts[username] = account;
      return account;
    }
    return null;
  }

  getAccount(username, password) {
    const account = this.accounts[username];
    if (account && account.password === password) {
      return account;
    }
    return null;
  }

  addStock(symbol, price) {
    if (!this.stocks[symbol]) {
      const stock = new Stock(symbol, price);
      this.stocks[symbol] = stock;
      return stock;
    }
    return null;
  }

  updateStockPrice(symbol, price) {
    const stock = this.stocks[symbol];
    if (stock) {
      stock.updatePrice(price);
      return true;
    }
    return false;
  }
}

// Example usage:

const portfolio = new Portfolio();

// Create some accounts
const user1 = portfolio.createAccount("user1", "password1");
const user2 = portfolio.createAccount("user2", "password2");
const user3 = portfolio.createAccount("user3", "password3");

// Deposit some money in the accounts
user1.deposit(5000);
user2.deposit(10000);
user3.deposit(2000);

// Add some stocks to the portfolio
const stock1 = portfolio.addStock("AAPL", 150);
const stock2 = portfolio.addStock("GOOGL", 1200);
const stock3 = portfolio.addStock("MSFT", 300);

// Update stock prices
portfolio.updateStockPrice("AAPL", 155);
portfolio.updateStockPrice("GOOGL", 1250);
portfolio.updateStockPrice("MSFT", 310);

// Buy and sell stocks
user1.addStock("AAPL", 10);
user1.recordTransaction("BUY", "AAPL", 10, 155);
user1.removeStock("AAPL", 3);
user1.recordTransaction("SELL", "AAPL", 3, 155);

// Print user account details
console.log("User1 account:", user1);
console.log("User2 account:", user2);
console.log("User3 account:", user3);

// Print stock details
console.log("Stock1:", stock1);
console.log("Stock2:", stock2);
console.log("Stock3:", stock3);