<?php

/** Absolute path to project root */
const ROOT = __DIR__ . '/..';

require ROOT . '/vendor/autoload.php';

Flight::set('flight.views.path', ROOT . '/src/views');
require ROOT . '/src/routes/index.php';
Flight::start();
