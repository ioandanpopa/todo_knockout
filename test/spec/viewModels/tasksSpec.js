describe('TaskListViewModel', function() {
	var taskVM;

	beforeEach( function () {
		taskVM = new TaskListViewModel();
	});

	it('can add a new task', function () {
		taskVM.addTask();

		expect(taskVM.tasks().length).toBe(1);
	});

	describe('has tasks', function () {
		var task;
		
		beforeEach( function () {
			taskVM.addTask();
			taskVM.tasks()[0].isDone(true);
			taskVM.addTask();
			taskVM.addTask();
		});

		it('can remove a task', function () {
			taskVM.removeTask(taskVM.tasks()[0]);

			expect(taskVM.tasks().length).toBe(2);
		});

		it('calculates the correct incomplete tasks number', function () {
			expect(taskVM.incompleteTasksCount()).toEqual(2);
		});

		it('can remove completed tasks', function () {
			taskVM.clearCompleted();

			expect(taskVM.tasks().length).toEqual(2);
		});

		describe('toggle', function () {
			beforeEach( function () {
				taskVM.globalChecked(true);
			});

			it('can toggle all complete', function () {
				expect(taskVM.incompleteTasksCount()).toEqual(0);
			});

			it('can toggle all incomplete', function () {
				taskVM.globalChecked(false);

				expect(taskVM.incompleteTasksCount()).toEqual(3);
			});
		});
		
		describe('filtering', function () {
			it('updates the filter correctly', function () {
				taskVM.updateFilter('all');

				expect(taskVM.filter()).toBe('all');
			});	

			it('filters correctly for filter "all"', function () {
				taskVM.updateFilter('all');
				expect(taskVM.filteredTasks().length).toEqual(3);
			});

			it('filters correctly for filter "inWork"', function () {
				taskVM.updateFilter('inWork');

				expect(taskVM.filteredTasks().length).toEqual(2);
			});

			it('filters correctly for filter "completed"', function () {
				taskVM.updateFilter('completed');

				expect(taskVM.filteredTasks().length).toEqual(1);
			});
		});
		
	});
});
