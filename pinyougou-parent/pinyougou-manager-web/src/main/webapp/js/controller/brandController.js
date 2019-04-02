app.controller('brandController',function ($controller,$scope,$http,brandService) {

    $controller('baseController',{$scope:$scope});

    $scope.findAll=function () {
        brandService.findAll().success(
            function (response) {
                $scope.list=response;
            }
        );
    };



    //分页
    $scope.findPage=function (page,size){
        brandService.findPage(page,size).success(
            function (response) {
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;
            }
        )
    };

    $scope.save=function () {
        var serviceObject;
        if ($scope.entity.id != null){
            serviceObject = brandService.update($scope.entity);
        }else {
            serviceObject = brandService.add($scope.entity);
        }
        serviceObject.success(
            function (response) {
                if (response.success){
                    $scope.reloadList();
                }else {
                    alert(response.message);
                }
                $scope.entity={};
            }
        )
    };

    $scope.clear=function () {
        $scope.entity={};
    };



    //删除
    $scope.delet=function () {
        if (confirm("确认要删除吗?")){
            brandService.delet($scope.selectIds).success(
                function (response) {
                    if (response.success){
                        alert("删除成功");
                        $scope.selectIds=[];
                        $scope.reloadList();

                    }else {
                        $scope.selectIds=[];
                        alert(response.message);
                    }
                }
            )
        }
    };

    $scope.findOne=function(id){

        brandService.findOne(id).success(
            function (response) {
                $scope.entity=response;
            }
        )
    };

    $scope.searchEntity={};
    $scope.search=function (page,size) {

        brandService.search(page,size,$scope.searchEntity).success(
            function (response) {
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;
            }
        )
    }
});