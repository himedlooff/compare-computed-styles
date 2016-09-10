CompareComputedStyles = function(selector, defaultElements) {
	var rootNode = document.querySelectorAll(selector);
	var data = false;

	// if (defaultElements) {
	// 	var xhr = new XMLHttpRequest();
	// 	var querystring = '?elements=' + defaultElements.join(',');
	// 	xhr.open('POST', 'https://himedlooff.github.io/compare-computed-styles/browser-defaults.html' + querystring);
	// 	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	// 	xhr.send(null);
	// 	xhr.onreadystatechange = function () {
	// 		var DONE = 4; // readyState 4 means the request is done.
	// 		var OK = 200; // status 200 is a successful return.
	// 		if (xhr.readyState === DONE) {
	// 			if (xhr.status === OK) {
	// 				console.log(xhr.responseText); // 'This is the returned text.'
	// 			} else {
	// 				console.log('Error: ' + xhr.status); // An error occurred during the request.
	// 			}
	// 		}
	// 	};
	// }

	if (rootNode.length) {
		data = getNodeInfo(rootNode[0]);
	}

	return data;

	function getNodeInfo(targetNode) {
		var id = targetNode.getAttribute('id');
		var classes = targetNode.getAttribute('class');
		var tagName = targetNode.tagName;
		var styles = {};
		var children = [];

		var elementStyles = getStyleProps(targetNode);
		for(var key in elementStyles) {
			// if (defaultElements[tagName].styles[key] !== elementStyles[key]) {
				styles[key] = elementStyles[key];
			// }
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

	function removeDefaults() {

	}
};
