# knockoutjs
Useful KnockoutJS scripts

## Bootstrap components

### Pagination control

A component for display a pagination control that can be easily binded with a ViewModel.
Just create your observable properties and bind them with the component to initialize it.

In your HTML
```html
<html>
	<head></head>	
	<body>
		<ko-pagination 
			params="recordCount : myRecordCount, 
					pageSize : myPageSize, 
					page: myPage, 
					numberOfLinks : myNumberOfLinks,
					labels : { first: 'First', last : 'Last', prev: 'Prev', next: 'Next', infoInitial : 'You are viewing page', infoOf: 'of' }">
		</ko-pagination>
		
		<script src="//cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min.js"></script>
		<script src="../dist/bootstrap/knockout-comp-pagination.js"></script>
		<script src="myJSFile.js"></script>
	</body>
</html>
```

In your JS file
```javascript
function ViewModel()
{
	this.myRecordCount = ko.observable(6);	//total of records 
	this.myPageSize = ko.observable(5);		//items per page
	this.myPage = ko.observable(1);			//current page
	this.myNumberOfLinks = ko.observable(5); //number of links to display

	//Subscribe for page change
	this.myPage.subscribe(p => {
		console.log("page", p);
		//Do AJAX calls here
	});
}

var vm = new ViewModel();
ko.applyBindings(vm);
```