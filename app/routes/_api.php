<?php

Flight::route('/api/flight/version', function () {
  // Don't do this in your houses, only for testing purposes 🚫
  $composer = json_decode(file_get_contents(ROOT . '/composer.json'), true);
  $version = $composer['require']['flightphp/core'];

  echo $version;
});
