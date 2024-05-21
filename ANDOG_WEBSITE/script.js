let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('nav');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

function submitReview() {
    var username = document.getElementById("username").value;
    var rating = document.querySelector('input[name="rating"]:checked').value;
    var comment = document.getElementById("comment").value;

    if (username.trim() === '' || comment.trim() === '') {
        alert("Please fill in all fields.");
        return;
    }

    var xhr = new XMLHttpRequest();
    var url = "dbconnection.php"; // Your PHP script URL
    var params = "username=" + username + "&rating=" + rating + "&comment=" + comment;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // If the request is successful, you can handle the response here
            alert(xhr.responseText);
            // Check if the review was successfully submitted
            if (xhr.responseText.includes("Review submitted")) {
                // Reload the page
                window.location.reload();
            }
        }
    };

    xhr.send(params);
}



window.onload = () => {
    fetchReviewList();
};

function fetchReviewList() {
    var xhr = new XMLHttpRequest();
    var url = "dbconnection.php"; // URL of the PHP script containing the displayComments function

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // If the request is successful, update the review list
            document.getElementById("reviewList").innerHTML = xhr.responseText;
        }
    };

    xhr.send();
} script.js