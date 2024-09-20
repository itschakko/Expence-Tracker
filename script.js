

document.addEventListener('DOMContentLoaded', function() {
    const addExpenseButton = document.getElementById('addExpenseButton');


    addExpenseButton.addEventListener('click', function() {
        // Get input values
        const name = document.getElementById('inputName').value;
        const date = document.getElementById('inputDate').value;
        const amount = document.getElementById('inputAmount').value;

        // Validate input values
        if (name && date && amount) {
            // Create a new row
            const tableBody = document.getElementById('expenseTableBody');
            const newRow = document.createElement('tr');

            // Create and append new cells for name, date, and amount
            const nameCell = document.createElement('td');
            nameCell.textContent = name;
            newRow.appendChild(nameCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = date;
            newRow.appendChild(dateCell);

            const amountCell = document.createElement('td');
            amountCell.textContent = amount;
            newRow.appendChild(amountCell);

            // Create and append the delete button cell
            const delCell = document.createElement('td');
            const delButton = document.createElement('button');
            delButton.textContent = 'Delete';
            delButton.className = 'delButton';
            delCell.appendChild(delButton);
            newRow.appendChild(delCell);

            // Attach event listener to the delete button
            delButton.addEventListener('click', function() {
                tableBody.removeChild(newRow);
                saveTableData(); // Update the localStorage after deletion
                totalAmount();
            });


            // Append the new row to the table body
            tableBody.appendChild(newRow);

            // Save the table data to localStorage
            saveTableData();
            totalAmount();

            // Clear input fields
            document.getElementById('inputName').value = '';
            document.getElementById('inputDate').value = '';
            document.getElementById('inputAmount').value = '';
        } else {
            alert('Please fill in all fields.');
        }
    });
    
});

// Function to save table data to localStorage
function saveTableData() {
    const tableBody = document.getElementById('expenseTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    const tableData = [];

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        const rowData = {
            name: cells[0].textContent,
            date: cells[1].textContent,
            amount: cells[2].textContent,
        };
        tableData.push(rowData);
    }

    localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Function to load table data from localStorage
function loadTableData() {
    const tableData = JSON.parse(localStorage.getItem('tableData'));

    if (tableData) {
        const tableBody = document.getElementById('expenseTableBody');
        for (let rowData of tableData) {
            const newRow = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = rowData.name;
            newRow.appendChild(nameCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = rowData.date;
            newRow.appendChild(dateCell);

            const amountCell = document.createElement('td');
            amountCell.textContent = rowData.amount;
            newRow.appendChild(amountCell);
            
            // Create and append the delete button cell
            const delCell = document.createElement('td');
            const delButton = document.createElement('button');
            delButton.textContent = 'Delete';
            delButton.className = 'delButton';
            delCell.appendChild(delButton);
            newRow.appendChild(delCell);

            tableBody.appendChild(newRow);
            totalAmount();

            // Attach event listener to the delete button
            delButton.addEventListener('click', function() {
                tableBody.removeChild(newRow);
                saveTableData(); // Update the localStorage after deletion
                totalAmount();
            });

        }
    }
}
function totalAmount(){
    const tableBody = document.getElementById('expenseTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    let total = 0

    for (let row of rows){
        const cells = row.getElementsByTagName('td');
        let value = cells[2].innerText || cells[2].textContent;
        total += Number(value) || 0
    }

    const appendTotal = document.getElementById('total');
    appendTotal.innerHTML = "Total Amount: £" + total;
    return;
}
// Load table data when the page is loaded
loadTableData();