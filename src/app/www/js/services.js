angular.module('wobbe.services', [])

.factory('Lists', function () {
	var lists = [{
		title: 'Lijst 1'
	}, {
		title: 'Lijst 2'
	}];

	return {
		all: function () {
			return lists;
		},
		remove: function(list) {
			lists.splice(lists.indexOf(list), 1);
		},
		get: function(listId) {
			for (var i = 0; i < lists.length; ++i) {
				if (lists[i].id === parseInt(listId)) {
					return lists[i];
				}
			}
			return null;
		}
	};
})

;

