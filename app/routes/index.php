<?php

foreach (glob(__DIR__ . '/_*.php') as $fileName) {
  require $fileName;
}
