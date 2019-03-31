
app.controller('addUserCtrl', ['$scope', 'userService', function ($scope, userService) {

    $scope.user = {};
    $scope.add = function () {
        userService.addUser($scope.user).then(function () {
            alert('User added successfully.');
            window.location.href = '/User';
        }, function () {
            alert('Error in adding user.');
        });
    };
}]);