/**
 * Boostrap Pagination Component
 * BabelJS/ECMAScript 6
 */
ko.components.register('ko-pagination', {
	viewModel: function(params) {
		this.page = params.page || ko.observable(1);	//current page
		this.recordCount = params.recordCount;			//total of entries
		this.pageSize = params.pageSize;				//items per page
		this.numberOfLinks = params.numberOfLinks || 5;	//number of numeric links
		this.showInfo = params.showInfo || true;	//info text

		params.labels = params.labels || {};
		params.labels.infoInitial = params.labels.infoInitial || "Showing page";
		params.labels.infoOf = params.labels.infoOf || "of";
		params.labels.prev = params.labels.prev || "Previous";
		params.labels.next = params.labels.next || "Next";
		params.labels.first = params.labels.first || "First";
		params.labels.last = params.labels.last || "Last";

		this.recordCount.subscribe(v => {
			this.page(1);
		});

		this.pageSize.subscribe(v => {
			this.page(1);
		});

		//Total of pages based on the number of records
		this.pageCount = ko.pureComputed(() => {
			var rc = parseInt(this.recordCount(), 10),
				ps = parseInt(this.pageSize(), 10),
				pages = Math.floor(rc/ps);

			if (rc < ps) 
				return 1;

			if (rc % ps)
				pages++;
			return pages;
		}, this);

		this.info = ko.pureComputed(() => {
			return `${params.labels.infoInitial} ${this.page()} ${params.labels.infoOf} ${this.pageCount()}`;
		}, this);

		//Link generation
		this.pageList = ko.pureComputed(() => {
			var links = parseInt(this.numberOfLinks(), 10),
				pages = this.pageCount(),
				page = parseInt(this.page(), 10),
				first = {
					index : 1,
					text : params.labels.first,
					enabled : page > 1,
					active : false
				},
				prev = {
					index : page > 1 ? page - 1 : 1,
					text : params.labels.prev,
					enabled : page > 1,
					active : false
				},
				next = {
					index : page < pages ? page + 1 : pages,
					text : params.labels.next,
					enabled : page < pages,
					active : false
				},
				last = {
					index : pages,
					text : params.labels.last,
					enabled : page < pages,
					active : false
				};

			if (links > pages)
				links = pages;
			
			var startRange = page;
			if (startRange >= pages - links + 1)
				startRange = pages - links + 1;
			
			var endRange = page + links - 1;
			if (endRange > pages)
				endRange = pages;

			var range = ko.utils.range(startRange, endRange);
			var list = ko.utils.arrayMap(range, (i) => { 
				return {
					index : i,
					text : i.toString(),
					enabled : page != i,
					active : page == i
				};
				
				return item;
			});

			return [first, prev].concat(list, [next, last]);
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
		</nav>\
		<!-- ko if: showInfo --><p data-bind="text: info"></p><!-- /ko -->'
});
