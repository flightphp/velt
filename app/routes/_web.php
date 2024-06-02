<?php

Flight::route('POST /login', function (): void {
  // TODO: verify credentials

  if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
  }

  $_SESSION['auth.user.id'] = uniqid('USER_');
  $_SESSION['auth.user.email'] = Flight::request()->data->email;
  Flight::redirect('/');
});

Flight::route('/logout', function (): void {
  if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
  }

  unset($_SESSION['auth.user.id']);
  unset($_SESSION['auth.user.email']);
  Flight::redirect(Flight::request()->referrer);
});

// Customize routes whatever you like 💡
Flight::route('*', function () {
  Flight::render('layouts/base');
});
