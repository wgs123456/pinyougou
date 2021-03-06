 //控制层 
app.controller('itemCatController' ,function($scope,$controller  ,itemCatService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;
				$scope.entity.typeId=JSON.parse($scope.entity.typeId);
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象
		$scope.entity.parentId=$scope.parentId;


        $scope.entity.typeId=$scope.entity.typeId.id;
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}

		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	//$scope.reloadList();//重新加载
					$scope.findByParentId($scope.parentId);
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框
		if (confirm("确定要删除吗？")){
            itemCatService.dele( $scope.selectIds ).success(
                function(response){
                    if(response.success){
                        alert(response.message);
                        $scope.selectIds=[];
                        // window.location.reload();
                        $scope.reloadList();//刷新列表
                    }else {
                    	alert(response.message);
                        $scope.selectIds=[];
                        //  window.location.reload();
                        $scope.reloadList();//刷新列表
					}
                }
            );
        }

	}

	$scope.findTem=function (tid) {
        itemCatService.findTem(tid).success(
        	function (response) {
				$scope.typeTem=response;
            }
		)
    }
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
    //根据父id查询下一级数据
	$scope.findByParentId=function (parentId) {
		$scope.parentId=parentId;
        itemCatService.findByParentId(parentId).success(
        	function (response) {
				$scope.list = response;
            }
		)
    }

    //查看模板id数据
    $scope.findIdsList=function () {
        itemCatService.findIdsList().success(
            function (response) {
                $scope.idsList = {data:response};
            }
        )
    }
    //设置分类级别
	$scope.grade=1;
	$scope.setGrade=function (value) {
		$scope.grade=value;
    }
    //设置面包屑（分类导航列）
	$scope.findList=function (p_entity) {
		if ($scope.grade == 1){
			$scope.entity_1=null;
			$scope.entity_2=null;
		}
		if ($scope.grade == 2){
			$scope.entity_1=p_entity;
			$scope.entity_2=null;
		}
		if ($scope.grade == 3){
			$scope.entity_2=p_entity;
		}

		$scope.findByParentId(p_entity.id);
    }
    //定义父id
	$scope.parentId=0;
});	
