function hideElement(element) {
	    element.style.display = 'none';
}

function showElement(element, style) {
    var displayStyle = style ? style : 'block';
    element.style.display = displayStyle;
}

function clearLoginError() {
    document.querySelector('#login-error').innerHTML = '';
}

function clearRegisterResult() {
    document.querySelector('#register-result').innerHTML = '';
}

function showLoginError() {
	document.querySelector('#login-error').innerHTML = 'Invalid username or password';
}

function showLoadingMessage(msg) {
    var itemList = document.querySelector('#item-list');
    itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> ' +
      msg + '</p>';
}


function activeBtn(btnId) {
	var btns = document.querySelectorAll('.main-nav-btn');

	// deactivate all navigation buttons
	for (var i = 0; i < btns.length; i++) {
		btns[i].className = btns[i].className.replace(/\bactive\b/, '');
	}

	// active the one that has id = btnId
	var btn = document.querySelector('#' + btnId);
	btn.className += ' active';
}

function listItems(items) {
	var itemList = document.querySelector('#item-list');
	itemList.innerHTML = ''; // clear current results

	for (var i = 0; i < items.length; i++) {
		addItem(itemList, items[i]);
	}
}

/**
 * AJAX helper
 * @param method - GET|POST|PUT|DELETE
 * @param url - API end point
 * @param data - request payload data
 * @param successCallback - Successful callback function
 * @param errorCallback - Error callback function
 */
function ajax(method, url, data, successCallback, errorCallback) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      successCallback(xhr.responseText);
    } else {
      errorCallback();
    }
  };

  xhr.onerror = function() {
    console.error("The request couldn't be completed.");
    errorCallback();
  };

  if (data === null) {
    xhr.send();
  } else {
    xhr.setRequestHeader("Content-Type",
      "application/json;charset=utf-8");
    xhr.send(data);
  }
}

function addItem(itemList, item) {
	var item_id = item.item_id;

	// create the <li> tag and specify the id and class attributes
	var li = $create('li', {
		id : 'item-' + item_id,
		className : 'item'
	});

	// set the data attribute ex. <li data-item_id="G5vYZ4kxGQVCR"
	// data-favorite="true">
	li.dataset.item_id = item_id;
	li.dataset.favorite = item.favorite;

	// item image
	if (item.image_url) {
		li.appendChild($create('img', {
			src : item.image_url
		}));
	} else {
		li.appendChild($create('img', {
			src : 'https://via.placeholder.com/100'
		}));
	}
	// section
	var section = $create('div');

	// title
	var title = $create('a', {
		className : 'item-name',
		href : item.url,
		target : '_blank'
	});
	title.innerHTML = item.name;
	section.appendChild(title);

	// keyword
	var keyword = $create('p', {
		className : 'item-keyword'
	});
	keyword.innerHTML = 'Keyword: ' + item.keywords.join(', ');
	section.appendChild(keyword);

	li.appendChild(section);

	// address
	var address = $create('p', {
		className : 'item-address'
	});

	// ',' => '<br/>', '\"' => ''
	address.innerHTML = item.address.replace(/,/g, '<br/>').replace(/\"/g, '');
	li.appendChild(address);

	// favorite link
	var favLink = $create('p', {
		className : 'fav-link'
	});

	favLink.onclick = function() {
		changeFavoriteItem(item);
	};

	favLink.appendChild($create('i', {
		id : 'fav-icon-' + item_id,
		className : item.favorite ? 'fa fa-heart' : 'fa fa-heart-o'
	}));

	li.appendChild(favLink);
	itemList.appendChild(li);
}

function $create(tag, options) {
	var element = document.createElement(tag);
	for ( var key in options) {
		if (options.hasOwnProperty(key)) {
			element[key] = options[key];
		}
	}
	return element;
}

function showWarningMessage(msg) {
	var itemList = document.querySelector('#item-list');
	itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> '
			+ msg + '</p>';
}



