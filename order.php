<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $courseName = trim($_POST['courseName'] ?? '');
    $coursePrice = trim($_POST['coursePrice'] ?? '');
    $customerName = trim($_POST['customerName'] ?? '');
    $customerEmail = trim($_POST['customerEmail'] ?? '');
    $customerPhone = trim($_POST['customerPhone'] ?? '');
    $additionalNotes = trim($_POST['additionalNotes'] ?? '');

    $errors = [];

    if (!$courseName) {
        $errors[] = 'Course name is required.';
    }
    if (!$coursePrice) {
        $errors[] = 'Course price is required.';
    }
    if (!$customerName) {
        $errors[] = 'Your name is required.';
    }
    if (!$customerEmail || !filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'A valid email is required.';
    }
    if (!$customerPhone) {
        $errors[] = 'Phone number is required.';
    }

    if (!empty($errors)) {
        // Return errors as JSON or handle as needed
        http_response_code(400);
        echo json_encode(['errors' => $errors]);
        exit;
    }

    // Prepare email content
    $to = 'your-email@example.com'; // Replace with my email
    $subject = "New Course Order: $courseName";
    $message = "You have received a new course order:\n\n";
    $message .= "Course: $courseName\n";
    $message .= "Price: $coursePrice\n";
    $message .= "Customer Name: $customerName\n";
    $message .= "Customer Email: $customerEmail\n";
    $message .= "Customer Phone: $customerPhone\n";
    $message .= "Additional Notes: $additionalNotes\n";
    $message .= "Payment Method: Cash on delivery\n";

    $headers = "From: no-reply@" . $_SERVER['SERVER_NAME'] . "\r\n";
    $headers .= "Reply-To: $customerEmail\r\n";

    if (mail($to, $subject, $message, $headers)) {
        // Redirect or show success message
        header('Location: thank_you.html');
        exit;
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send order email.']);
        exit;
    }
} else {
    http_response_code(405);
    echo 'Method Not Allowed';
}
?>
