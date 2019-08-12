var WizardValidation = (function () {
    function WizardValidation($window, $timeout) {
        this.$window = $window;
        this.$timeout = $timeout;
        this.restrict = "A";
        this.link = function (scope, element, attrs) {
            
            var $form2 = jQuery(element).find('form');
            $form2.on('keyup keypress', function (e) { 
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                    return false;
                }
            });
            // Init form validation on the other wizard form
            var $validator2 = $form2.validate($.extend({
                errorElement: 'span',
                errorClass: 'help-block',
                focusInvalid: false,
                invalidHandler: function (event, validator) {
                    $('.alert-danger', $(element)).show();
                },
                highlight: function (e) {
                    if ($(e).closest('.ms-field').length)
                        $(e).closest('.ms-field').addClass('has-error'); // set error class to the control group
                    else
                        $(e).closest('div').addClass('has-error');
                },
                success: function (label) {
                    if (label.closest('.ms-field').length)
                        label.closest('.fms-field').removeClass('has-error');
                    else {
                        label.closest('div').removeClass('has-error');
                    }
                    label.remove();
                },
                errorPlacement: function (error, e) {
                    if ($(e).parent('label').length) {
                        error.insertAfter($(e).parent('label'));
                    } 
                    else {
                        error.insertAfter(e);
                    }
                },
                submitHandler: function (form) {
                    scope.$apply(function () {
                        scope.submitForm();
                    });
                }
            }, scope.validationRule));
            // Init wizard with validation
            jQuery(element).find('.js-wizard-validation').bootstrapWizard({
                'tabClass': '',
                'previousSelector': '.wizard-prev',
                'nextSelector': '.wizard-next',
                'onTabShow': function ($tab, $nav, $index) {
                    var $total = $nav.find('li').length;
                    var $current = $index + 1; 
                    // Get vital wizard elements
                    var $wizard = $nav.parents('.js-wizard-validation');
                 
                    var $btnNext = $wizard.find('.wizard-next');
                    var $btnFinish = $wizard.find('.wizard-finish');
                    // If it's the last tab then hide the last button and show the finish instead
                    if ($current >= $total) {
                        $btnNext.hide();
                        $btnFinish.show();
                    }
                    else {
                        $btnNext.show();
                        $btnFinish.hide();
                    }
                    scope.$broadcast('wizardTabChanged', $current);
                },
                'onNext': function ($tab, $navigation, $index) {
                    var $valid = $form2.valid();
                    if (!$valid) {
                        $validator2.focusInvalid();
                        return false;
                    }
                },
                onTabClick: function ($tab, $navigation, $index) {
                    return false;
                }
            });
        };
    }
    WizardValidation.directiveId = "validationWizard";
    return WizardValidation;
}());
// Update the app1 variable name to be that of your module variable
app.directive(WizardValidation.directiveId, ['$window', "$timeout", function ($window, $timeout) {
        return new WizardValidation($window, $timeout);
    }
]);
//# sourceMappingURL=wizardValidation.js.map