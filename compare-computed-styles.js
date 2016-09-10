CompareComputedStyles = function(selector) {
	var rootNode = document.querySelectorAll(selector);
	var data = false;

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
