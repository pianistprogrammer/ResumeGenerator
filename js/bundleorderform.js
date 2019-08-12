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
var BundleOrderFormCtrl = function ($scope, $http, $filter) {
    $scope.item = {};

    $scope.item.total = $("#amount").val();
    $scope.item.email = $("#email").val();
    $scope.item.phoneNumber = $("#phoneNumber").val();
    $scope.item.bundle_id = $("#bundle_id").val();
    $scope.item.bundle_name = $("#bundle_name").val();

    var url = (window.location).href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    $scope.item.id = id;

    function payWithPaystack(){
        var handler = PaystackPop.setup({
            key: 'pk_test_f9221260db4c2f1a2a3f5be4dc904e716dcdb0e3',
            email: $scope.item.email,
            amount: $scope.item.total *100,
            ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            metadata: {
                custom_fields: [
                    {
                        display_name: "Mobile Number",
                        variable_name: "mobile_number",
                        value: $scope.item.phoneNumber
                    }
                ]
            },
            callback: function(response){
                //toastr.success('success. transaction ref is ' + response.reference);
                $scope.item.ref_number = response.reference;
                $http.post("/orders/bundles" , $scope.item).success(function(data) {
                    $scope.bundles = data;
                    window.location.href="/profile/bundles";
                }).error(function(response) {
                    window.location.href="/orders/orderfailed";

                });
            },
            onClose: function(){
                window.location.href="/orders/orderfailed";
                //alert('window closed');

            }
        });
        handler.openIframe();
    }


    $scope.submitForm = function()
    {
        payWithPaystack()

    }


}

BundleOrderFormCtrl.$inject = ["$scope", "$http", "$filter"];
var app = angular.module('app', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
});
app.controller("BundleOrderFormCtrl", BundleOrderFormCtrl);

