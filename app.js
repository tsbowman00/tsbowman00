function loadGuestNames() {
    var csvFilePath = "Wedding seating.csv";

    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            var rows = data.split('\n');
            var datalist = document.getElementById('guestNames');

            // Skip the header row (index 0)
            for (var i = 1; i < rows.length; i++) {
                var cols = rows[i].split(',');

                // Create an option element for each guest name
                var option = document.createElement('option');
                option.value = cols[0].trim();
                datalist.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function searchTable() {
    var guestName = document.getElementById('guestName').value.trim().toLowerCase();

    if (!guestName) {
        document.getElementById('result').innerHTML = "Please enter a guest name.";
        return;
    }

    // Path to your CSV file
    var csvFilePath = "Wedding seating.csv";

    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            var found = false;
            var rows = data.split('\n');

            // Skip the header row (index 0)
            for (var i = 1; i < rows.length; i++) {
                var cols = rows[i].split(',');

                // Check if the guest name matches
                if (cols[0].trim().toLowerCase() === guestName) {
                    document.getElementById('result').innerHTML = "Table Number: " + cols[1].trim();
                    found = true;
                    break;
                }
            }

            if (!found) {
                document.getElementById('result').innerHTML = "Name not found. Please try again.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = "There was an error retrieving the table number.";
        });
}

// Call the loadGuestNames function when the page loads to populate the datalist
document.addEventListener('DOMContentLoaded', loadGuestNames);
