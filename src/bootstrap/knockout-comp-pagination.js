/**
 * Boostrap Pagination Component
 * BabelJS/ECMAScript 6
 */
ko.components.register('ko-pagination', {
	viewModel: function(params) {
		this.page = params.page || ko.observable(1);	//current page
		this.recordCount = params.recordCount;			//total of entries
		this.pageSize = params.pageSize;				//items per page

		//Number of links between Previous and Next buttons	
		this.numberOfLinks = ko.isObservable(params.numberOfLinks) ? params.numberOfLinks : ko.observable(params.numberOfLinks || 5);	//number of numeric links
		
		//Total of pages based on the number of records
		this.pageCount = ko.computed(() => {
			var rc = this.recordCount(),
				ps = this.pageSize(),
				pages = Math.floor(rc/ps);

			if (rc < ps) 
				return 1;

			if (rc % ps)
				pages++;
			return pages;
		}, this);

		//Link generation
		this.pageList = ko.computed(() => {
			var links = this.numberOfLinks(),
				pages = this.pageCount(),
				page = this.page(),
				prev = {
					index : page > 1 ? page - 1 : 1,
					text : params.labelPrev || "Previous", //Previous
					enabled : page > 1,
					active : false
				},
				next = {
					index : page < pages ? page + 1 : pages,
					text : params.labelNext || "Next", //Next
					enabled : page < pages,
					active : false
				};
			
			if (links > pages)
				links = pages;

			var start = page + links-1 > pages ? pages - links+1 : page;

			var list = ko.utils.arrayMap(ko.utils.range(start, start + links -1), (i) => { 
				return {
					index : i,
					text : i.toString(),
					enabled : page != i,
					active : page == i
				};
				
				return item;
			});

			return [prev].concat(list, [next]);
		}, this);

		// Behaviors
		this.visible = ko.computed(() => {
			return this.pageCount() > 0;
		}, this);
		
		this.goTo = function(item) {
			this.page(item.index);
		}.bind(this);
	},
	template:
		'<nav data-bind="visible: visible">\
			<ul data-bind="foreach: pageList" class="pagination">\
				<li data-bind="css: { active : active }">\
					<a href="#" data-bind="text: text, click: $parent.goTo, enabled: enabled"></a>\
				</li>\
			</ul>\
		</nav>'
});
