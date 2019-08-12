var toastr;
toastr.options = {
    "closeButton": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
var BundleOrderCtrl = function($scope, $http, $filter) {
    $scope.item = {};

    var url = (window.location).href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    $scope.item.id = id;

    var xItems = {};

    $http.get("/userbundles/order/" + $scope.item.id, $scope.item).success(function(data) {
        $scope.item.bundles = data;
        xItems = angular.copy(data);
    }).error(function(response) {
        toastr.error("could not find bundle");
    });

    $scope.quantityChanged = function(item) {
        var x = $filter('filter')($scope.item.bundles, { id: item.id })[0];
        var xy = $filter('filter')(xItems, { id: item.id })[0];
        console.log(xItems)
        var diff = parseInt(x.quantityLeft - item.orderQuantity);
        item.quantityLeft = x.quantityLeft;

        if (item.orderQuantity > x.quantityLeft) {
            alert("bundle item quantity exceeded");
            item.orderQuantity = 0;
            item.quantityLeft = x.quantityLeft;
        } else if (item.orderQuantity == null) {

            item.quantityLeft = xy.quantityLeft;
        } else {
            item.quantityLeft = diff;
        }

    }
    $scope.submitForm = function() {
        var pickupdt = moment($("#pickupDt").val(), 'DD/MM/YYYY', true).format('YYYY-MM-DD');
        $scope.item.pickupDate = pickupdt;
        var pickuptm = moment($("#pickupTm").val(), ["h:mm A"], true).format('HH:mm:ss');
        $scope.item.pickupTime = pickuptm;
        $scope.item.order_number = $("#order_number").val();
        console.log($scope.item);


        $http.post("/userbundles/order", $scope.item).success(function(data) {
            $scope.bundles = data;
            window.location.href = "/profile/bundles";
        }).error(function(response) {
            window.location.href = "/orders/orderfailed";

        });
    }

}

BundleOrderCtrl.$inject = ["$scope", "$http", "$filter"];
var app = angular.module('app', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
});
app.controller("BundleOrderCtrl", BundleOrderCtrl);