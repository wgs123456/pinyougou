app.controller('baseController',function ($scope) {
    //分页控件配置currentPage:当前页   totalItems :总记录数  itemsPerPage:每页记录数  perPageOptions :分页选项  onChange:当页码变更后自动触发的方法
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.reloadList();
        }
    };

    $scope.reloadList=function () {
        //$scope.findPage($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
    };

    //定义选择的id集合
    $scope.selectIds=[];
    $scope.deleteSelected=function ($event,id) {
        if ($event.target.checked){
            // alert("选择了");
            $scope.selectIds.push(id);
        }else {
            // alert("未选择");
            var index = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(index,1);
            //$scope.selectIds.pop(id);
        }
    };


    $scope.selectAll=function ($event) {
        $scope.selectIds=[];
        if($event.target.checked){
            for(var i = 0; i<$scope.list.length ;i++){
                $scope.selectIds.push($scope.list[i].id)
            }
        }
    };

    $scope.jsonToString=function (jsonString,key) {
      var json = JSON.parse(jsonString);
      var value="";
      for ( var i =0;i<json.length;i++){
          if(i>0){
              value += ",";
          }
         value += json[i][key];
      }
      return value;
    }
});