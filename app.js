function searchTable() {
    var guestName = document.getElementById('guestName').value;

    if (!guestName) {
        document.getElementById('result').innerHTML = "Please enter a guest name.";
        return;
    }

    var url = "https://script.google.com/macros/s/AKfycbzoG6KLAHy8pHnatO0GPdHOpYRTbKSIPcejTXOsoPwv/exec?guestName=" + encodeURIComponent(guestName);

    fetch(url)
        .then(response => response.text())
        .then(data => {
            if (data === "Not Found") {
                document.getElementById('result').innerHTML = "Name not found. Please try again.";
            } else {
                document.getElementById('result').innerHTML = "Table Number: " + data;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = "There was an error retrieving the table number.";
        });
}

