<?php

abstract class Notifier {
    protected $user;

    public function __construct($user) {
        $this->user = $user;
    }

    abstract public function send();
}

class EmailNotifier extends Notifier {
    private $email;

    public function __construct($user, $email) {
        parent::__construct($user);
        $this->email = $email;
    }

    public function send() {
        echo "Email sent to {$this->user}, user email: {$this->email} \n";
    }

    public function validateEmail() {
        return strpos($this->email, '@') !== false;
    }
}

class SmsNotifier extends Notifier {
    private $phoneNumber;

    public function __construct($user, $phoneNumber) {
        parent::__construct($user);
        $this->phoneNumber = $phoneNumber;
    }

    public function send() {
        echo "SMS sent to {$this->user}, user phone number: {$this->phoneNumber} \n";
    }

    public function validatePhoneNumber() {
        return preg_match('/^\d{10}$/', $this->phoneNumber);
    }
}

class NotificationService {
    private static $notificationCount = 0;
    private $notification;

    public function __construct(Notifier $notification) {
        $this->notification = $notification;
    }

    public function sendNotification() {
        $this->notification->send();
        self::$notificationCount++;
        return $this;
    }

    public function printNotificationCount() {
        echo "Total notifications sent: " . self::$notificationCount . "\n";
        return $this;
    }
}

$emailNotifier = new EmailNotifier("Mario Rossi", "mariorossi@live.it");
$smsNotifier = new SmsNotifier("Mario Rossi", "3474598675");

$service = new NotificationService($emailNotifier);
if ($emailNotifier->validateEmail()) {
    $service->sendNotification()->printNotificationCount();
}

$service = new NotificationService($smsNotifier);
if ($smsNotifier->validatePhoneNumber()) {
    $service->sendNotification()->printNotificationCount();
}
?>
