<?php

header("X-Robots-Tag: noindex, nofollow", true);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

// Admin email address
$adminEmail = "shayankhanwd@gmail.com, shane@digimarketing.sg, sales@digimarketing.sg";

// Function to send email
function sendEmail($data, $adminEmail)
{
    $subject = "New Contact Form Submission";

    // Build a structured email message. Fields the submitting form doesn't
    // have (the contact page and homepage forms differ) are left out.
    $fields = array(
        'name'      => 'Name',
        'firstName' => 'First Name',
        'lastName'  => 'Last Name',
        'company'   => 'Company',
        'email'     => 'Email',
        'phone'     => 'Phone / WhatsApp',
        'website'   => 'Website',
        'service'   => 'Service Required',
        'budget'    => 'Budget Range (SGD)',
        'timeline'  => 'Project Timeline',
        'message'   => 'Project Details',
        'page'      => 'Submitted From',
    );
    $message = "New Contact Form Submission Details:\n\n";
    foreach ($fields as $key => $label) {
        $value = isset($data[$key]) ? trim((string) $data[$key]) : '';
        if ($value === '') continue;
        if ($key === 'firstName' && !empty($data['name']) && $value === trim((string) $data['name'])) continue;
        $message .= $label . ": " . htmlspecialchars($value) . "\n";
    }
    if (isset($data['consent']) && $data['consent'] !== '') {
        $message .= "PDPA consent to be contacted: " . ($data['consent'] === 'yes' ? 'Yes' : 'No')
            . " (" . gmdate('Y-m-d H:i:s') . " UTC)\n";
    }

    // Set up email headers
    $headers = "From: " . $data['email'] . "\r\n";
    $headers .= "Reply-To: " . $data['email'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return mail($adminEmail, $subject, $message);
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read input data
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid request."));
        exit;
    }

    // Send email
    $success = sendEmail($data, $adminEmail);

    if ($success) {
        // Email sent successfully
        http_response_code(200);
        echo json_encode(array("message" => "Email sent successfully.", "code" => "200"));
    } else {
        // Failed to send email
        http_response_code(500);
        echo json_encode(array("message" => "Failed to send email."));
    }
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(array("message" => "Method Not Allowed"));
}
