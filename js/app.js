(function () {
	'use strict';

	$(function() {
		FastClick.attach(document.body);
	});

	var app = angular.module('msmApp', ['ngRoute', 'ngSanitize', 'angulartics', 'angulartics.google.analytics']);

	app.config(['$routeProvider', '$logProvider', function ($routeProvider, $logProvider) {
		$routeProvider
			.when('/',
				{
					templateUrl: 'html/home.html'
				})
			// About Us Pages
			.when('/about',
				{
					templateUrl: 'html/about.html'
				})
			.when('/about_biblestudy',
				{
					templateUrl: 'html/about_biblestudy.html'
				})
			.when('/about_thrive',
				{
					templateUrl: 'html/about_thrive.html'
				})
			.when('/about_tmi',
				{
					templateUrl: 'html/about_tmi.html'
				})
			// Update Pages
			.when('/updates_biblestudy',
				{
					templateUrl: 'html/updates_biblestudy.html'
				})
			.when('/updates_thrive',
				{
					templateUrl: 'html/updates_thrive.html'
				})
			.when('/updates_tmi',
				{
					templateUrl: 'html/updates_tmi.html'
				})
			.when('/updates_upcoming',
				{
					templateUrl: 'html/updates_upcoming.html'
				})
			// Other Pages
			.when('/podcasts',
				{
					templateUrl: 'html/podcasts.html'
				})
			.when('/contact',
				{
					templateUrl: 'html/contact.html'
				})
      // Unused Pages
      .when('/blog',
				{
					templateUrl: 'html/blog.html'
				})
			.when('/events',
				{
					templateUrl: 'html/events.html'
				})
			.when('/news',
				{
					templateUrl: 'html/news.html'
				})
			.when('/thankyou',
				{
					templateUrl: 'html/thankyou.html'
				})
      .otherwise({ redirectTo: '/' });
		$logProvider.debugEnabled(true);
	}]);

	app.service('selectedService', function() {
		var selected;
		var updateFunctions = {};

		var getSelected = function() {
			return selected;
		}
		var setSelected = function(item, scopeId, update) {
			if (scopeId && update) {
				if (!updateFunctions[scopeId]) {
					updateFunctions[scopeId] = "";
				}
				updateFunctions[scopeId] = update;
			}
			selected = item;
			angular.forEach(updateFunctions, function (value, key) {
				//console.log('key', key, 'value', value);
			});
		}
		return {
			getSelected: getSelected,
			setSelected: setSelected
		}
	});

	/********************************************************************
   *
   *                       Global Utility Functions
   *
   ********************************************************************/
  function getMonthText(index) {
		var month;
		switch (index) {
			case 0:
				month = 'January';
				break;
			case 1:
				month = 'February';
				break;
			case 2:
				month = 'March';
				break;
			case 3:
				month = 'April';
				break;
			case 4:
				month = 'May';
				break;
			case 5:
				month = 'June';
				break;
			case 6:
				month = 'July';
				break;
			case 7:
				month = 'August';
				break;
			case 8:
				month = 'September';
				break;
			case 9:
				month = 'October';
				break;
			case 10:
				month = 'November';
				break;
			case 11:
				month = 'December';
				break;
			default:
				month = 'Date Input Error';
		}
		return month;
	}
	function getDayText(index) {
		var weekday;
		switch (index) {
			case 0:
				weekday = 'Sunday';
				break;
			case 1:
				weekday = 'Monday';
				break;
			case 2:
				weekday = 'Tuesday';
				break;
			case 3:
				weekday = 'Wednesday';
				break;
			case 4:
				weekday = 'Thursday';
				break;
			case 5:
				weekday = 'Friday';
				break;
			case 6:
				weekday = 'Saturday';
				break;
			default:
				weekday = 'Date Input Error';
		}
		return weekday;
	}
	function parseISO8601(dateStringInRange) {
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
        date = new Date(NaN), month,
        parts = isoExp.exec(dateStringInRange);

    if(parts) {
      month = +parts[2];
      date.setFullYear(parts[1], month - 1, parts[3]);
      if(month != date.getMonth() + 1) {
        date.setTime(NaN);
      }
    }
    return date;
  }
	function dateDiff(a,b){
	  return Math.ceil((b-a)/86400000);
	}
	function isSameDate(a,b){
		if (a.getFullYear() != b.getFullYear()) {
			return false;
		}
		if (a.getMonth() != b.getMonth()) {
			return false;
		}
		if (a.getDate() != b.getDate()) {
			return false;
		}
		return true;
	}

	function findBibleRefs() {
  	/*
  	Logos.ReferenceTagging.lbsBibleVersion = "ESV";
    Logos.ReferenceTagging.lbsLinksOpenNewWindow = true;
    Logos.ReferenceTagging.lbsLogosLinkIcon = "dark";
    Logos.ReferenceTagging.lbsNoSearchTagNames = [ ];
    Logos.ReferenceTagging.lbsTargetSite = "biblia";
    Logos.ReferenceTagging.lbsCssOverride = true;
    Logos.ReferenceTagging.tag();
    //*/
  }

  app.factory('BloggerPost', ['$sanitize', function($sanitize) {
  	var regexRules = {
	  	get: {
	  		img: function(htmlString) {
	  			var regexString = /<img([\w\W]+?)\/>/g;
	  			var returnArray = htmlString.match(regexString);
	  			htmlString.replace(regexString, '');
	  			return returnArray;
		  	},
		  	src: function(htmlString) {
		  		return htmlString.match(/src="([\w\W]+?)"/g);
		  	},
	  	},
	  	replace: {
	  		tags: function(htmlString) {
	  			var regexString = /<div([^>]*)>|<\/div>|<img([^>]*)>|<\/img>|&#10;/g;
					return htmlString.replace(regexString, '');
	  		},
	  		contentTags: function(htmlString) {
	  			htmlString = htmlString.replace(/&nbsp;/g, ' ');
					htmlString = htmlString.replace(/<br \/>|<br>/g, '<br/>');
					var regexString = /<div([^>]*)>|<\/div>|<span([^>]*)>|<\/span>|<p([^>]*)>|<\/p>/g;
					htmlString = htmlString.replace(regexString, '');
					var theMultiplyInitiative = '<span class="optimus">The Multiply Initiative</span>';
					htmlString = htmlString.replace(/The Multiply Initiative/g, theMultiplyInitiative);
					return htmlString;
	  		},
	  		contentTags2: function() {
	  			//var newString = value.content.replace('<([^>]*)>', '');
					var newString = value.content;
					
					newString = newString.replace(/&nbsp;/g, ' ');
					//console.log('newString', newString);
					//console.log('***************************');
					
					//newString = newString.replace(/<br \/>|<br>/g, '<br/><br/>');
					//console.log('newString', newString);
					//console.log('***************************');
					
					var regexString = /<div([^>]*)>|<\/div>|<span([^>]*)>|<\/span>|<p([^>]*)>|<\/p>|<h2([^>]*)>|<\/h2>|<h3([^>]*)>|<\/h3>|<h4([^>]*)>|<\/h4>/g;
					newString = newString.replace(regexString, '');
					//console.log('newString', newString);
					//console.log('***************************');
					
					var theMultiplyInitiative = '<span class="optimus">The Multiply Initiative</span>';
					newString = newString.replace(/The Multiply Initiative/g, theMultiplyInitiative);
					//console.log('newString', newString);
					//console.log('***************************');
					
					value.content = newString;
	  		},
	  	},
	  };
  
  	var constructor = function(postData) {
  		var _title;
  		var _labels;
	  	var _htmlString;
	  	var _sanitizedHtml;

	  	var _subtitle;
  		var _date;
  		var _year;
  		var _datePlusOne;
  		var _dateText;
	  	var returnObject = {
	  		getTitle: function() { 
	  			return _title;
	  		},
	  		hasTitle: function(title) {
	  			if (title === _title) {
	  				return true;
	  			} else {
	  				return false;
	  			}
	  		},
	  		getLabels: function() {
	  			return _labels;
	  		},
	  		hasLabel: function(label) { 
	  			for (var i = 0; i < _labels; i++) {
	  				if (_labels[i] === label) {
	  					return true;
	  				}
	  			}
	  			return false;
	  		},
	  		getHtml: function() {
	  			var returnString = regexRules.replace.tags(_sanitizedHtml);
	  			return returnString;
	  		},
	  		extractImgs: function() {
	  			return regexRules.get.img(_sanitizedHtml);
	  		},
	  		extractImgSrcUrls: function() {
	  			var imgArray = this.extractImgs();
	  			var urlArray = [];
	  			if (imgArray) {
	  				for (var i = 0; i < imgArray.length; i++) {
		  				var srcArray = regexRules.get.src(imgArray[i]);
		  				urlArray.push(srcArray[0].substring(5, srcArray[0].length - 1));
		  			}
	  			}
	  			return urlArray;
	  		},
	  		appendPostInfo: function() {
	  			var divider = _title.indexOf(':');
					var titleDate = _title.substr(0,divider);
					var title = _title.substr(divider+1, _title.length);

					var d = parseISO8601(titleDate);
					var dPlusOne = parseISO8601(titleDate);
   				dPlusOne.setDate(dPlusOne.getDate() + 1);
					var day = d.getDate();
					var weekday = getDayText(d.getDay());
					var month = getMonthText(d.getMonth());
					var year = d.getFullYear();

					_title = title;
					_subtitle = titleDate;
					_date = d;
					_datePlusOne = dPlusOne;
					_year = year;
					_dateText = weekday + ', ' + month + ' ' + day;
	  		},
	  		removeContentTags: function() {
	  			_sanitizedHtml = regexRules.replace.contentTags(_sanitizedHtml);
	  			return _sanitizedHtml;
	  		},
	  		getSubtitle: function(){
	  			return _subtitle;
	  		},
	  		getDate: function() {
	  			return _date;
	  		},
	  		getDatePlusOne: function() {
	  			return _datePlusOne;
	  		},
	  		getYear: function() {
	  			return _year;
	  		},
	  		getDateText: function() {
	  			return _dateText;
	  		},
	  	};
	  	
  		if (postData) {
  			_title = postData.title;
  			_labels = postData.labels;
  			_htmlString = postData.content;
  			_sanitizedHtml = $sanitize(_htmlString);
  		}
  		return returnObject;
  	};
  	return constructor;
  }]);
  app.factory('BloggerPostList', ['BloggerPost', function(BloggerPost) {
  	var constructor = function(data) {
  		var _items = [];
	  	var returnObject = {
	  		getPosts: function() {
	  			return _items;
	  		},
	  		sortByDate: function() {
	  			_items.sort(function(a, b) {
	  				return a.getDate()<b.getDate()?-1:a.getDate()>b.getDate()?1:0;
	  			});
	  			_items.reverse();
	  		},
	  	};
  		if (data && data.items) {
  			for (var i = 0; i < data.items.length; i++) {
  				_items.push(new BloggerPost(data.items[i]));
  			}
  		}
  		return returnObject;
  	};
  	return constructor;
  }]);

  /********************************************************************
   *
   *                             	 Pages
   *
   ********************************************************************/
  
  // ------------------------------------
	// Home Page
  app.controller('NewHomeController', 
	['$scope', 'httpService', 'BloggerPostList',
	function ($scope, httpService, BloggerPostList) {
		var mySwipe;
		$scope.slides = [
			{ url: '' },
			{ url: '#/about' },
			{ url: '#/updates_upcoming' },
		];
  	$scope.bullets = [];
  	function addBullet() {
  		$scope.bullets.push({ number: $scope.bullets.length });
  	};
  	function addSlide(index, urlString, srcString) {
  		if (index > $scope.slides.length) {
  			$scope.slides.push({
	  			url: urlString,
	  			src: srcString,
	  		});
  		} else {
  			$scope.slides[index].src = srcString;
  		}
			addBullet();
		};
    function initSwipe() {
    	mySwipe = Swipe(document.getElementById('slider'), {
	    	startSlide: 0,
			  speed: 400,
			  auto: 5000,
			  continuous: true,
			  disableScroll: false,
			  stopPropagation: false,
			  callback: function(index, elem) {
			  	$scope.changeActive(index);
			  },
			  transitionEnd: function(index, elem) {}
	    });
    };

    $scope.changeActive = function(index) {
    	$scope.selectedBullet = $scope.bullets[index];
    	if (!$scope.$$phase) {
    		$scope.$apply();
    	}
    };
    $scope.click = function(bullet) {
    	$scope.selectedBullet = $scope.bullets[bullet.number];
    	mySwipe.slide(bullet.number);
    };

    httpService.resetSimpleGet();
  	httpService.getLabeledPost('$Home')
  	.then(function(data) {
  		var list = new BloggerPostList(data);
  		var post = list.getPosts()[0];
  		var srcArray = post.extractImgSrcUrls();
  		
  		for (var i = 0; i < srcArray.length; i++) {
  			addSlide(i, '', srcArray[i]);
  		}
  		$scope.selectedBullet = $scope.bullets[0];

  		$scope.$watchCollection('slides', function(newVal, oldVal) {
  			if (newVal !== oldVal) {
  				initSwipe();
  			}
  		});
   	});
  }]);

	app.directive('msmHomeHeader', 
	['$log',
	function ($log) {
		/*****************************************************
   	*                    	Link Function
   	*****************************************************/
		var link = function(scope, element, attrs, controller) {
			$log.debug('msm-home-header scope', scope);
			
			// ---------------------------
		};

		/*****************************************************
   	*              Directive Definition Object
   	*****************************************************/
	  var directiveDefinitionObject = {
      priority: 0,
      template: function(tElement, tAttrs) {
      	var htmlString = '<div class="row"> \
      											<div style="height: 120px;" class="small-12 columns show-for-medium-up"> \
      												<a href="#"><img style="max-height: 145px" src="img/logo-msm.png"></a> \
											    	</div> \
											    	<div style="height: 70px;" class="small-12 columns show-for-small"> \
											      	<a href="#"><img style="max-height: 100px" src="img/logo-msm.png"></a> \
											    	</div> \
											  	</div>';
      	return htmlString;
      },
      transclude: false,
      restrict: 'A',
      scope: {
      	imgUrl: '@',
      },
      //controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
      //controllerAs: 'stringAlias',
      //require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
      compile: function compile(tElement, tAttrs, transclude) {
      	return link;
      },
    };
    return directiveDefinitionObject;
	}]);

	// ------------------------------------
	// About Us: About Our Ministry Page
	app.controller('AboutController', 
	['$log', '$scope', 'httpService', 'BloggerPostList',
	function ($log, $scope, httpService, BloggerPostList) {
		var defaultSettings = {
			controllerName: 'AboutController',
			title: 'About Us',
			label: '$$$About Our Ministry',
		};
		$scope.slides = [];
		$scope.options = [];
		function addSlide(post) {
			var title = post.getTitle();
			var content = post.getHtml();
			var src = post.extractImgSrcUrls()[0];
			$scope.slides.push({
				post: post,
				title: title,
				content: content,
				src: src,
			});
			$scope.options.push({ 
				value: $scope.options.length, 
				post: post,
				title: title, 
				content: content,
				src: src,
			});
		};
		function setActiveSlide(index) {
			for (var i = 0; i < $scope.slides.length; i++) {
				$scope.slides[i].isActive = false;
			}
			$scope.slides[index].isActive = true;
		}

  	$scope.switchOption = function() {
  		if ($scope.currentOption != null) {
  			$scope.selectSlide($scope.currentOption, $scope.currentOption.value);
  			$scope.swipe.slide($scope.currentOption.value);
  		}
  	};
  	$scope.callback = function(index) {
  		$scope.currentOption = $scope.options[index];
  		if (!$scope.$$phase) {
    		$scope.$apply();
    	}
  	};

  	$scope.selectSlide = function(post, index) {
			$scope.subtitle = post.title;
			$scope.content = post.content;
			$scope.src = post.src;
			setActiveSlide(index);
		}

  	httpService.resetSimpleGet();
  	httpService.getLabeledPost(defaultSettings.label)
  	.then(function(data) {
  		var list = new BloggerPostList(data);
  		var posts = list.getPosts();
  		
   		if (posts[0] && posts[1]) {
   			$scope.title = defaultSettings.title;

   			if (posts[0].hasTitle('Our Youth Pastor')) {
   				addSlide(posts[1]);
   				addSlide(posts[0]);
   			} else {
   				addSlide(posts[0]);
   				addSlide(posts[1]);
   			}
   			
   			$scope.selectSlide($scope.slides[0], 0);
 				$scope.currentOption = $scope.options[0];

 				$scope.$watchCollection('slides', function(newVal, oldVal) {
	  			if (newVal !== oldVal) {
	  				$scope.createSwipe();
	  			}
	  		});
   		} else {
   			$scope.title = "Page Error; Please Refresh";
   		}
   	}, function(error) {
   		$log.error(defaultSettings.controllerName + ': ' + defaultSettings.label, error);
   	});
	}]);

	// ------------------------------------
	// About Us: Bible Study
	app.controller('AboutBibleStudyController', 
	['$log', '$scope', 'httpService', 'BloggerPostList',
	function ($log, $scope, httpService, BloggerPostList) {
		$scope.teachers = [];
		function addTeacher(post) {
			var name = post.getTitle();
			var subtitle = post.getSubtitle();
			var content = post.getHtml();
			var src = post.extractImgSrcUrls()[0];

			$scope.teachers.push({
				index: $scope.teachers.length,
				name: name,
				gradeLevel: subtitle,
				content: content,
				img: src,
			});
		};
		function sortTeachersByName() {
			$scope.teachers.sort(function(a, b) { 
 				if(a.name < b.name) return -1;
		    if(a.name > b.name) return 1;
		    return 0;
 			});
		};

  	$scope.about = {};
  	$scope.about.title = 'Bible Study';
  	$scope.about.heading = 'About';
  	/*
  	var img = 'img/Smushed/about-bibleFellowship.jpg';
		var imgEl = '<img src="' + img + '" />';
		$scope.about.img = img;
		var mapLink = 'https://maps.google.com/maps?q=1411+kennoway+park,+Spring+TX,+77379&hl=en&sll=31.168934,-100.076842&sspn=10.237092,8.76709&hnear=1411+Kennoway+Park+Dr,+Spring,+Texas+77379&t=m&z=16';
		var mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&sensor=false';
		var map = '<a href="' + mapLink + '" target="_blank"> \
								<img class="bordered-image" \
									src="' + mapImg + '"> \
							</img> \
						</a>';
		$scope.about.map = map;
		//*/

  	$scope.loadTeacher = function(teacher) {
  		$scope.about.modal = teacher;
  		$('#myModal').foundation('reveal', 'open');
  	};

  	var http = {
  		getPostsSundaySchool: function(isError) {
    		//console.log('isError', isError);
    		var label = '$$$Sunday Bible Fellowship';
    		return httpService.getLabeledPost(label)
  			.then(function(data) {
  				$log.debug(label + ' data', data);
  				var list = new BloggerPostList(data);
  				var posts = list.getPosts();
  				if (!isError) {
						var bloggerPost = posts[0];
						if (bloggerPost && bloggerPost.hasTitle('About: Bible Study')) {
			   			// Append info to all blog posts and use
			   			// regex to sanitize value.content (html)
			   			bloggerPost.appendPostInfo();
			   			$scope.about.title = bloggerPost.getTitle();
			   			$scope.about.content = bloggerPost.getHtml();
			   			$scope.about.heading = bloggerPost.getSubtitle();
			   			$scope.about.img = bloggerPost.extractImgSrcUrls()[0];
			   			// Continue Promise Chaining
			   			return false;
			   		} else {
			   			// STOP Promise Chaining
			   			$log.error('SundaySchoolController:', label, '- null data');
			   			return true;
			   		}
			   	} else {
			   		// STOP Promise Chaining
			   		$log.error('SundaySchoolController:', label, '- STOP Chaining');
			   		return true;
			   	}
		 		}, function(error) {
		   		$log.error('SundaySchoolController:', label, error);
		   	});
    	},
  		getPostsTeacherBios: function(isError) {
    		//console.log('isError', isError);
    		var label = '$$$Teacher Bios';
   			return httpService.getLabeledPostRecursive(label)
	   		.then(function(data) {
	   			$log.debug(label + ' data', data);
	   			var list = new BloggerPostList(data);
  				var posts = list.getPosts();
	   			if (!isError) {
			   		var bloggerPost = posts[0];
						if (bloggerPost) {
							for (var i = 0; i < posts.length; i++) {
								posts[i].removeContentTags();
				   			posts[i].appendPostInfo();
				   			addTeacher(posts[i]);
							}
							sortTeachersByName();
			   			
			   			/*
			   			var teacherHtml = '<div class"small-12 column"> \
			   													<h3 style="margin: 0;">Teachers</h3> \
			   													<h3 style="margin: 0;"><small>Click/Tap on Photos for Teacher Bios</small></h3> \
				   												<ul class="small-block-grid-2 medium-block-grid-4 large-block-grid-2"> \
														        <li ng-repeat="teacher in teachers" \
														          ng-click="loadTeacher(teacher);"> \
														          <img ng-src="{{teacher.img}}" style="width: 100%; margin-bottom: 10px;"> \
														          <div style="background-color: #eee; color: #999; border-top: 2px solid #5A5A59; padding: 10px;"> \
														            <h6 style="margin: 0;"><strong>{{ teacher.name }}</strong></h6> \
														            <p style="margin: 0;">Grade: {{ teacher.gradeLevel }}</p> \
														          </div> \
														        </li> \
														      </ul> \
												        </div>';
							//*/
							//var compiledElem = $compile(teacherHtml)($scope);
			   			//$scope.compiledElem = compiledElem;
			   			// Continue Promise Chaining
			   			return false;
			   		} else {
			   			// STOP Promise Chaining
			   			$log.error('SundaySchoolController:', label, '- null data');
			   			return true;
			   		}
		   		} else {
		   			// STOP Promise Chaining
			   		$log.error('SundaySchoolController:', label, '- STOP Chaining');
			   		return true;
		   		}
   			}, function(error) {
					$log.error('SundaySchoolController:', label, error);
				});	
    	},
    };

    httpService.resetSimpleGet();
  	http.getPostsSundaySchool()
  		.then(http.getPostsTeacherBios)
  		.then(function() {
  			$log.debug('Promise Chaining is DONE!!!!');
  		});
	}]);

	// ------------------------------------
	// About Us: Thrive
	app.controller('AboutThriveController', 
	['$log', '$scope', 'httpService', 'BloggerPostList',
	function ($log, $scope, httpService, BloggerPostList) {
  	$scope.about = {};
  	$scope.about.title = 'Thrive';
  	$scope.about.heading = 'About';
  	/*
  	var img = 'img/Smushed/about-thrive.jpg';
		var imgEl = '<img src="' + img + '" />';
		$scope.about.img = img;
		var mapLink = 'https://maps.google.com/maps?q=1411+kennoway+park,+Spring+TX,+77379&hl=en&sll=31.168934,-100.076842&sspn=10.237092,8.76709&hnear=1411+Kennoway+Park+Dr,+Spring,+Texas+77379&t=m&z=16';
		var mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&sensor=false';
		var map = '<a href="' + mapLink + '" target="_blank"> \
								<img class="bordered-image" \
									src="' + mapImg + '"> \
							</img> \
						</a>';
		$scope.about.map = map;
		//*/

  	var http = {
  		getPostsThrive: function(isError) {
    		//console.log('isError', isError);
    		var label = '$$$Thrive';
    		return httpService.getLabeledPost(label)
  			.then(function(data) {
  				$log.debug(label + ' data', data);
  				var list = new BloggerPostList(data);
  				var posts = list.getPosts();
	   			if (!isError) {
			   		var bloggerPost = posts[0];
						if (bloggerPost && bloggerPost.hasTitle('About: Thrive')) {
			   			// Append info to all blog posts and use
			   			// regex to sanitize value.content (html)
			   			bloggerPost.appendPostInfo();
			   			$scope.about.title = bloggerPost.getTitle();
			   			$scope.about.content = bloggerPost.getHtml();
			   			$scope.about.heading = bloggerPost.getSubtitle();
			   			$scope.about.img = bloggerPost.extractImgSrcUrls()[0];
			   			// Continue Promise Chaining
			   			return false;
			   		} else {
			   			// STOP Promise Chaining
			   			$log.error('ThriveController:', label, '- null data');
			   			return true;
			   		}
			   	} else {
			   		// STOP Promise Chaining
			   		$log.error('ThriveController:', label, '- STOP Chaining');
			   		return true;
			   	}
		 		}, function(error) {
		   		$log.error('ThriveController:', label, error);
		   	});
    	},
    };

    httpService.resetSimpleGet();
  	http.getPostsThrive()
  		.then(function() {
  			$log.debug('Promise Chaining is DONE!!!!');
  		});
	}]);
	
	// ------------------------------------
	// About Us: The Multiply Initiative
	app.controller('AboutTMIController', 
	['$log', '$scope', 'httpService', 'BloggerPostList',
	function ($log, $scope, httpService, BloggerPostList) {
  	$scope.about = {};
  	$scope.about.title = 'The Multiply Initiative';
  	$scope.about.heading = 'About';
  	/*
  	var img = 'img/Smushed/about-multiply.jpg';
		var imgEl = '<img src="' + img + '" />';
		$scope.about.img = img;
		var mapLink = 'https://maps.google.com/maps?q=1411+kennoway+park,+Spring+TX,+77379&hl=en&sll=31.168934,-100.076842&sspn=10.237092,8.76709&hnear=1411+Kennoway+Park+Dr,+Spring,+Texas+77379&t=m&z=16';
		var mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&sensor=false';
		var map = '<a href="' + mapLink + '" target="_blank"> \
								<img class="bordered-image" \
									src="' + mapImg + '"> \
							</img> \
						</a>';
		$scope.about.map = map;
		//*/
  	var http = {
			getPostsTMI: function(isError) {
    		//console.log('isError', isError);
    		var label = '$$$The Multiply Initiative';
    		return httpService.getLabeledPost(label)
  			.then(function(data) {
  				$log.debug(label + ' data', data);
  				var list = new BloggerPostList(data);
  				var posts = list.getPosts();
	   			if (!isError) {
			   		var bloggerPost = posts[0];
						if (bloggerPost && bloggerPost.hasTitle('About: The Multiply Initiative')) {
			   			// Append info to all blog posts and use
			   			// regex to sanitize value.content (html)
			   			bloggerPost.appendPostInfo();
			   			$scope.about.title = bloggerPost.getTitle();
			   			$scope.about.content = bloggerPost.getHtml();
			   			$scope.about.heading = bloggerPost.getSubtitle();
			   			$scope.about.img = bloggerPost.extractImgSrcUrls()[0];
			   			// Continue Promise Chaining
			   			return false;
			   		} else {
			   			// STOP Promise Chaining
			   			$log.error('ThriveController:', label, '- null data');
			   			return true;
			   		}
			   	} else {
			   		// STOP Promise Chaining
			   		$log.error('ThriveController:', label, '- STOP Chaining');
			   		return true;
			   	}
		 		}, function(error) {
		   		$log.error('ThriveController:', label, error);
		   	});
    	},
    };

    httpService.resetSimpleGet();
  	http.getPostsTMI()
  		.then(function() {
  			$log.debug('Promise Chaining is DONE!!!!');
  		});
	}]);
	
	// ------------------------------------
	// Ministry Updates: Bible Study
	app.controller('UpdatesBibleStudy', 
	['$log', '$scope', 'httpService', 'BloggerPostList',
	function ($log, $scope, httpService, BloggerPostList) {
		var defaultSettings = {
			controllerName: 'UpdatesBibleStudy',
			title: 'Bible Study',
			subtitle: 'Updates',
			postHeading: 'Updates',
			maxVisible: 13,
			lastVisible: 13,
			activeSlide: 0,
			updateLabel: '$$$Sunday Bible Fellowship Updates',
		};
		
		function _init(){
			$scope.title = defaultSettings.title;
	  	$scope.subtitle = defaultSettings.subtitle;
	  	$scope.current = {};
	  	$scope.slideArray = [];
	  	$scope.isCurrent = true;
	  	$scope.activeSlide = defaultSettings.activeSlide;
	  	$scope.maxVisible = defaultSettings.maxVisible;
	  	$scope.lastVisible = defaultSettings.lastVisible;
		};
  	$scope.loadSlide = function(index) {
  		$scope.activeSlide = index;
  	};
  	$scope.loadArchives = function() {
  		$scope.isCurrent = false;
  		$scope.maxVisible = $scope.slideArray.length - $scope.maxVisible;
  		$scope.lastVisible = $scope.slideArray.length;
  	};
  	$scope.loadCurrent = function() {
  		$scope.isCurrent = true;
  		$scope.maxVisible = defaultSettings.maxVisible;
  		$scope.lastVisible = defaultSettings.lastVisible;
  	};
  	$scope.switchOption = function() {
  		$scope.activeSlide = $scope.currentOption.index;
  	};
  	$scope.$watch('activeSlide', function(newVal, oldVal) {
    	if (oldVal !== newVal && !isNaN(newVal)) {
    		$scope.currentOption = $scope.slideArray[newVal];
    	}
    });

    var http = {
    	getPostsUpdates: function(isError) {
    		return httpService.getLabeledPostRecursive(defaultSettings.updateLabel)
	   		.then(function(data) {
	   			$log.debug(defaultSettings.updateLabel + ' data', data);
	   			var list = new BloggerPostList(data);
  				var posts = list.getPosts();
	   			if (!isError) {
			   		var bloggerPost = posts[0];
						if (bloggerPost) {
	   					// Append info to all blog posts and use
				   		// regex to sanitize value.content (html)
				   		for (var i = 0; i < posts.length; i++) {
				   			posts[i].removeContentTags();
				   			posts[i].appendPostInfo();
				   		}
				   		// Sort posts by most recent date first
			   			list.sortByDate();
			   			// Push all content into slideArray
			   			angular.forEach(posts, function(value, key) {
			   				var slideObject = {
			   					heading: defaultSettings.postHeading,
			   					index: key,
			   					title: value.getTitle(),
			   					date: value.getDateText(),
			   					content: value.getHtml(),
			   				};
				   			$scope.slideArray.push(slideObject);
			   			});
			   			$scope.currentOption = $scope.slideArray[0];
			   			// Continue Promise Chaining
			   			return false;
			   		} else {
			   			// STOP Promise Chaining
			   			$log.error('SundaySchoolController:', label, '- null data');
			   			return true;
			   		}
		   		} else {
		   			// STOP Promise Chaining
			   		$log.error(defaultSettings.controllerName + ' ' + label, '- STOP Chaining');
			   		return true;
		   		}
   			}, function(error) {
					$log.error(defaultSettings.controllerName + ' ' + label, error);
				});	
    	}
    };

    _init();
    httpService.resetSimpleGet();
  	http.getPostsUpdates()
  		.then(function() {
  			$log.debug('Promise Chaining is DONE!!!!');
  		});
	}]);
	
	// ------------------------------------
	// Ministry Updates: Thrive
	app.controller('UpdatesThrive', 
	['$log', '$scope', 'httpService', 'BloggerPostList',
	function ($log, $scope, httpService, BloggerPostList) {
		var defaultSettings = {
			controllerName: 'UpdatesThrive',
			title: 'Thrive',
			subtitle: 'Updates',
			postHeading: 'Updates',
			maxVisible: 13,
			lastVisible: 13,
			activeSlide: 0,
			updateLabel: '$$$Thrive Updates',
		};
		
		function _init(){
			$scope.title = defaultSettings.title;
	  	$scope.subtitle = defaultSettings.subtitle;
	  	$scope.current = {};
	  	$scope.slideArray = [];
	  	$scope.isCurrent = true;
	  	$scope.activeSlide = defaultSettings.activeSlide;
	  	$scope.maxVisible = defaultSettings.maxVisible;
	  	$scope.lastVisible = defaultSettings.lastVisible;
		};
  	$scope.loadSlide = function(index) {
  		$scope.activeSlide = index;
  	};
  	$scope.loadArchives = function() {
  		$scope.isCurrent = false;
  		$scope.maxVisible = $scope.slideArray.length - $scope.maxVisible;
  		$scope.lastVisible = $scope.slideArray.length;
  	};
  	$scope.loadCurrent = function() {
  		$scope.isCurrent = true;
  		$scope.maxVisible = defaultSettings.maxVisible;
  		$scope.lastVisible = defaultSettings.lastVisible;
  	};
  	$scope.switchOption = function() {
  		$scope.activeSlide = $scope.currentOption.index;
  	};
  	$scope.$watch('activeSlide', function(newVal, oldVal) {
    	if (oldVal !== newVal && !isNaN(newVal)) {
    		$scope.currentOption = $scope.slideArray[newVal];
    	}
    });

    var http = {
    	getPostsUpdates: function(isError) {
    		return httpService.getLabeledPostRecursive(defaultSettings.updateLabel)
	   		.then(function(data) {
	   			$log.debug(defaultSettings.updateLabel + ' data', data);
	   			var list = new BloggerPostList(data);
  				var posts = list.getPosts();
	   			if (!isError) {
			   		var bloggerPost = posts[0];
						if (bloggerPost) {
	   					// Append info to all blog posts and use
				   		// regex to sanitize value.content (html)
				   		for (var i = 0; i < posts.length; i++) {
				   			posts[i].removeContentTags();
				   			posts[i].appendPostInfo();
				   		}
				   		// Sort posts by most recent date first
			   			list.sortByDate();
	   					// Push all content into slideArray
			   			angular.forEach(posts, function(value, key) {
			   				var slideObject = {
			   					heading: defaultSettings.postHeading,
			   					index: key,
			   					title: value.getTitle(),
			   					date: value.getDateText(),
			   					content: value.getHtml(),
			   				};
				   			$scope.slideArray.push(slideObject);
			   			});
			   			$scope.currentOption = $scope.slideArray[0];
			   			// Continue Promise Chaining
			   			return false;
			   		} else {
			   			// STOP Promise Chaining
			   			$log.error('SundaySchoolController:', label, '- null data');
			   			return true;
			   		}
		   		} else {
		   			// STOP Promise Chaining
			   		$log.error(defaultSettings.controllerName + ' ' + label, '- STOP Chaining');
			   		return true;
		   		}
   			}, function(error) {
					$log.error(defaultSettings.controllerName + ' ' + label, error);
				});	
    	}
    };

    _init();
    httpService.resetSimpleGet();
  	http.getPostsUpdates()
  		.then(function() {
  			$log.debug('Promise Chaining is DONE!!!!');
  		});
	}]);

	// ------------------------------------
	// Ministry Updates: The Multiply Initiative
	app.controller('UpdatesTMI', 
	['$log', '$scope', 'httpService', 'BloggerPostList',
	function ($log, $scope, httpService, BloggerPostList) {
		var defaultSettings = {
			controllerName: 'UpdatesTMI',
			title: 'The Multiply Initiative',
			subtitle: 'Meditations',
			postHeading: 'Meditations',
			maxVisible: 15,
			lastVisible: 15,
			activeSlide: 0,
			updateLabel: '$$$Meditations',
		};
		
		function _init(){
			$scope.title = defaultSettings.title;
	  	$scope.subtitle = defaultSettings.subtitle;
	  	$scope.current = {};
	  	$scope.slideArray = [];
	  	$scope.isCurrent = true;
	  	$scope.activeSlide = defaultSettings.activeSlide;
	  	$scope.maxVisible = defaultSettings.maxVisible;
	  	$scope.lastVisible = defaultSettings.lastVisible;
		};

  	$scope.loadSlide = function(index) {
  		$scope.activeSlide = index;
  	};
  	$scope.loadArchives = function() {
  		$scope.isCurrent = false;
  		$scope.maxVisible = $scope.slideArray.length - $scope.maxVisible;
  		$scope.lastVisible = $scope.slideArray.length;
  	};
  	$scope.loadCurrent = function() {
  		$scope.isCurrent = true;
  		$scope.maxVisible = defaultSettings.maxVisible;
  		$scope.lastVisible = defaultSettings.lastVisible;
  	};
  	$scope.switchOption = function() {
  		$scope.activeSlide = $scope.currentOption.index;
  	};
  	$scope.$watch('activeSlide', function(newVal, oldVal) {
    	if (oldVal !== newVal && !isNaN(newVal)) {
    		$scope.currentOption = $scope.slideArray[newVal];
    	}
    });

    var http = {
    	getPostsUpdates: function(isError) {
    		return httpService.getLabeledPostRecursive(defaultSettings.updateLabel)
	   		.then(function(data) {
	   			$log.debug(defaultSettings.updateLabel + ' data', data);
	   			var list = new BloggerPostList(data);
  				var posts = list.getPosts();
	   			if (!isError) {
			   		var bloggerPost = posts[0];
						if (bloggerPost) {
	   					// Append info to all blog posts and use
				   		// regex to sanitize value.content (html)
				   		for (var i = 0; i < posts.length; i++) {
				   			posts[i].removeContentTags();
				   			posts[i].appendPostInfo();
				   		}
				   		// Sort posts by most recent date first
			   			list.sortByDate();
	   					// Push all content into slideArray
			   			angular.forEach(posts, function(value, key) {
			   				var slideObject = {
			   					heading: defaultSettings.postHeading,
			   					index: key,
			   					title: value.getTitle(),
			   					date: value.getDateText(),
			   					content: value.getHtml(),
			   				};
				   			$scope.slideArray.push(slideObject);
			   			});
	   					$scope.currentOption = $scope.slideArray[0];
			   			// Continue Promise Chaining
			   			return false;
			   		} else {
			   			// STOP Promise Chaining
			   			$log.error('SundaySchoolController:', label, '- null data');
			   			return true;
			   		}
		   		} else {
		   			// STOP Promise Chaining
			   		$log.error(defaultSettings.controllerName + ' ' + label, '- STOP Chaining');
			   		return true;
		   		}
   			}, function(error) {
					$log.error(defaultSettings.controllerName + ' ' + label, error);
				});	
    	}
    };

    _init();
    httpService.resetSimpleGet();
  	http.getPostsUpdates()
  		.then(function() {
  			$log.debug('Promise Chaining is DONE!!!!');
  		});
	}]);

	// ------------------------------------
	// Ministry Updates: Upcoming Events
	app.controller('UpdatesUpcoming', 
	['$log', '$scope', 'httpService', 'BloggerPostList',
	function ($log, $scope, httpService, BloggerPostList) {
		var defaultSettings = {
			controllerName: 'UpdatesUpcoming',
			title: 'Upcoming Events',
			updateLabel: '$$$Upcoming Events',
		};

		$scope.callback = function(index) {
  	};
  	//************************************
    //************************************

  	$scope.title = defaultSettings.title;
  	$scope.allUpcomingEvents;

  	var upcomingEvents = {};
  	var oldEvents = {};
  	var setCover = function(eventObj, post) {
  		eventObj.imgLarge = 'img/Smushed/upcoming-default.jpg';
  		eventObj.visibleLarge = true;
  		eventObj.visibleSmall = true;
  		eventObj.clickOnlyLarge = false;
  		eventObj.clickOnlySmall = false;

  		var src = post.extractImgSrcUrls()[0];
  		if (src) {
  			eventObj.imgLarge = src;
  			eventObj.visibleLarge = false;
  			eventObj.visibleSmall = true;
  		} else if (post.getTitle().indexOf('Youth Mission Trip') > -1) {
				eventObj.imgSmall = 'img/Smushed/upcoming-youth-mission-trip.jpg';
				eventObj.imgLarge = 'img/Smushed/upcoming-youth-mission-trip.jpg';
			} else if (post.getTitle().indexOf('Superbowl') > -1) {
				eventObj.imgSmall = 'img/Smushed/upcoming-superbowl-small.jpg';
				eventObj.imgLarge = 'img/Smushed/upcoming-superbowl-large.jpg';
			} else if (post.getTitle().indexOf('Street Reach') > -1) {
				eventObj.imgSmall = 'img/upcoming-street-reach.png';
				eventObj.imgLarge = 'img/upcoming-street-reach.png';
				eventObj.clickOnlyLarge = true;
			} else if (post.hasLabel('Evangelism')) {
				eventObj.imgSmall = 'img/Smushed/upcoming-evangelism.jpg';
				eventObj.imgLarge = 'img/Smushed/upcoming-evangelism.jpg';
			} else if (post.hasLabel('Afterglow')) {	

			} else {

			}
  	};
  	function addEvent(eventArray, post) {
  		var eventObj = {
  			title: post.getTitle(),
  			date: post.getDate(),
  			dateText: post.getDateText(),
  			content: post.getHtml(),
  		};
  		setCover(eventObj, post);
  		eventArray.push(eventObj);
  	};
  	function sortOldUpcomingEvents(today, post) {
  		var year = post.getYear();
			if (today > post.getDatePlusOne()) {
 				if (!oldEvents[year]) {
   				oldEvents[year] = {
   					year: year,
   					events: new Array()
   				};
   			}
   			addEvent(oldEvents[year].events, post);
 			} else {
 				if (year) {
 					if (!upcomingEvents[year]) {
	   				upcomingEvents[year] = {
	   					year: year,
	   					events: new Array()
	   				};
	   			}
	   			addEvent(upcomingEvents[year].events, post);
 				}
 			}
  	};
  	
  	httpService.resetRecursiveGet();
  	httpService.getLabeledPostRecursive(defaultSettings.updateLabel)
  	.then(function(data) {
  		$log.debug(defaultSettings.updateLabel + ' data', data);
 			var list = new BloggerPostList(data);
			var posts = list.getPosts();
   		var bloggerPost = posts[0];
			if (bloggerPost) {
				var today = new Date();
				for (var i = 0; i < posts.length; i++) {
					posts[i].appendPostInfo();
					sortOldUpcomingEvents(today, posts[i]);
				}

				angular.forEach(upcomingEvents, function (value, key) {
	   			value.events.sort(function(a, b) {
	   				return a.date<b.date?-1:a.date>b.date?1:0;
	   			});
	   		});
 			}
   		$scope.allUpcomingEvents = upcomingEvents;
   	}, function(error) {
   		$log.error(defaultSettings.controllerName + ': ' + defaultSettings.updateLabel, error);
   	});
	}]);

	
	
  /********************************************************************
   *
   *                            Controllers
   *
   ********************************************************************/
	app.controller('TopBar', 
	['$scope', 
	function ($scope) {
		$scope.items = [
			{ name: 'Home', url: '#/', dropdown: false, nested: [] },
			{ name: 'About Us', url: null, dropdown: true, nested: [
				{ name: 'About Our Ministry', url: '#/about', nested: [] },
				{ name: 'Bible Study', url: '#/about_biblestudy', nested: [] },
				{ name: 'Thrive', url: '#/about_thrive', nested: [] },
				{ name: 'The Multiply Initiative', url: '#/about_tmi', nested: [] },
			] },
			{ name: 'Ministry Updates', url: '', dropdown: true, nested: [
				{ name: 'Bible Study', url: '#/updates_biblestudy', dropdown: false, nested: [] },
				{ name: 'Thrive', url: '#/updates_thrive', dropdown: false, nested: [] },
				{ name: 'The Multiply Initiative', url: '#/updates_tmi', dropdown: false, nested: [] },
				{ name: 'Upcoming Events', url: '#/updates_upcoming', dropdown: false, nested: [] },
			] },
			{ name: 'Podcasts', url: '#/podcasts', dropdown: false, nested: [] },
			{ name: 'Contact', url: '#/contact', dropdown: false, nested: [] }
		];

		var offCanvasElem = $('.off-canvas-wrap');
		var currentItem;
		var currentTopItem;
		function _initSelectedItems() {
			for (var i=0; i<$scope.items.length; i++) {
				if ($scope.items[i].nested.length > 0) {
					//console.log('$scope.items[i].url', $scope.items[i].url);
					for (var j=0; j<$scope.items[i].nested.length; j++) {
						//console.log('$scope.items[i].nested[j].url', $scope.items[i].nested[j].url);
						if ($scope.items[i].nested[j].url === document.location.hash) {
							$scope.items[i].nested[j].selected = true;
							currentItem = $scope.items[i].nested[j];
							$scope.items[i].selected = true;
							currentTopItem = $scope.items[i];
						} else {
							$scope.items[i].nested[j].selected = false;
						}	
					}
				} else {
					//console.log('$scope.items[i].url', $scope.items[i].url);
					if ($scope.items[i].url === document.location.hash) {
						$scope.items[i].selected = true;
						currentItem = $scope.items[i];
						currentTopItem = $scope.items[i];
					} else {
						$scope.items[i].selected = false;
					}
				}
			}
		};
		function _closeOffCanvas() {
			offCanvasElem.foundation('offcanvas', 'hide', 'move-right');
		};
		function _toggleOffCanvas() {
			offCanvasElem.foundation('offcanvas', 'toggle', 'move-right');
		};
		$scope.select = function(item, topItem) {
			//console.log('$scope.select', item, topItem);
			if (!item.dropdown) {
				currentItem.selected = false;
				item.selected = true;
				currentItem = item;

				if (topItem) {
					currentTopItem.selected = false;
					topItem.selected = true;
					currentTopItem = topItem;
				} else {
					currentTopItem.selected = false;
				}
			}
			
			$('.top-bar').removeClass('expanded');
			slideToggle();
		};
		$scope.toggleOpen = function() {
			_toggleOffCanvas();
		};



		var isOpen = false;
		var mainBody = $('body');
		mainBody.addClass('slide-from-side-closed');

		$scope.toggleSlide = function() {
			slideToggle();
		}

    function checkAndFlip (){
      var orientation = window.orientation;
      if (isOpen === true) {
      	slideToggle();
      }
      /*
      if (orientation === 0){
          // iPad is in Portrait mode.
      /*
      } else if (orientation === 90){
          // iPad is in Landscape mode. The screen is turned to the left.
      } else if (orientation === -90){
          // iPad is in Landscape mode. The screen is turned to the right.
      //*/
      /*
      } else if (orientation === 90 || orientation === -90) {
          if (isOpen === true) {
              slideToggle();
              //viewport = document.querySelector("meta[name=viewport]");
              //viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
          }
      }
      //*/
    }
    
		var slideToggle = function() {
			if (isOpen === false) {
				mainBody.removeClass('slide-from-side-closed');
				mainBody.addClass('slide-from-side-open');
			} else {
				mainBody.removeClass('slide-from-side-open');
				mainBody.addClass('slide-from-side-closed');
			}
			isOpen = !isOpen;
		}

		
		_initSelectedItems();
		window.addEventListener('orientationchange', checkAndFlip);
	}]);

  /********************************************************************
   *                         Page Controllers
   ********************************************************************/

	// ------------------------------------
	// Other Pages:
	app.controller('PodcastsController', 
	['$log', '$scope', 'httpService', 
	function ($log, $scope, httpService) {
		angular.element( '#audioPlayer' ).audioPlayer({
	    classPrefix: 'audioplayer',
	    strPlay: 'Play',
	    strPause: 'Pause',
	    strVolume: 'Volume',
		});
		var player = document.getElementById('audioPlayer');

		function updateSource (newSrc) {
      player.src = newSrc;
      player.load();
    }
    function playSource () {
    	player.play();
    }

		$scope.callback = function (index) {};
		$scope.playThis = function (pathToAudio) {
			if ($scope.allPodcasts) {
				if ($scope.allPodcasts[pathToAudio]) {
					$scope.currentSermon = $scope.allPodcasts[pathToAudio];

					var link = $scope.allPodcasts[pathToAudio].dblink;
					updateSource(link);
					$scope.prevSlide();
					playSource();
				}
			}
		};
		
		//** Podcast Search **/
		$scope.searchTypes = [
			{ type: 'By Title' },
			{ type: 'By Speaker' },
			{ type: 'By Series' }
			//{ type: 'By Passage' }
		];
		$scope.searchType = $scope.searchTypes[0];
		$scope.show = {
			title: true,
			speaker: false,
			series: false
		}
		$scope.switchType = function() {
			$scope.show.title = false;
			$scope.show.speaker = false;
			$scope.show.series = false;

			switch($scope.searchType.type) {
				case 'By Title':
					$scope.show.title = true;
					break;
				case 'By Speaker':
					$scope.show.speaker = true;
					break;
				case 'By Series':
					$scope.show.series = true;
					break;
				default:
					break;
			}
		}
		//********************/

		var label = '$Podcasts';
  	$scope.title = label.substr(1, label.length);

		$scope.allPodcasts = {};

		httpService.resetSimpleGet();
  	httpService.getLabeledPost(label)
  	.then(function(data) {
   		if (data.items[0]) {
   			var jsonContent = data.items[0].content;
   			var jsonString = jsonContent.toString();

   			if (jsonString) {
   				var jsonObject = JSON.parse(jsonString);
   				 //console.log('jsonObject', jsonObject);
   				if (jsonObject) { //Parse Successful
   					angular.forEach(jsonObject, function(value, key) {
   						var jDate = parseISO8601(value.date);
   						value.dayNumber = jDate.getDate();
   						value.day = getDayText(jDate.getDay());
   						value.month = getMonthText(jDate.getMonth());

   						if (isNaN(value.dayNumber)) {
   							value.month = "No Date";
   							value.dayNumber = "";
   							value.day = "";
   						} else {
   							value.date = value.month + " " + value.dayNumber + ", " + jDate.getFullYear();
   						}

   					});
   					$scope.allPodcasts = jsonObject;
   					if ($scope.allPodcasts) {
   						$scope.currentSermon = $scope.allPodcasts[0];
   						if ($scope.currentSermon) {
   							//console.log($scope.currentSermon.dblink);
   							updateSource($scope.currentSermon.dblink);
   							$scope.createSwipe();
   						}
   					}
   				}
   			}
   		}
   	}, function(error) {
   		$log.error('PodcastsController: $Podcasts', error);
   	});
	}]);

  app.controller('ContactController', 
	['$log', '$scope', 'httpService', 
	function ($log, $scope, httpService) {
  	httpService.resetSimpleGet();
  	httpService.getLabeledPost('$Contact')
  	.then(function(data) {
  		if (data.items[0]) {
   			var pageData = data.items[0];
   			$scope.title = pageData.title;
   			$scope.content = pageData.content;
   		} else {
   			$scope.title = "Page Error";
   		}

   		findBibleRefs();
   	}, function(error) {
   		$log.error('ContactController: $Contact', error);
   	});
	}]);
	// ------------------------------------

  /********************************************************************
   *
   *                            UI Directives
   *
   ********************************************************************/
	app.directive('topBarListItems', 
	['$log',
	function ($log) {
		/*****************************************************
   	*                    	Link Function
   	*****************************************************/
		var link = function(scope, element, attrs, controller) {
			$log.debug('tob-bar-list-item scope', scope);
			// ---------------------------
	    // Element Styling
	    // ---------------------------
			
			// ---------------------------
			scope.select = function(item, topItem) {
				//console.log('select item', item);
				scope.selectFn({item: item, topItem: topItem});
			};
			// ---------------------------
		};

		/*****************************************************
   	*              Directive Definition Object
   	*****************************************************/
	  var directiveDefinitionObject = {
      priority: 0,
      template: function(tElement, tAttrs) {
      	var htmlString = '<ul class="left menu-options"> \
						                <li ng-repeat="item in items" \
						                	ng-class="{ \
					                			active: item.selected, \
					                			\'has-dropdown\': item.dropdown \
						                	}"> \
						                  <a ng-if="!item.dropdown" \
						                  	ng-click="select(item)" \
						                  	href="{{item.url}}"> \
						                  	{{item.name}} \
					                  	</a> \
						                  <a ng-if="item.dropdown">{{item.name}}</a> \
						                  <ul ng-if="item.dropdown" class="dropdown"> \
						                    <li ng-repeat="subItem in item.nested" \
						                    	ng-class="{ \
							                			active: subItem.selected \
								                	}"> \
						                    	<a ng-click="select(subItem, item)" \
						                    		href="{{subItem.url}}"> \
						                    		{{subItem.name}} \
					                    		</a> \
					                    	</li> \
						                  </ul> \
						                </li> \
					                </ul>';
      	return htmlString;
      },
      transclude: false,
      restrict: 'A',
      scope: {
      	items: '=',
      	selectFn: '&',
      },
      //controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
      //controllerAs: 'stringAlias',
      //require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
      compile: function compile(tElement, tAttrs, transclude) {
      	return link;
      },
    };
    return directiveDefinitionObject;
	}]);

	app.directive('offCanvasListItems', 
	['$log',
	function ($log) {
		/*****************************************************
   	*                    	Link Function
   	*****************************************************/
		var link = function(scope, element, attrs, controller) {
			$log.debug('off-canvas-list-item scope', scope);
			// ---------------------------
	    // Element Styling
	    // ---------------------------
			
			// ---------------------------
			scope.select = function(item, topItem) {
				//console.log('select item', item);
				scope.selectFn({item: item, topItem: topItem});
			};
			// ---------------------------
		};

		/*****************************************************
   	*              Directive Definition Object
   	*****************************************************/
	  var directiveDefinitionObject = {
      priority: 0,
      template: function(tElement, tAttrs) {
      	var htmlString = '<ul class="off-canvas-list"> \
									          <li><label>Multiply Student Ministry</label></li> \
									          <li ng-repeat="item in items" ng-class="{ \'has-submenu\': item.dropdown }"> \
									            <a ng-if="!item.dropdown" ng-click="select(item)" href="{{item.url}}">{{ item.name }}</a> \
									            <a ng-if="item.dropdown">{{ item.name }}</a> \
									            <ul ng-if="item.dropdown" class="left-submenu"> \
									              <li class="back"><a>Back</a></li> \
									              <li><label>{{ item.name }}</label></li> \
									              <li ng-repeat="subItem in item.nested"> \
									              	<a ng-click="select(subItem, item)" href="{{ subItem.url }}"> \
									              		{{ subItem.name }} \
								              		</a> \
								              	</li> \
									            </ul> \
									          </li> \
									        </ul>';
      	return htmlString;
      },
      transclude: false,
      restrict: 'A',
      scope: {
      	items: '=',
      	selectFn: '&',
      },
      //controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
      //controllerAs: 'stringAlias',
      //require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
      compile: function compile(tElement, tAttrs, transclude) {
      	return link;
      },
    };
    return directiveDefinitionObject;
	}]);

	app.directive('infiniteSwipe', 
	['$log', '$compile',
	function ($log, $compile) {
		/*****************************************************
   	*                    	Link Function
   	*****************************************************/
		var link = function(scope, element, attrs, controller) {
			$log.debug('infinite-swipe scope', scope);
			// ---------------------------
	    // Element Styling
			var defaultHeight = 500;
			// ---------------------------
			
			// ---------------------------
			var isDigest = true;
			var isInternal = true;
			var enableWatch = true;
			var infiniteSwipe = {
	    	carousel: null,
	    	minLength: scope.minLength,
	    	init: function() {
	    		if (scope.fixedHeight) {
	    			element.height(scope.fixedHeight);
	    		} else {
	    			element.height(defaultHeight);
	    		}
	    		infiniteSwipe.carousel = new SwipeView(scope.swipeElement[0], {
			      numberOfPages: scope.slides.length,
			      hastyPageFlip: true,
			      loop: false,
			    });
			    
			    scope.swipeElement[0].style.overflowX = 'hidden';
			    scope.swipeElement[0].style.overflowY = 'scroll'; 

			    infiniteSwipe.loadInitialData();

			    infiniteSwipe.carousel.onFlip(infiniteSwipe.onFlipHandler);
	    	},
	    	loadInitialData: function() {
	    		// Load initial data
			    for (var i = 0; i < 3; i++) {
			    	var page;
			    	if (i === 0) {
			    		page = scope.slides.length;
			    	} else {
			    		page = i - 1;
			    	}
			      
			      var el = document.createElement('div');
			      el.className = 'infiniteSwipe';
			      
			      infiniteSwipe.setSlideContent(el, scope.slides[page]);
			      if (page === 0) {
			      	scope.heading = scope.slides[page].heading;
			      }
			      infiniteSwipe.carousel.masterPages[i].appendChild(el);
			    }
	    	},
	    	onFlipHandler: function () {
		    	var el;
		      var upcoming;
		      for (var i = 0; i < 3; i++) {
		        upcoming = infiniteSwipe.carousel.masterPages[i].dataset.upcomingPageIndex;
		        if (upcoming != infiniteSwipe.carousel.masterPages[i].dataset.pageIndex) {
		          el = infiniteSwipe.carousel.masterPages[i].querySelector('div');
		          infiniteSwipe.setSlideContent(el, scope.slides[upcoming]);
		        }
		      }
		      if (isDigest && !scope.$$phase) {
		    		scope.$apply(function() {
		    			scope.heading = scope.slides[infiniteSwipe.carousel.pageIndex].heading;
		    			scope.activeIndex = infiniteSwipe.carousel.pageIndex;
		    			isInternal = false;
		    		});
		    	} else {
		    		scope.heading = scope.slides[infiniteSwipe.carousel.pageIndex].heading;
		    		scope.activeIndex = infiniteSwipe.carousel.pageIndex;
		    		isDigest = true;
		    	}
		    },
	    	setSlideContent: function(el, value) {
	    		if (value) {
	    			var title = '<h2>' + value.title + '</h2>';
		    		var date = '<h3>' + value.date + '</h3>';
		    		el.innerHTML = title + date + value.content;
	    		}
	    	},
	    };
	    // ---------------------------

	    // ---------------------------
	    // Handle scope async updates
	    var loadCompiledElem = false;
	    scope.$watchCollection('slides', function(newVal, oldVal) {
	    	//console.log('watchCollection slides oldVal', oldVal, 'newVal', newVal);
	    	if (newVal && newVal.length >= infiniteSwipe.minLength) {
	    		infiniteSwipe.init();
	    		if (loadCompiledElem) {
	    			$('#swipeview-masterpage-1').append(scope.compiledElem);
	    			loadCompiledElem = false;
	    		} 
	    	} 
	    });
	    scope.$watch('activeIndex', function(newVal, oldVal) {
	    	//console.log('[function] scope.$watch(activeIndex) enableWatch', enableWatch);
	    	if (enableWatch) {
		    	if (isInternal && !isNaN(newVal) && scope.slides.length >= infiniteSwipe.minLength) {
		    		//console.log('switch to newVal', newVal);
		    		isDigest = false;
		    		goToPage(newVal);
		    		//console.log('infiniteSwipe.carousel', infiniteSwipe.carousel);
		    	} 
		    	isInternal = true;
		    }
	    });
	    scope.$watch('compiledElem', function(newVal, oldVal) {
	    	//console.log('scope.$watch compiledElem', newVal);
	    	if (newVal) {
	    		loadCompiledElem = true;
	    		//scope.swipeElement.append(newVal);
	    		
	    	}
	    });
	    // ---------------------------

	    // ---------------------------
	    // Slide Controls
	    var goToPage = function(index) {
	    	//console.log('goToPage index', index);
	    	if (index < 2) {
	    		enableWatch = false;
	    		infiniteSwipe.carousel.goToPage(index);
	    		enableWatch = true;
	    	} else {
	    		enableWatch = false;
					infiniteSwipe.carousel.goToPage(index - 2);
					infiniteSwipe.carousel.next();
					infiniteSwipe.carousel.next();
					enableWatch = true;
	    	}
	    };
	    scope.nextSlide = function() {
	    	infiniteSwipe.carousel.next();
	    };
	    scope.prevSlide = function() {
	    	infiniteSwipe.carousel.prev();
	    };
	    $(document).keyup(function (e) {
	    	if(e.which === 37) {
	    		scope.prevSlide();
	    	}
	    	if(e.which === 39) {
	    		scope.nextSlide();
	    	}
			});
			// ---------------------------
		};

		/*****************************************************
   	*              Directive Definition Object
   	*****************************************************/
	  var directiveDefinitionObject = {
      priority: 0,
      template: function(tElement, tAttrs) {
      	var htmlString = '<div style="height: 100%;"> \
	    											<div class="clearfix" style="height: 112px;"> \
												      <a class="no-text-select left" ng-click="prevSlide()"><i class="fi-arrow-left" style="color: #ff2701; font-size: 3em;"></i></a> \
												      <a class="no-text-select right" ng-click="nextSlide()"><i class="fi-arrow-right" style="color: #ff2701; font-size: 3em;"></i></a> \
												      <h1 class="text-center" style="margin: 0;">{{ heading }}</h1> \
												      <h2 class="hide-for-touch text-center" style="margin: 0;"><small>Use arrow keys to navigate</small></h2> \
												      <h2 class="show-for-touch text-center" style="margin: 0;"><small>Swipe or use arrow keys to navigate</small></h2> \
												    </div> \
	      										<div style="height: calc(100% - 112px); \
	      											padding: 1.25rem; \
											      	border-style: solid; \
											      	border-width: 1px; \
											      	border-color: #d9d9d9; \
											      	background-color: #f2f2f2;"> \
											      	<div ng-scope-element="swipeElement" \
											      		style="height: 100%; \
											      		-webkit-overflow-scrolling: touch; \
											      		overflow-x: hidden !important; \
											      		overflow-y: scroll !important;"> \
										      		</div> \
									      		</div> \
      										</div>';

      	return htmlString;
      },
      transclude: false,
      restrict: 'A',
      scope: {
      	slides: '=',
      	minLength: '=',
      	activeIndex: '=',
      	fixedHeight: '=',
      	compiledElem: '=',
      },
      //controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
      //controllerAs: 'stringAlias',
      //require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
      compile: function compile(tElement, tAttrs, transclude) {
      	return link;
      },
    };
    return directiveDefinitionObject;
	}]);

	app.directive('swipejs', function() {
	  return function(scope, element, attrs) {
	    scope.createSwipe = function() {
	    	scope.swipe = Swipe(element[0], {
		    	startSlide: 0,
				  speed: 400,
				  auto: 0,
				  continuous: false,
				  disableScroll: false,
				  stopPropagation: false,
				  callback: function(index, elem) {
				  	//scope.callback(index);
				  },
				  transitionEnd: function(index, elem) {
				  	scope.callback(index);
				  }
		    });
	    };
	    scope.prevSlide = function() {
    		scope.swipe.prev();
    	};
    	scope.nextSlide = function() {
	    	scope.swipe.next();
	    };

	    $(document).keyup(function (e) {
	    	if(e.which === 37) {
	    		scope.prevSlide();
	    	}
	    	if(e.which === 39) {
	    		scope.nextSlide();
	    	}
			});
			/*
			.keydown(function (e) {
		    if(e.which === 37){
		    	console.log('keydown left arrow');
		    	isCtrl=true;
		    }
		    if(e.which === 39) {
	    		console.log('keydown right arrow');
	    		isCtrl=false;
	    	}
			});
			//*/
	  };
	});

	app.directive('swipeEvent', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs, controller) {
				//console.log('swipe-event scope', scope);
				//console.log('scope.$parent', scope.$parent.$parent);
				//var parentScope = scope.$parent.$parent;
				var firstSlide = true;

				scope.createSwipe = function() {
		    	scope.swipe = Swipe(element[0], {
			    	startSlide: 0,
					  speed: 400,
					  auto: 0,
					  continuous: false,
					  disableScroll: false,
					  stopPropagation: true,
					  callback: function(index, elem) {
					  },
					  transitionEnd: function(index, elem) {
					  	//console.log('index');
					  }
			    });
		    };

		    scope.createSwipe();

		    scope.toggle = function() {
		    	if (firstSlide) {
		    		scope.swipe.next();
		    	} else {
		    		scope.swipe.prev();
		    	}
		    	firstSlide = !firstSlide;
		    };

		    scope.prevSlide = function() {
	    		scope.swipe.prev();
	    	};
	    	scope.nextSlide = function() {
		    	scope.swipe.next();
		    };
			}
		}
	});

	app.directive('backImg', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs, controller) {
				var url = attrs.backImg;

				scope.setImg = function() {
					element.css({
            'background-image': 'url(' + url +')'
	        });
				};

				scope.setImg();
			}
		}
	});

	app.directive('newsItem', function() {
		return {
			restrict: 'E',
			template: '<div class="expand-on-small panel hero shadowed-image">' +
          			'<div class="small-12 large-12 columns">'+
            		'<h3>{{news.title}}</h3>'+
            		'<h4>{{news.dateText}}</h4>'+
            		'<br/>'+
          			'</div>'+
          			'<div class="row transparent">' +
          			'<div class="small-12 large-12 columns">'+
          			'<div ng-bind-html="news.content" class="panel shadowed-image">'+
          			'</div>'+
          			'</div>'+
          			'</div>' +
        				'</div>',
     	replace: true,
			link: function(scope, element, attrs, controller) {
			}
		}
	});

	app.directive('weeklyEvent', ['$http', '$compile', '$location', function ($http, $compile, $location) {
		return {
			restrict: 'E',
			template: '<div></div>',
			controller: 'weeklyController',
			link: function(scope, element, attrs, weeklyController) {
				var hash = $location.$$hash;
				var chosenView = 'html/'+ hash + '.html';
				if (hash === 'biblestudy') {
					scope.isBibleStudy = true;
					scope.isSundaySchool = false;
				} else if (hash === 'sundayschool') {
					scope.isBibleStudy = false;
					scope.isSundaySchool = true;
				}

				$http.get(chosenView).then(function(result){
        	var html = result.data;
					element.html(html);
					$compile(element.contents())(scope);
      	});

				scope.$watch('url', function(newVal, oldVal) {
					if (newVal){
						$http.get(newVal).then(function(result){
            	var html = result.data;
							element.html(html);
							$compile(element.contents())(scope);
	        	});
					}
				})
			}
		}
	}]);

	app.directive('podcast', function() {
		return {
			restrict: 'E',
			template: '<div class="podcasts small-12 large-12 columns panel shadowed-image">' +
								'<div class="small-12 large-2 columns">'+
								'<a href="#" class="button"><i class="foundiconacc-speaker"></i> Listen </a>'+
								'</div>'+
								'<div class="small-12 large-2 columns"><p>August 13, 2013</p></div>'+
								'<div class="small-12 large-6 columns">'+
								'<h3>Nathan Ramirez</h3>'+
								'<h2>Final Camp Exhortation</h2>'+
								'</div>'+
								'<div class="small-12 large-2 columns">'+
								'<a href="Nathan Camp Final Exortation.mp3"><i class="foundicongen-inbox"></i> Download </a>'+
							  '</div>'+
								'</div>',
			link: function() {

			}
		}
	});

	app.directive('chosenPodcast', function() {
		return {
			restrict: 'E',
			template: '<div style="height: 300px; background: #f5f4f0 url(\'img/Smushed/podcasts-art.jpg\') center top repeat-y; background-size: cover">' +
									'<div class="small-12 medium-6 columns" style="height: 300px; overflow-y: scroll; color: #fff;">' +
						        '<h3 style="color: #fff;">{{currentSermon.title}}</h3>' +
						        '<h4 style="color: #fff;">{{currentSermon.speaker}}</h4>' +
						        '<h4 style="color: #fff;">{{currentSermon.series}}</h4>' +
						        '<p>{{currentSermon.date}}</p>' +
						        '<p><strong>Passage/Topic: {{currentSermon.passage}}</strong></p>' +
						        '<p class="show-for-small">{{currentSermon.description}}</p>' +
					        '</div>' + 
					        '<div class="hide-for-small small-12 medium-6 columns" style="height: 300px; overflow-y: scroll; color: #fff;">' +
					        	'<p>{{currentSermon.description}}</p>' +
				        	'</div>' + 
					      '</div>',
			link: function(scope, element, attrs, controller) {
			}
		}
	});

	/********************************************************************
   *
   *                         Utility Directives
   *
   ********************************************************************/
	app.directive("ngScopeElement", function () {
	  var directiveDefinitionObject = {
	    restrict: "A",
	    compile: function compile(tElement, tAttrs, transclude) {
	      return {
	          pre: function preLink(scope, iElement, iAttrs, controller) {
	            scope[iAttrs.ngScopeElement] = iElement;
	          }
	        };
	    }
	  };
	  return directiveDefinitionObject;
	});

  /********************************************************************
   *
   *                            Feed Reader
   *
   ********************************************************************/
  app.controller("FeedCtrl", ['$scope', 'httpService', function ($scope, httpService) {
   	$scope.loadButonText = "Load";
   	$scope.posts;

   	httpService.getBlogPosts().
   	success(function(data, status, headers, config) {
   		console.log('posts', data);

   		$scope.posts = data.items;
   	}).
   	error(function(data, status, headers, config) {
	  });

	  httpService.getBlog().
   	success(function(data, status, headers, config) {
   		console.log('blog', data.items);

   		$scope.blog = data.items;
   	}).
   	error(function(data, status, headers, config) {
	  });
	}]);

	app.service('httpService', ['$log', '$http', '$q', function ($log, $http, $q) {
		var self = this;
		
		// Request an API Key for the Blogger API from 
	  // https://code.google.com/apis/console/
	  var apikey = "AIzaSyBwh5B3d-nVf8Ut6mf690Id5miFFQ01s0M";
	  
	  // You can find the blogId in the HTML source of a blog
	  var blogId = "1357003820482584675";

	  self.getBlog = function() {
	  	var url = 'https://www.googleapis.com/blogger/v3/blogs/' +
	    blogId + '?key=' + apikey + '&callback=JSON_CALLBACK';
	    return $http.jsonp(url);
	  };
		self.getBlogPosts = function() {
	    var url = 'https://www.googleapis.com/blogger/v3/blogs/' +
	    blogId + '/posts?maxPosts=9999&key=' + apikey + '&callback=JSON_CALLBACK';
	    return $http.jsonp(url);
		};

		//--------------------------------------
		// Simple Post HTTP Get
		var simple = {
			deferred: null,
			mainLabel: '',
			container: {
		    items : new Array()
	    },
			getPost: function() {
				var url = 'https://www.googleapis.com/blogger/v3' +
				'/blogs/' + blogId + 
				'/posts?maxResults=20' +
				'&labels=' + simple.mainLabel +
				'&fields=nextPageToken,items(title,published,labels,content)'+
				'&key='+ apikey + '&callback=JSON_CALLBACK';

				$http.jsonp(url)
		    .success(function(data, status, headers, config) {
		    	simple.container.items.push.apply(simple.container.items, data.items);
		    	simple.deferred.resolve(simple.container);
		   	})
		   	.error(function(data, status, headers, config) {
		   		$log.error('httpService: simpleGet', data);
			  });
			},
			resetGet: function() {
				simple.deferred = $q.defer();
				simple.mainLabel = '';
				simple.container = {
			    items : new Array()
		    };
			},
		};
		self.getLabeledPost = function(label) {
			simple.resetGet();
			simple.deferred = $q.defer();
			simple.mainLabel = label;
			simple.getPost();
			return simple.deferred.promise;
		};
		self.resetSimpleGet = function() {
			simple.resetGet();
		};
		//--------------------------------------

		//--------------------------------------
		// Recursive Post HTTP Get
		var recursive = {
			deferred: null,
			mainLabel: '',
			container: {
				items : new Array()	
			},
			getPost: function(label, nextPageToken) {
				var url = 'https://www.googleapis.com/blogger/v3' +
					'/blogs/' + blogId + 
					'/posts?maxResults=20';
				if (nextPageToken) {
					url += '&pageToken='+ nextPageToken;
				}
				url += '&labels=' + recursive.mainLabel +
					'&fields=nextPageToken,items(title,published,labels,content)'+
					'&key='+ apikey + '&callback=JSON_CALLBACK';

				$http.jsonp(url)
		    .success(function(data, status, headers, config) {
	   			recursive.container.items.push.apply(recursive.container.items, data.items);
	   			if(data.nextPageToken) {
	   				recursive.getPost(recursive.mainLabel, data.nextPageToken);
	   			} else {
	          recursive.deferred.resolve(recursive.container);
	   			}
		   	})
		   	.error(function(data, status, headers, config) {
			  });
			},
			resetGet: function() {
				recursive.deferred = $q.defer();
				recursive.mainLabel = '';
	      recursive.container = {
			    items : new Array()
		    };
			},
		};
		self.getLabeledPostRecursive = function(label, nextPageToken) {
      recursive.resetGet();
			recursive.deferred = $q.defer();
			recursive.mainLabel = label;
			recursive.getPost();
			return recursive.deferred.promise;
		};
		self.resetRecursiveGet = function(){
			recursive.resetGet();
		};
		//--------------------------------------

    /*
		page tokens
		CgkIChiA45D1nigQ48DZtY_5wuoS
		CgkIChiE_-DznigQ48DZtY_5wuoS
		//*/
	}]);

	/********************************************************************
   *
   *                            Animations
   *
   ********************************************************************/


   /********************************************************************
   *
   *                            Unused
   *
   ********************************************************************/

  // ------------------------------------
	// Unused Controllers:
	app.controller('SlidesController', function() {
		/*
		new flux.slider('#slider', {
			autoplay: false,
      pagination: true,
		});
		//*/
		console.log('SlidesController');
		/*
		angular.element(document).foundation('orbit', {
	    animation: 'slide',
	    timer_speed: 5000,
	    pause_on_hover: false,
	    resume_on_mouseout: false,
	    animation_speed: 250,
	    stack_on_small: false,
	    navigation_arrows: false,
	    slide_number: false,
	    bullets: true,
	    timer: true,
	    variable_height: true,
	    container_class: 'orbit-container',
	    /*
	    stack_on_small_class: 'orbit-stack-on-small',
	    next_class: 'orbit-next',
	    prev_class: 'orbit-prev',
	    timer_container_class: 'orbit-timer',
	    timer_paused_class: 'paused',
	    timer_progress_class: 'orbit-progress',
	    slides_container_class: 'orbit-slides-container',
	    bullets_container_class: 'orbit-bullets',
	    bullets_active_class: 'active',
	    slide_number_class: 'orbit-slide-number',
	    caption_class: 'orbit-caption',
	    active_slide_class: 'active',
	    orbit_transition_class: 'orbit-transitioning',
	    
  	});
		//*/
		$(function () {
			console.log('run after doc load');
		});

	  //var minHeight = ($('.orbit-container .panel').first().height()+20);
	  //$('.orbit-slides-container').css({ 'min-height': minHeight });
	});
  app.controller('JoyrideController', ['$scope', function($scope) {
	  $scope.tour = function() {
	  	console.log('joyride controller working!');
	  }
  	/*
      $scope.takeATour = function() {
          console.log('starting the tour...');
          $(document).foundation('joyride', 'start', {
              /*
              tipLocation          : 'bottom',  // 'top' or 'bottom' in relation to parent
              //*/
              /*
              nubPosition          : 'auto',    // override on a per tooltip bases
              scrollSpeed          : 300,       // Page scrolling speed in milliseconds
              timer                : 8000,         // 0 = no timer , all other numbers = timer in milliseconds
              startTimerOnClick    : true,      // true or false - true requires clicking the first button start the timer
              startOffset          : 0,         // the index of the tooltip you want to start on (index of the li)
              nextButton           : true,      // true or false to control whether a next button is used
              tipAnimation         : 'fade',    // 'pop' or 'fade' in each tip
              pauseAfter           : [],        // array of indexes where to pause the tour after
              tipAnimationFadeSpeed: 300,       // when tipAnimation = 'fade' this is speed in milliseconds for the transition
              cookieMonster        : false,     // true or false to control whether cookies are used
              cookieName           : 'joyride', // Name the cookie you'll use
              cookieDomain         : false,     // Will this cookie be attached to a domain, ie. '.notableapp.com'
              cookieExpires        : 365,       // set when you would like the cookie to expire.
              tipContainer         : 'body',    // Where will the tip be attached
              postRideCallback     : function (){},    // A method to call once the tour closes (canceled or complete)
              postStepCallback     : function (){},    // A method to call after each step
              /*
              template : { // HTML segments for tip layout
              link    : '<a href="#close" class="joyride-close-tip">&times;</a>',
              timer   : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
              tip     : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
              wrapper : '<div class="joyride-content-wrapper"></div>',
              button  : '<a href="#" class="small button joyride-next-tip"></a>'
              }
              //*/
              /*
          });
      }
      //*/
  }]);
	app.controller('InitializeController', [function (){
		$(document).foundation();
	}]);
	app.controller('HomeController', ['$scope', 'httpService', function ($scope, httpService) {
    //--------------------------------------
    var label = '$$Upcoming Ministry Events';
    //$scope.title = label.substr(2, label.length);

    var allEvents = {};

    $scope.nextEvent;

    httpService.getLabeledPostRecursive(label).
	    then(function(data, status, headers, config) {
		    var today = new Date();

		    angular.forEach(data.items, function(value, key) {
			    var divider = value.title.indexOf(':');
			    var titleDate = value.title.substr(0,divider);
			    var title = value.title.substr(divider+1, value.title.length);

			    //var d = new Date(titleDate);
			    var d = parseISO8601(titleDate);

			    //console.log('d', titleDate, d);
			    //console.log('parse', titleDate, parseISO8601(titleDate));

			    var day = d.getDate();
			    var weekday = getDayText(d.getDay());
			    var month = getMonthText(d.getMonth());
			    var year = d.getFullYear();

			    value.title = title;
			    value.date = d;
			    value.dateText = weekday + ', ' + month + ' ' + day;

			    if (today > d) {
			    } else {
				    if (year) {
					    if(!allEvents[d]) {
   				    allEvents[d] = value;
   			    }
				    }
			    }
		    });

		    var nextUp;

		    angular.forEach(allEvents, function (value, key) {
			    if(!nextUp) {
				    nextUp = value.date;
			    } else if (nextUp > value.date) {
				    nextUp = value.date;
			    }
		    });

		    $scope.nextEvent = allEvents[nextUp];
		    
        //console.log($scope.nextEvent);
	    }).then(function() {
        httpService.resetRecursiveGet(); 
	      //--------------------------------------

        var newLabel = '$News/Updates';
    
        $scope.currentNews;

        var futureNews = new Array();
        var currentNews = new Array(); // Current News becomes Old News after 1 Week
        var oldNews = new Array();

        var mainTabs = {
	        0 : {
		        title: "Current News/Updates",
		        data: {}
	        }
        };

        httpService.resetRecursiveGet();
        httpService.getLabeledPostRecursive(newLabel).
	        then(function(data, status, headers, config) {
		        var today = new Date();

		        //console.log('home data', data);

		        angular.forEach(data.items, function(value, key) {
			        var divider = value.title.indexOf(':');
			        var titleDate = value.title.substr(0,divider);
			        var title = value.title.substr(divider+1, value.title.length);

			        //var d = new Date(titleDate);
			        var d = parseISO8601(titleDate);
			        var day = d.getDate();
			        var weekday = getDayText(d.getDay());
			        var month = getMonthText(d.getMonth());
			        var year = d.getFullYear();

			        value.title = title;
			        value.date = d;
			        value.dateText = 'For ' + weekday + ', ' + month + ' ' + day;

			        //console.log('before', value.date);

			        if (value.labels.indexOf('Sunday School Update') >= 0 || value.labels.indexOf('Bible Study Update') >= 0) {
				        var lastWeek = new Date(value.date.getTime() - (7*24*60*60*1000));

				        value.date = lastWeek;
				        //console.log('after', value.date);
			        }

			        var nextWeek = new Date(value.date.getTime() + (8*24*60*60*1000));
			        var nextDay = new Date(value.date.getTime() + (1*24*60*60*1000));

			        if (value.date > today) {
				        //futureNews.push(value);
			        } else {
				        if (today > nextWeek) {
 				        //oldNews.push(value);
 			        } else {
 				        if (value.labels.indexOf('Sunday School Update') >= 0 || value.labels.indexOf('Bible Study Update') >= 0) {
   				         if (today > nextDay) {
	   				        currentNews.push(value);
   				        } 
   			        } else {
   				        currentNews.push(value);
 				        }
 			        }
			        }
		        });

		        mainTabs[0].data = currentNews;

		        angular.forEach(mainTabs, function (value, key) {
			        value.data.sort(sortBlogPosts);
			        value.data.reverse();
		        });

		        $scope.currentNews = mainTabs[0].data;

            //console.log('home', $scope.currentNews);
        
            //--------------------------------------

		        //console.log('SlidesController');
	    
	    angular.element(document).foundation('orbit', {
	    	/*
        animation: 'slide',
        timer_speed: 5000,
        pause_on_hover: false,
        resume_on_mouseout: false,
        animation_speed: 250,
        stack_on_small: false,
        navigation_arrows: false,
        slide_number: false,
        bullets: true,
        timer: true,
        variable_height: true,
        container_class: 'orbit-container'
        /*
        stack_on_small_class: 'orbit-stack-on-small',
        next_class: 'orbit-next',
        prev_class: 'orbit-prev',
        timer_container_class: 'orbit-timer',
        timer_paused_class: 'paused',
        timer_progress_class: 'orbit-progress',
        slides_container_class: 'orbit-slides-container',
        bullets_container_class: 'orbit-bullets',
        bullets_active_class: 'active',
        slide_number_class: 'orbit-slide-number',
        caption_class: 'orbit-caption',
        active_slide_class: 'active',
        orbit_transition_class: 'orbit-transitioning',
        //*/
	    });

	    var minHeight = (angular.element('.orbit-container img').first().height()+20);
	    angular.element('.orbit-slides-container').css({ 'min-height': minHeight });

	    findBibleRefs();
    	});
    });
	}]);
	app.controller('BibleStudyController', ['$log', '$scope', 'httpService', function ($log, $scope, httpService) {
		$scope.options = [
  		{ value: 0, title: 'temp', content: 'temp' },
  		{ value: 1, title: 'temp', content: 'temp' },
  	];

  	$scope.switchOption = function() {
  		if ($scope.currentOption != null) {
  			if ($scope.currentOption.value === 0) {
  				$scope.getBibleStudyTemplate();
  			} else if ($scope.currentOption.value === 1) {
  				$scope.getSundaySchoolTemplate();
  			}

  			$scope.swipe.slide($scope.currentOption.value);
  		}
  	};
  	$scope.callback = function(index) {
  		$scope.currentOption = $scope.options[index];
  		if (!$scope.$$phase) {
    		$scope.$apply();
    	}
  	};

  	//************************************
    //************************************

		var container = {
      bibleStudy : {},
    	sundaySchool : {}
  	};
    var bibleStudyData;
    var sundaySchoolData;

    httpService.resetSimpleGet();
    httpService.getLabeledPost('$$Weekly Ministries')
    .then(function(data) {
	    if (data.items[0] && data.items[1]) {

		    var title = data.items[0].labels[0];

		    if (title.substr(0,2) === '$$') {
          $scope.title = 'Weekly Bible Study';
		    } else {
			    $scope.title = "Page Error";
			    return '';
		    }

		    if (data.items[0].title === 'Weekly Bible Study') {
			    bibleStudyData = data.items[0];
			    sundaySchoolData = data.items[1];
		    } else {
			    bibleStudyData = data.items[1];
			    sundaySchoolData = data.items[0];
		    }

		    container.sundaySchool.title = sundaySchoolData.title;
		    container.sundaySchool.content = sundaySchoolData.content;

		    container.bibleStudy.title = bibleStudyData.title;
		    container.bibleStudy.content = bibleStudyData.content;

		    $scope.getBibleStudyTemplate();

   			$scope.options[0].title = sundaySchoolData.title;
   			$scope.options[0].content = sundaySchoolData.content;
   			$scope.options[0].img = 'img/Smushed/weekly-2-banner.jpg';
   			$scope.options[0].mapLink = 'https://maps.google.com/maps?q=1411+kennoway+park,+Spring+TX,+77379&hl=en&sll=31.168934,-100.076842&sspn=10.237092,8.76709&hnear=1411+Kennoway+Park+Dr,+Spring,+Texas+77379&t=m&z=16';
				$scope.options[0].mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&sensor=false';
   			
   			$scope.options[1].title = bibleStudyData.title;
   			$scope.options[1].content = bibleStudyData.content;
   			$scope.options[1].img = 'img/Smushed/weekly-1-banner.jpg';
   			$scope.options[1].mapLink = 'https://maps.google.com/maps?q=24724+aldine+westfield,+spring+TX,+77373&hl=en&ll=30.065213,-95.401046&spn=0.010047,0.01457&sll=31.168934,-100.076842&sspn=10.762073,12.436523&hnear=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&t=m&z=16';
				$scope.options[1].mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=1411+kennoway+park,+Spring+TX,+77379&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C1411+kennoway+park,+Spring+TX,+77379&sensor=false';

   			$scope.currentOption = $scope.options[0];
	    	//$scope.createSwipe();
	    } else {
		    $scope.title = "Page Error";
	    }
    }, function(error) {
   		$log.error('WeeklyController: $$Weekly Ministries', error);
   	});

		$scope.getBibleStudyTemplate = function() {
			//$scope.url = 'html/test/biblestudy.html';
			$scope.image = 'img/Smushed/weekly-1-banner.jpg';
			$scope.subtitle = container.bibleStudy.title;
			$scope.content = container.bibleStudy.content;
			$scope.mapLink = 'https://maps.google.com/maps?q=1411+kennoway+park,+Spring+TX,+77379&hl=en&sll=31.168934,-100.076842&sspn=10.237092,8.76709&hnear=1411+Kennoway+Park+Dr,+Spring,+Texas+77379&t=m&z=16';
			$scope.mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=1411+kennoway+park,+Spring+TX,+77379&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C1411+kennoway+park,+Spring+TX,+77379&sensor=false';
			
			$scope.isBibleStudy = true;
			$scope.isSundaySchool = false;
		}
		$scope.getSundaySchoolTemplate = function() {
			//$scope.url = 'html/test/sundayschool.html';
			$scope.image = 'img/Smushed/weekly-2-banner.jpg';
			$scope.subtitle = container.sundaySchool.title;
			$scope.content = container.sundaySchool.content;
			$scope.mapLink = 'https://maps.google.com/maps?q=24724+aldine+westfield,+spring+TX,+77373&hl=en&ll=30.065213,-95.401046&spn=0.010047,0.01457&sll=31.168934,-100.076842&sspn=10.762073,12.436523&hnear=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&t=m&z=16';
			$scope.mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&sensor=false';
			
			$scope.isBibleStudy = false;
			$scope.isSundaySchool = true;
		}
  }]);
	// ------------------------------------
  

})();
