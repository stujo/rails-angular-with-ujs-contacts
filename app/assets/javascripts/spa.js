// Manifest file for the spa app
// Only loaded on spa page

var contacts = angular.module('contacts');

console.log('SPA Loaded');

// Mostly from http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/


contacts.factory('Contacts', ['$resource',
    function($resource) {

        function nestData(data, headersGetter) {
            return JSON.stringify({
                contact: data
            });
        };

        return $resource('/api/v1/contacts/:id.json', {
            id: '@id'
        }, {
            'index': {
                method: 'GET',
                isArray: true
            },
            'show': {
                method: 'GET',
                isArray: false
            },
            'create': {
                method: 'POST',
                transformRequest: nestData
            },
            'save': {
                method: 'PUT',
                transformRequest: nestData
            },
            'destroy': {
                method: 'DELETE'
            }
        }); // Note the full endpoint address
    }
]);

contacts.controller('ContactsController', ['$scope', '$filter', 'Contacts',
    function($scope, $filter, Contacts) {

        // Exports to Scope
        $scope.doubleName = doubleName;
        $scope.reloadContacts = reloadContacts;
        var loading;

        loadContacts();

        function reloadContacts() {
            loadContacts();
        }

        function loadContacts() {
            if (!loading) {
                // Query returns a promise which automatically updates the scope
                // when it returns
                loading = Contacts.query();
                loading.$promise.then(function(result) {
                    $scope.contacts = result;
                    loading = undefined;
                });
            }
        }

        function doubleName(contact) {
            Contacts.save({
                id: contact.id,
                name: contact.name + ':' + contact.name
            }, function(data) {
                updateContactInScope(data);
            });
        }

        function createContact(data) {
            Contacts.save({
                name: data.name,
                phone: data.phone
            });
        }

        function updateContactInScope(contact) {
            for (var i = 0; i < $scope.contacts.length; i++) {
                if ($scope.contacts[i].id == contact.id) {
                    $scope.contacts[i] = contact;
                    return;
                }
            }
            $scope.contacts.push(contact);
        }
    }
]);
