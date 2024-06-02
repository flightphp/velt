<?php

Flight::route('/api/flight/version', function (): void {
  // Don't do this in your houses, only for testing purposes 🚫
  $composer = json_decode(file_get_contents(ROOT . '/composer.json'), true);
  $version = $composer['require']['flightphp/core'];

  echo $version;
});

Flight::route('/api/auth', function (): void {
  if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
  }

  $userId = $_SESSION['auth.user.id'] ?? null;
  $userEmail = $_SESSION['auth.user.email'] ?? null;

  Flight::json([
    'isLogged' => $userId !== null,
    'email' => $userEmail
  ]);
});
