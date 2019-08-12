var Waiting = (function () {
    function Waiting($window) {
        this.$window = $window;
        this.restrict = "A";
        this.link = function (scope, element, attrs) {
            scope.$watch('waiting', function (newValue) {
                if (newValue >= 1) {
                    $(element).waitMe({
                        effect: 'facebook',
                        text: '',
                        bg: 'rgba(255,255,255,0.7)',
                        color: '#0f8160'
                    });
                }
                else {
                    $(element).waitMe('hide');
                }
            });
        };
    }
    Waiting.directiveId = "waiting";
    return Waiting;
})();
// Update the app1 variable name to be that of your module variable
app.directive(Waiting.directiveId, ['$window', function ($window) {
        return new Waiting($window);
    }
]);
 
 