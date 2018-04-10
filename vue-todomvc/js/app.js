(function (window) {
	'use strict';
	// 需求分析
	//1、展示数据(在index.html完成)
	//2、添加任务数据（add）
	//3、删除任务数据 (remove)
	//4、编辑任务数据(在index.html完成)
	//5、切换任务完成状态(在index.html完成)
	//6、批量切换任务状态(toggleAll)
	//7、清除已完成的功能，并隐藏或显示清楚按钮(clearAll,isShow)
	//8、显示未完成任务数(activeNum)
	//9、切换不同状态任务的显示
	//10、本地存储
	window.storage = {
		getTasks:function(){
			return JSON.parse(window.localStorage.getItem('todos')||'[]');
		},
		setTasks:function(json){
			window.localStorage.setItem('todos',JSON.stringify(json));
		}
	};
	window.app = new Vue({
		el:".todoapp",
		data:{
			count:0,
			newTask:"",
			isEditing:-1,
			status:true,
			tasks:storage.getTasks(),
			flag:"/"
		},
		computed:{
			activeNum:function(){
				this.count = 0;
				for(var i=0;i<this.tasks.length;i++){
					if(!this.tasks[i].completed){
						this.count++;
					}
				}
				return this.count;
			}
		},
		methods:{
			remove:function(id){
				for(var i=0;i<this.tasks.length;i++){
					var item = this.tasks[i];
					if(item.id == id){
						this.tasks.splice(i,1);
						storage.setTasks(this.tasks);
						return;
					}
				}
			},
			add:function(){
				if(this.newTask.trim()==""){
					return;
				}
				var newItem = {
					id:this.tasks.length>0?this.tasks[this.tasks.length-1].id+1:0,
					name:this.newTask.trim(),
					completed:false
				};
				this.tasks.push(newItem);
				this.newTask = "";
				storage.setTasks(this.tasks);
			},
			toggleAll:function(){
				this.status = !this.status;
				for(var i=0;i<this.tasks.length;i++){
					this.tasks[i].completed = this.status;
				}
				storage.setTasks(this.tasks);
			},
			clearAll:function(){
				for(var i=this.tasks.length-1;i>=0;i--){
					if(this.tasks[i].completed){
						this.tasks.splice(i,1);
					}
				}
				storage.setTasks(this.tasks);
			},
			isShow:function(){
				for(var i=this.tasks.length-1;i>=0;i--){
					if(this.tasks[i].completed){
						return true;
					}
				}
				return false;
			},
			show:function(completed){
				if(this.flag=="/"){
					return true;
				}else{
					if(this.flag.completed==completed){
						return true;
					}else{
						return false;
					}
				}
			}
		},

	});
	var routes = {
		"/":function(){
			app.flag = "/"
		},
		"/active":function(){
			app.flag ={completed:false}
		},
		"/completed":function(){
			app.flag ={completed:true}
		}
	};
	var router = Router(routes);
	router.init();

})(window);
