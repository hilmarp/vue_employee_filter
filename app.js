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

				for (var i = 0, n = this.list.employees.length; i < n; i++) {
					if (this.list.employees[i].name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
						this.filter.byName.push(this.list.employees[i]);
					}
				}

				this.filterEmployees();
			},

			'model.svid': function (val, oldVal) {
				this.filter.bySvid = [];

				for (var i = 0, n = this.list.employees.length; i < n; i++) {
					if (this.list.employees[i].svid === val) {
						this.filter.bySvid.push(this.list.employees[i]);
					}
				}

				this.filterEmployees();
			},

			'model.deild': function (val, oldVal) {
				this.filter.byDeild = [];

				for (var i = 0, n = this.list.employees.length; i < n; i++) {
					if (this.list.employees[i].deild === val) {
						this.filter.byDeild.push(this.list.employees[i]);
					}
				}

				this.filterEmployees();
			},

			'model.starfsheiti': function (val, oldVal) {
				this.filter.byStarfsheiti = [];

				for (var i = 0, n = this.list.employees.length; i < n; i++) {
					if (this.list.employees[i].starfsheiti === val) {
						this.filter.byStarfsheiti.push(this.list.employees[i]);
					}
				}

				this.filterEmployees();
			}
		},

		methods: {
			filterEmployees: function () {
				this.filteredEmployees = [];

				var combined = this.filter.byName.concat(this.filter.bySvid, this.filter.byDeild, this.filter.byStarfsheiti),
					filtered = [];

				// Viljum ekki duplicate names
				combined = this.removeObjArrDuplicates(combined, 'name');

				// Finna starfsmenn sem eru í öllum völdum listum
				for (var i = 0, n = combined.length; i < n; i++) {
					var name = combined[i].name;

					if (this.isInAllFilters(name)) {
						filtered.push(combined[i]);
					}
				}

				this.filteredEmployees = filtered;
			},

			isInAllFilters: function (item) {
				var isInByName = false,
					isInBySvid = false,
					isInByDeild = false,
					isInByStarfsheiti = false;

				if (this.isInFilter('byName', item)) {
					isInByName = true;
				}

				if (this.isInFilter('bySvid', item)) {
					isInBySvid = true;
				}

				if (this.isInFilter('byDeild', item)) {
					isInByDeild = true;
				}

				if (this.isInFilter('byStarfsheiti', item)) {
					isInByStarfsheiti = true;
				}

				return isInByName && isInBySvid && isInByDeild && isInByStarfsheiti;
			},

			isInFilter: function (filterName, item) {
				if (! this.filter[filterName].length) {
					return true;
				}

				for (var i = 0, n = this.filter[filterName].length; i < n; i++) {
					var name = this.filter[filterName][i].name;

					if (name === item) {
						return true;
					}
				}

				return false;
			},

			removeObjArrDuplicates: function (arr, filterKey) {
				var tempObj = {};

				// Viljum ekki duplicate name, obj leyfa ekki duplicate keys
				// svo við setjum name sem key og obj sem value í temp obj
				for (var i = 0, n = arr.length; i < n; i++) {
					tempObj[arr[i][filterKey]] = arr[i];
				}

				// Reset arr
				arr = [];

				// Setjum obj values í arr array aftur, nema núna ekki duplicated nöfn
				for (var key in tempObj) {
					arr.push(tempObj[key]);
				}

				return arr;
			}
		}
	});

})();

/*
var arr = {};

for ( var i=0, len=things.thing.length; i < len; i++ )
    arr[things.thing[i]['place']] = things.thing[i];

things.thing = new Array();
for ( var key in arr )
    things.thing.push(arr[key]);

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