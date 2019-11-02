(function() {
"use strict";
/**
 * Public restaurant application. Includes the common module and ui-router.
 */
angular.module('public')
.controller('myRegisterController', myRegisterController)
.controller('myInfoController',myInfoController)
.controller('checkDummyController', checkDummyController)
.service('aboutMeService', aboutMeService);


function checkDummyController(){};


myRegisterController.$inject = ['aboutMeService','data']
function myRegisterController(aboutMeService,data) {
  var mrCtrl = this;


  mrCtrl.showSubmitted = false;



  mrCtrl.all_menu_items_shortname = []

  mrCtrl.check = ''
  for (var i = 0; i <data.data.menu_items.length; i++) {
    mrCtrl.all_menu_items_shortname.push(data.data.menu_items[i].short_name)
    mrCtrl.check += data.data.menu_items[i].short_name+'|'
  }

  mrCtrl.abc = 'form-element-box'


  mrCtrl.obj = {};



  mrCtrl.isInMyArray = function(value) {
        if (mrCtrl.possibleInputValues.indexOf(value) !== -1) {
            return true
        }
        return false;
    }

  mrCtrl.submit = function(){
      aboutMeService.registerMe(mrCtrl.obj);
      aboutMeService.store_data(data);
      mrCtrl.showSubmitted = true;
    };
};

myInfoController.$inject = ['aboutMeService']
function myInfoController(aboutMeService) {

  var miCrtl = this;
  miCrtl.getMyInfo = aboutMeService.getInfo();
  miCrtl.getWholeData = aboutMeService.sendWholeData();

  miCrtl.getFavObject = aboutMeService.sendMainItemData();
}


function aboutMeService(){
  var service = this;

  service.store_data = function (data){
    console.log('data stored')
    service.mainData = data;
  }

  service.registerMe = function (obj){
    service.obj = obj;

  };

  service.getInfo = function (){
    return service.obj;
  };

  service.sendWholeData = function(){
    return service.mainData;
  }

  service.sendMainItemData = function(){
    if (service.obj != undefined){

      for (var i = 0; i < service.mainData.data.menu_items.length; i++) {
        if (service.mainData.data.menu_items[i].short_name.indexOf(service.obj.favMenuItem) != -1) {

          return service.mainData.data.menu_items[i];
        }
      };
    //

    }
    else {
      return 'Haha'
    }
    ;
  }

};

})();
