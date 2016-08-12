var demo = angular.module('demo', [],
  function($interpolateProvider) {
    $interpolateProvider.startSymbol('[!');
    $interpolateProvider.endSymbol('!]');
}) /// - binding style

demo.controller('ctrl', function ($scope, $location, $q, $http ){

    $scope.openList = 'no';
    $scope.openInfo = 'no';
    $scope.openHome = 'yes';
    $scope.countryList = [];
    $scope.countryDetail = [];
    $scope.neighborInfo = [];
    $scope.noNeighbors = "";

    /// - default values

    $scope.browseCountries = function () { $scope.openList = 'yes'; $scope.openHome = 'no'; $scope.openInfo = 'no'; $scope.neighborInfo=[]; } 
    $scope.returnHome = function () { $scope.openList = 'no'; $scope.openHome  = 'yes'; $scope.openInfo = 'no'; $scope.neighborInfo=[]; };

    $http ({ url: "http://api.geonames.org/countryInfoJSON?username=aleahmanzi", method: 'JSONP', params: {callback: 'JSON_CALLBACK'} })
     .success(function(result){
       //console.log(result);
       $scope.countryList = result['geonames'];   
    }); /// - when successfully loaded, return country list values and show
    
    $scope.countryInfo = function(countryCode){ 
        $scope.openList = 'no'; 
        $scope.openInfo = 'yes';
        
        $http ({ url: "http://api.geonames.org/countryInfoJSON?country=" + countryCode + "&username=aleahmanzi", method: 'JSONP', params: { callback: 'JSON_CALLBACK', } })

          .success(function(data){
            //console.log(data);
            $scope.countryDetail = data['geonames'];
          })

         $http ({ url: "http://api.geonames.org/neighboursJSON?country=" + countryCode + "&username=aleahmanzi", method: 'JSONP', params: { callback: 'JSON_CALLBACK'} })

            .success(function(info){
                //console.log(info);

                if (info.geonames.length > 0) { $scope.neighborInfo = info['geonames']; }
                else { $scope.noNeighbor = "no neighbors :(" }
            })

    }; /// - when clicking on specific country, show details

    
});/// - ctrl