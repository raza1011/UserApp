app.controller('editUserCtrl', ['$scope', 'userService', function ($scope, userService) {
    $scope.user = {};

    angular.element(document).ready(function () {
        getUserById();

    });

    var getUserById = function () {
        var id = $("#hidId").val();
        userService.getUserById(id).then(function (result) {
            $scope.user = result;
        }, function () {
            alert('Error in feteching user with id: ' + id);
        });
    };

    $scope.edit = function () {
        userService.editUser($scope.user).then(function () {
            alert('User updated successfully.');
            window.location.href ='/User';
        }, function () {
            alert('Error in updating user.');
        });
    };
}]);