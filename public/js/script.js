angular.module('grade', [])

  .controller('doGrade', ['$scope','$http',function($scope,$http) {

    $scope.formData = {};

    $http.get('/api/todos')
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });


    $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

    // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };


  $scope.calgrade = function(){

    var sumGrade = 0;
    var sumCredit = 0;

      
      for(var i=0; i<$scope.todos.length;i++)
      {
        var grade =  $scope.todos[i];
        sumCredit += grade.credit*1;
        sumGrade += ConvertGrade(grade.grade)*grade.credit;
        console.log(sumGrade);
      }
      return sumGrade/sumCredit;


  }

  function ConvertGrade(str)
  {
      switch(str)
      {
        case "A" : return 4; 
        case "B+" : return 3.5;
        case "B" : return 3;
        case "C+" : return 2.5;
        case "C" : return 2;
        case "D+" : return 1.5;
        case "D" : return 1;
        case "F" : return 0;
      }
  }

  }]);