<?php

/** Absolute path to project root */
const ROOT = __DIR__ . '/..';

require ROOT . '/vendor/autoload.php';

Flight::set('flight.views.path', ROOT . '/app/views');
require ROOT . '/app/routes/index.php';
Flight::start();
