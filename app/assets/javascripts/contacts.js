// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


/* 'angular.ujs' DO NOT depend on 'ng-rails-csrf' module.
* You need to include it yourself.
*/  
// This needs to be here because of the angular.ujs which is used on 
// All pages not just the spa page
// The goal is to load the bulk of the app only on the spa page,
// But this is a Proof of Concept and we may not be able to 
// do that and still use the ujs on all the pages
//
var contacts = angular.module('contacts', [
  'ngResource',
  'angular.ujs', 
  'ng-rails-csrf' 
]);




