<?php
define("RECAPTCHA_V3_SECRET_KEY", '6Lc6t18qAAAAACWq8v3zB-M4eUdrlp95RXA16BuE');

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    
    $name = fil('name');
    $email = fil('email');
    $message = fil('message');
    $token = $_POST['token'];
    $action = 'submit';


    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        resp(false, 'Неверный email');
    }


    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('secret' => RECAPTCHA_V3_SECRET_KEY, 'response' => $token)));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    $arrResponse = json_decode($response, true);

    if($arrResponse["success"] === true && $arrResponse["action"] == $action && $arrResponse["score"] >= 0.5){
        
        $content = '
        <p><b>Name:</b> '.$name.'</p>
        <p><b>Email:</b> '.$email.'</p>
        <p><b>Your message:</b> '.$message.'</p>
        ';

        $headers = "From: karina.kolesnichenko@outlook.com\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n";
        $headers .= "X-Mailer: PHP mail script";

        $mail_sent = mail('karina.kolesnichenko@outlook.com', 'Send Me A Message', $content, $headers);

        if ($mail_sent) {
            resp(true, 'Письмо успешно отправлено!');
        } else {
            resp(false, 'Не удалось отправить письмо');
        }
    } else {
        resp(false, 'Ошибка reCAPTCHA');
    }

} else {
    resp(false, 'Неправильный метод отправки');
}

function resp($status=true, $message=''){
    exit(json_encode([
        'status' => $status,
        'message'=> $message
    ], 256));
}

function fil($name){
    return htmlspecialchars(stripslashes(trim($_POST[$name])));
}
