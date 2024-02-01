<?php

/** Absolute path to project root */
const ROOT = __DIR__ . '/..';

require ROOT . '/vendor/autoload.php';

function root(): string {
  return str_replace('/index.php', '', $_SERVER['SCRIPT_NAME']);
}

Flight::set('flight.views.path', ROOT . '/app/views');
require ROOT . '/app/routes/index.php';
Flight::start();
