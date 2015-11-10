function ViewModel()
{
	this.recordCount = ko.observable(61);
	this.pageSize = ko.observable(10);
	this.page = ko.observable(1);
	this.numberOfLinks = ko.observable(5);
	
	this.pessoas = ko.observableArray([])
	this.page.subscribe((p) => {
		console.log(p);
		
		//Do AJAX calls here
	});
}

var vm = new ViewModel();
ko.applyBindings(vm);

//Try to change these observables on Console
//vm.recordCount(10);
//vm.recordCount(50);