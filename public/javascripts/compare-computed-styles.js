CompareComputedStyles = function(selector, callback) {
	var rootNode = document.querySelectorAll(selector);
	var defaults = {};
	var totalDefaultsLoading = 0;
	var data = rootNode.length ? getNodeInfo(rootNode[0]) : {};

	callback = callback ? callback : function() {};

	populateDefaults(defaults, function() {
		removeDefaultStyles(data);
		callback(data);
	});

	function getNodeInfo(targetNode) {
		var id = targetNode.getAttribute('id');
		var classes = targetNode.getAttribute('class');
		var tagName = targetNode.tagName;
		var styles = {};
		var children = [];

		if (!defaults[tagName]) {
			defaults[tagName] = '';
		}

		var elementStyles = getStyleProps(targetNode);
		for(var key in elementStyles) {
			styles[key] = elementStyles[key];
		}

		for (var i = 0; i < targetNode.children.length; ++i) {
			if (targetNode.children[i]) {
				children.push(getNodeInfo(targetNode.children[i]));
			}
		}

		return {
			id: id,
			class: classes,
			tagName: targetNode.tagName,
			styles: styles,
			children: children
		};
	}

	function getStyleProps(node) {
		var computedStyles = window.getComputedStyle(node);
		var simpleStyleObj = {};
		if (!computedStyles || !computedStyles.getPropertyValue) {
			return simpleStyleObj;
		}
		for (var i = 0; i < computedStyles.length; i++) {
			var prop = computedStyles[i];
			simpleStyleObj[prop] = computedStyles.getPropertyValue(prop);
		}
		return simpleStyleObj;
	}

	function populateDefaults(defaults, callback) {
		for (var tagName in defaults) {
			totalDefaultsLoading++;
			getDefaultElementStyles(tagName, function(tagName, json) {
				defaults[tagName] = json;
				--totalDefaultsLoading;
				if (totalDefaultsLoading <= 0) {
					callback();
				}
			});
		}
	}

	function removeDefaultStyles(targetNodeData) {
		var tagName = targetNodeData.tagName;

		if (defaults[tagName]) {
			for(var key in targetNodeData.styles) {
				if (defaults[tagName][key] === targetNodeData.styles[key]) {
					delete targetNodeData.styles[key];
				}
			}
		} else {
			console.log('Missing defaults for ', tagName);
		}

		for (var i = 0; i < targetNodeData.children.length; ++i) {
			removeDefaultStyles(targetNodeData.children[i]);
		}
	}

	function getDefaultElementStyles(tagName, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://127.0.0.1:3000/json/' + tagName + '.json');
		xhr.send();
		xhr.onreadystatechange = function () {
			var DONE = 4; // readyState 4 means the request is done.
			var OK = 200; // status 200 is a successful return.
			if (xhr.readyState === DONE) {
				if (xhr.status === OK) {
					callback(tagName, JSON.parse(xhr.responseText));
				} else {
					console.log('Error: ' + xhr.status);
				}
			}
		};
	}
};
