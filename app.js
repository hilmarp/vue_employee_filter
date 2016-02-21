(function() {

	var employees = [
		{
			name: 'Hilmar',
			svid: 'Stjórn',
			deild: 'Vefdeild',
			starfsheiti: 'Forritari'
		},
		{
			name: 'Hulda',
			svid: 'Stjórn',
			deild: 'App deild',
			starfsheiti: 'Forritari'
		},
		{
			name: 'Baldvin',
			svid: 'Stjórn',
			deild: 'Vefdeild',
			starfsheiti: 'Forritari'
		},
		{
			name: 'Palli',
			svid: 'Undirstjórn',
			deild: 'Vefdeild',
			starfsheiti: 'Kerfisfræðingur'
		},
		{
			name: 'Anna',
			svid: 'Stjórn',
			deild: 'App deild',
			starfsheiti: 'Kerfisfræðingur'
		},
		{
			name: 'Bjartur',
			svid: 'Undirstjórn',
			deild: 'App deild',
			starfsheiti: 'Kerfisfræðingur'
		},
		{
			name: 'Jón',
			svid: 'Stjórn',
			deild: 'Vefdeild',
			starfsheiti: 'Kerfisfræðingur'
		},
		{
			name: 'Hjalti',
			svid: 'Undirstjórn',
			deild: 'Vefdeild',
			starfsheiti: 'Forritari'
		}
	];

	var svids = [
		{
			name: 'Stjórn'
		},
		{
			name: 'Undirstjórn'
		}
	];

	var deilds = [
		{
			name: 'Vefdeild'
		},
		{
			name: 'App deild'
		}
	];

	var starfsheitis = [
		{
			name: 'Forritari'
		},
		{
			name: 'Kerfisfræðingur'
		}
	];

	var vm = new Vue({
		el: '#app',

		data: {
			model: {
				name: '',
				svid: 'Svið',
				deild: 'Deild',
				starfsheiti: 'Starfsheiti'
			},
			list: {
				svids: svids,
				deilds: deilds,
				starfsheitis: starfsheitis,
				employees: employees
			},
			filter: {
				byName: [],
				bySvid: [],
				byDeild: [],
				byStarfsheiti: []
			},
			filteredEmployees: []
		},

		watch: {
			'model.name': function (val, oldVal) {
				this.filter.byName = [];

				for (var key in this.list.employees) {
					if (this.list.employees[key].name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
						this.filter.byName.push(this.list.employees[key]);
					}
				}

				this.filterEmployees();
			},

			'model.svid': function (val, oldVal) {
				this.filter.bySvid = [];

				for (var key in this.list.employees) {
					if (this.list.employees[key].svid === val) {
						this.filter.bySvid.push(this.list.employees[key]);
					}
				}

				this.filterEmployees();
			},

			'model.deild': function (val, oldVal) {
				this.filter.byDeild = [];

				for (var key in this.list.employees) {
					if (this.list.employees[key].deild === val) {
						this.filter.byDeild.push(this.list.employees[key]);
					}
				}

				this.filterEmployees();
			},

			'model.starfsheiti': function (val, oldVal) {
				this.filter.byStarfsheiti = [];

				for (var key in this.list.employees) {
					if (this.list.employees[key].starfsheiti === val) {
						this.filter.byStarfsheiti.push(this.list.employees[key]);
					}
				}

				this.filterEmployees();
			}
		},

		methods: {
			filterEmployees: function () {
				this.filter.filteredEmployees = [];

				var filtered = [],
					_this = this,
					combined = this.filter.byName.concat(this.filter.bySvid, this.filter.byDeild, this.filter.byStarfsheiti);

				combinedReduced = combined.filter(function (item, pos) {
					var indexOfItem = _this.getIndexOfItem(combined, item.name);

					return indexOfItem === pos;
				});

				for (var i = 0, n = combined.length; i < n; i++) {
					console.log(combined[i].name);
				}
			},

			isInFilter: function (filterName, item) {
				
			},

			getIndexOfItem: function (list, item) {
				var index = -1;

				for (var i = 0, n = list.length; i < n; i++) {
					if (list[i].name === item) {
						index = i;
						break;
					}
				}

				return index;
			}
		}
	});

})();

/*
uniqueArray = a.filter(function(item, pos) {
    return a.indexOf(item) == pos;
})

var searchTerm = "stevie",
    index = -1;
for(var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i].hello === searchTerm) {
        index = i;
        break;
    }
}
*/