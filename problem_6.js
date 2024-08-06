document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Retrieve input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let valid = true;

    // Validate name (required and alphabetic characters only)
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required.';
        valid = false;
    } else if (!/^[A-Za-z]+$/.test(name)) {
        document.getElementById('nameError').textContent = 'Name should contain only alphabetic characters.';
        valid = false;
    }

    // Validate email (required and valid email format)
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required.';
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        valid = false;
    }

    // Validate password (required and at least 8 characters long)
    if (password === '') {
        document.getElementById('passwordError').textContent = 'Password is required.';
        valid = false;
    } else if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password should be at least 8 characters long.';
        valid = false;
    }

    // If all fields are valid, submit the form or handle it accordingly
    if (valid) {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted successfully');
        // Here you can add code to actually submit the form data using AJAX or another method.
    }
});
