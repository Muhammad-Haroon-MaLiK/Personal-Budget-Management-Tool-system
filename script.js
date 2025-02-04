
    let transactions = [];

    function updateBalances() {
        let dailyIncome = 0, weeklyIncome = 0, monthlyIncome = 0;
        let dailyExpense = 0, weeklyExpense = 0, monthlyExpense = 0;

        transactions.forEach(transaction => {
            if (transaction.type === "income") {
                if (transaction.frequency === "daily") dailyIncome += transaction.amount;
                if (transaction.frequency === "weekly") weeklyIncome += transaction.amount;
                if (transaction.frequency === "monthly") monthlyIncome += transaction.amount;
            } else if (transaction.type === "expense") {
                if (transaction.frequency === "daily") dailyExpense += transaction.amount;
                if (transaction.frequency === "weekly") weeklyExpense += transaction.amount;
                if (transaction.frequency === "monthly") monthlyExpense += transaction.amount;
            }
        });

        let dailyBalance = dailyIncome - dailyExpense;
        let weeklyBalance = weeklyIncome - weeklyExpense;
        let monthlyBalance = monthlyIncome - monthlyExpense;
        let totalBalance = (dailyIncome * 30 + weeklyIncome * 4 + monthlyIncome) - 
                           (dailyExpense * 30 + weeklyExpense * 4 + monthlyExpense);

        document.getElementById("daily-balance").textContent = dailyBalance;
        document.getElementById("weekly-balance").textContent = weeklyBalance;
        document.getElementById("monthly-balance").textContent = monthlyBalance;
        document.getElementById("total-balance").textContent = totalBalance;
    }

    function addTransaction(event) {
        event.preventDefault();
        let form = event.target;
        let amount = parseFloat(form.amount.value);
        let frequency = form.frequency.value;
        let type = form.type.value;
        let category = form.category ? form.category.value : "income";

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        transactions.push({ amount, frequency, type, category });
        updateBalances();
        updateTransactionHistory();
        form.reset();
    }

    function updateTransactionHistory() {
        let historyList = document.getElementById("transaction-history");
        historyList.innerHTML = "";

        transactions.forEach((transaction, index) => {
            let li = document.createElement("li");
            li.textContent = `${transaction.type.toUpperCase()} - $${transaction.amount} (${transaction.frequency}) [${transaction.category}]`;
            historyList.appendChild(li);
        });
    }

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", addTransaction);
    });
