angular.module("myapp",['ngSanitize'])
    .controller("ctrlContent", function($scope,$http) {
        $scope.pg =  0;

        $scope.showProgress = false;
        $scope.showPagination = false;
        $scope.refreshPage = function () {
            $scope.showProgress = true;
            var data = $http({
                method: 'GET',
                url: '/api/review/'+$scope.pg
            }).then(function successCallback(response) {
                console.log(response);
                if (typeof response.data.results.errorMessage !== 'undefined') {
                    alert('Error:' +response.data.results.errorMessage);
                    $scope.prevPage();
                }
                else {
                    $scope.business_info = response.data.results.business_info;
                    $scope.reviews = response.data.results.reviews;
                    $scope.showProgress = false;
                    $scope.showPagination = true;
                    $scope.disablePrev = $scope.pg <= 0;
                    $scope.pageTotal = Math.round(( response.data.results.business_info.total_rating.total_no_of_reviews / response.data.perPage) - 1);
                    $scope.disableNext = $scope.pg >= $scope.pageTotal;
                    $scope.pgLabel = $scope.pg;
                }

            }, function errorCallback(response) {
                $scope.showProgress = false;
                $scope.showPagination = true;
                $scope.pg = $scope.pgLabel;
                alert('No response from api')
            });
        }
        $scope.nextPage = function () {
            $scope.pg++;
            $scope.refreshPage();
        }
        $scope.prevPage = function () {
            $scope.pg--;
            $scope.refreshPage();
        }
        $scope.refreshPage();
    });