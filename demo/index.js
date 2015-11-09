function ViewModel()
{
	this.recordCount = ko.observable(61);
	this.pageSize = ko.observable(5);
	this.page = ko.observable(1);

	this.page.subscribe(p => {
		console.log("page", p);
		//Do AJAX calls here
	});
}

var vm = new ViewModel();
ko.applyBindings(vm);

//Try to change these observables on Console
//vm.recordCount(10);
//vm.recordCount(50);