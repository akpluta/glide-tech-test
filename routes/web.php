<?php
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => view('app'))->name('vendor-search-app');
