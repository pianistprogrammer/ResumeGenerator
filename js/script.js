var WizardController = function ($scope, $http, fileReader, $document, $window, $q, $timeout) {


  $scope.item = {};
  $scope.item.institutions = [];
  $scope.item.companies = [];
  $scope.item.skills = [];
  $scope.item.hobbies = [];
  $scope.wizard = {
    currentIndex: 1,
    total: 5
  };
  $scope.item.color = '#666666'

  $scope.item.genders = [
    { id: 1, label: 'Male' },
    { id: 2, label: 'Female' },
    { id: 3, label: 'Others' },
  ];

  $scope.item.gender = $scope.item.genders[0];
  $scope.item.maritalStatuses = [
    { 'id': 1, 'label': 'Single' },
    { 'id': 2, 'label': 'Married' },
    { 'id': 3, 'label': 'Divorced' },
    { 'id': 4, 'label': 'Seperated' },
    { 'id': 5, 'label': 'Complicated' },
  ];
  $scope.item.maritalStatus = $scope.item.maritalStatuses[0];

  $scope.item.institutions.push({});
  $scope.item.companies.push({});
  $scope.item.skills.push({});
  $scope.item.hobbies.push({});

  $scope.item.imageSrc = "";

  $scope.$on("fileProgress", function (e, progress) {
    $scope.progress = progress.loaded / progress.total;
  });

  $scope.addInstitution = function () {
    if ($scope.item.institutions === null) {
      $scope.item.institutions = [{}];
      return;
    }
    $scope.item.institutions.push({});
  };
  $scope.removeInstitution = function (index) {
    $scope.item.institutions.splice(index, 1);
  };

  // company and work experience
  $scope.addCompany = function () {
    if ($scope.item.companies === null) {
      $scope.item.companies = [{}];
      return;
    }
    $scope.item.companies.push({});
  };
  $scope.removeCompany = function (index) {
    $scope.item.companies.splice(index, 1);
  };

  // skill set
  $scope.addSkill = function () {
    if ($scope.item.skills === null) {
      $scope.item.skills = [{}];
      return;
    }
    $scope.item.skills.push({});
  };
  $scope.removeSkill = function (index) {
    $scope.item.skills.splice(index, 1);
  };

  // hobbies
  $scope.addHobby = function () {
    if ($scope.item.hobbies === null) {
      $scope.item.hobbies = [{}];
      return;
    }
    $scope.item.hobbies.push({});
  };
  $scope.removeHobby = function (index) {
    $scope.item.hobbies.splice(index, 1);
  };




  //Model
  $scope.currentStep = 1;
  $scope.steps = [
    {
      step: 1,
      name: "First step",
      template: "pages/personal.html"
    },
    {
      step: 2,
      name: "Second step",
      template: "pages/education.html"
    },
    {
      step: 3,
      name: "Third step",
      template: "pages/company.html"
    },
    {
      step: 4,
      name: "Fourth step",
      template: "pages/skills.html"
    },
    {
      step: 5,
      name: "Fifth step",
      template: "pages/hobbies.html"
    },
    {
      step: 6,
      name: "Sixth step",
      template: "pages/summary.html"
    },
  ];

  //Functions
  $scope.gotoStep = function (newStep) {
    $scope.currentStep = newStep;
  }

  $scope.getStepTemplate = function () {
    for (var i = 0; i < $scope.steps.length; i++) {
      if ($scope.currentStep == $scope.steps[i].step) {
        return $scope.steps[i].template;
      }
    }
  }
  $scope.animationsEnabled = true;

  function printElement(elem) {
    var domClone = elem.cloneNode(true);
    var $printSection = $window.document.getElementById('printSection');

    if (!$printSection) {
      $printSection = $window.document.createElement('div');
      $printSection.id = 'printSection';
      document.body.appendChild($printSection);
    }
    $printSection.innerHTML = '';
    $printSection.appendChild(domClone);
  }
  function print() {
    $timeout(function () {
      printElement($window.document.getElementById('inner-p'));
      $timeout($window.print, 0);
    }, 0);

  }



  $scope.submitForm = function () {
    if ($scope.item.skillPecentage > 100) {
      alert("% skill cannot be more than 100");
    }
    else {
      //console.log($scope.item);
      print();
    }


  }



}
WizardController.$inject = ["$scope", "$http", "fileReader", "$document", "$window", "$q", "$timeout"];

app.controller("WizardController", WizardController);

app.directive("ngFileSelect", function (fileReader, $timeout) {
  return {
    scope: {
      ngModel: '='
    },
    link: function ($scope, el) {
      function getFile(file) {
        fileReader.readAsDataUrl(file, $scope)
          .then(function (result) {
            $timeout(function () {
              $scope.ngModel = result;
            });
          });
      }

      el.bind("change", function (e) {
        var file = (e.srcElement || e.target).files[0];
        getFile(file);
      });
    }
  };
});

app.factory("fileReader", function ($q, $log) {
  var onLoad = function (reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function (reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function (reader, scope) {
    return function (event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function (deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function (file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});

