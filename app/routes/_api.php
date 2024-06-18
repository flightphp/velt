<?php

Flight::route('/api/versions', function (): void {
  // Don't do this in your houses, only for testing purposes 🚫
  $composerJson = json_decode(file_get_contents(ROOT . '/composer.json'), true);
  $packageJson = json_decode(file_get_contents(ROOT . '/package.json'), true);

  echo json_encode([
    $composerJson['require']['flightphp/core'],
    $packageJson['devDependencies']['svelte']
  ]);
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
