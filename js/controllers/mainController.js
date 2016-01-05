angular
  .module('picturemeApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', 'Upload', 'API_URL', '$rootScope', '$timeout', '$http'];
function MainController($auth, Upload, API_URL, $rootScope, $timeout, $http) {

  var self = this;

  self.files = [];
  self.images = [];
  self.faceFile = null;
  self.facePicture = null;

  function getUser() {
    $http
      .get(API_URL + '/user')
      .then(function(res) {
        console.log(res);
        self.images = res.data.user.images;
        self.facePicture = res.data.user.picture;
      });
  }


  $rootScope.$on('$stateChangeSuccess', function() {
    getUser();
    $timeout(function() {
      initializeMasonryGrid();
      console.log(self.facePicture);
      $('.grid').css('background-image', "url("+self.facePicture+")");
    },250);
  });

  this.authenticate = function(provider) {
    $auth.authenticate(provider);
  }

  this.logout = function() {
    $auth.logout();
    self.files = [];
    self.images = [];
    
  }

  this.deleteUserAccount = function() {
    $http
      .delete(API_URL + '/user')
      .then(function(res) {
        self.logout();
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  this.deleteUserImages = function() {
    $http
    .delete(API_URL + '/user/pictures')
    .then(function(res) {
      self.logout();
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  this.file = null;

  this.uploadFace = function() {
    Upload.upload({
       url: API_URL + '/upload/face',
       data: { file: self.faceFile }
     })
     .then(function(res) {
      self.facePicture = res.data.picture;
       console.log("Success!");
       console.log(res);
     })
     .catch(function(err) {
       console.log("Error!");
       console.log(err);
     });
  }
  this.uploadSingle = function() {
    
    Upload.upload({
      url: API_URL + '/upload/single',
      data: { file: self.file }
    })
    .then(function(res) {
      console.log("Success!");
      console.log(res);
    })
    .catch(function(err) {
      console.log("Error!");
      console.log(err);
    });
  }

  this.uploadMulti = function() {
    self.errorMessage = null;
    self.files = [];

    self.questions.forEach(function(question) {
      if(question.file) { self.files.push(question.file); }
    });

    // if(self.files.length === this.questions.length) {
      Upload.upload({
        url: API_URL + '/upload/multi',
        arrayKey: '', // IMPORTANT: without this multer will not accept the files
        data: { files: self.files }
      })
      .then(function(res) {
        console.log("Success!");
        self.images = res.data.filenames;
      })
      .catch(function(err) {
        console.error(err);
      });
    // }
    // else {
    //   self.errorMessage = "Please add an image for each question.";
    // }
  }
  this.questions = [
    { text: "1. A picture of yourself as a child", file: null },
    { text: "2. A picture of your favourite place in the universe", file: null },
    { text: "3. A picture of best friend growing up", file: null },
    { text: "4. A picture of your best friend as an adult", file: null },
    { text: "5. A picture of your life changing event", file: null },
    { text: "6. A picture of your favourite home", file: null },
    { text: "7. A picture of your favourite food", file: null },
    { text: "8. A picture of your favourite sport", file: null },
    { text: "9. A picture of your saddest memory", file: null },
    { text: "10. A picture of your happinest moment", file: null },
    { text: "11. 10 more favourite pictures", file: null },
    { text: "12. A picture of your favourite place in the universe", file: null },
    { text: "13. A picture of best friend growing up", file: null },
    { text: "14. A picture of your best friend as an adult", file: null },
    { text: "15. A picture of your life changing event", file: null },
    { text: "16. A picture of your favourite home", file: null },
    { text: "17. A picture of your favourite food", file: null },
    { text: "18. A picture of your favourite sport", file: null },
    { text: "19. A picture of your saddest memory", file: null },
    { text: "20. A picture of your happinest moment", file: null },
    { text: "21. A picture of your favourite home", file: null },
    { text: "22. A picture of your favourite food", file: null },
    { text: "23. A picture of your favourite sport", file: null },
    { text: "24. A picture of your saddest memory", file: null },
    { text: "25. A picture of your happinest moment", file: null }
   
  ];


}

