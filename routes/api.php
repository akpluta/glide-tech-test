<?php
use Illuminate\Support\Facades\Route;

Route::namespace('App\Http\Controllers\Resources')->group(function () {

    Route::prefix('organisation')->group(function () {
        Route::get('/', 'OrganisationController@index');
        Route::get('/lookup/{mac}', 'OrganisationController@lookup');
        Route::post('/lookup', 'OrganisationController@lookupMultiple');
    });

});
