app.controller('userCtrl', ['$scope', 'userService', function ($scope,  userService) {

    angular.element(document).ready(function () {
        $scope.get();
    });

    // #region decleration

    $scope.users = [];

    // #endregion

    $scope.get = function () {
        userService.getUsers().then(function (result) {
            $scope.users = result;
        });
    };

    $scope.delete = function (id) {
        var aa = confirm("Are you sure you want to delete.");
        if (aa) {
            userService.deleteUser(id).then(function () {
                $scope.get();
                alert("Deleted successfull.");
            }, function () {
               alert('Error while deleting user with id: ' + id);
            });
        }
    };

    $scope.edit = function (id) {
        console.log(id);
        window.open("/User/Edit/" + id);

    };

}]);

