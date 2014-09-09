function Task(data){
	this.title = ko.observable(data.title);
	this.isDone = ko.observable(false);
}

function TaskListViewModel() {
	var self = this;

	self.tasks = ko.observableArray([]);
	self.newTaskText = ko.observable();

	self.globalChecked = ko.observable(false);
	self.filter = ko.observable('all');

	self.addTask = function () {
		self.tasks.push(new Task({ title: this.newTaskText() }));
		self.newTaskText('');
	};

	self.removeTask = function (task) {
		self.tasks.remove(task);		
	};

	self.updateFilter = function (val) {
		self.filter(val);
	};

	self.clearCompleted = function () {
		self.tasks.remove(function (task) { return task.isDone() })
	};

	self.filterTasks = function (taskState) {
		return ko.utils.arrayFilter(self.tasks(), function (task) { return task.isDone() == taskState });
	};

	self.globalChecked.subscribe(function (value) {
		self.tasks().forEach(function (task) {
			task.isDone(value);
		});
	}, 'change');

	self.filteredTasks = ko.computed(function () {
		if(self.filter() == 'all'){
			return self.tasks();
		} else {			
			return self.filterTasks(self.filter() == 'inWork' ? false : true);
		}
	});	

	self.incompleteTasksCount = ko.computed(function () {
		return self.filterTasks(false).length;
	});	
}

ko.applyBindings(new TaskListViewModel());