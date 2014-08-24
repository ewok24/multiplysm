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
			.when('/about',
				{
					templateUrl: 'html/about.html'
				})
			.when('/events',
				{
					templateUrl: 'html/events.html'
				})
			.when('/biblestudy',
				{
					templateUrl: 'html/biblestudy.html'
				})
			.when('/sundayschool',
				{
					templateUrl: 'html/sundayschool.html'
				})
			.when('/initiative',
				{
					templateUrl: 'html/initiative.html'
				})
			.when('/upcoming',
				{
					templateUrl: 'html/upcoming.html'
				})
			.when('/news',
				{
					templateUrl: 'html/news.html'
				})
			.when('/podcasts',
				{
					templateUrl: 'html/podcasts.html'
				})
			.when('/contact',
				{
					templateUrl: 'html/contact.html'
				})
      .when('/thankyou',
				{
					templateUrl: 'html/thankyou.html'
				})
      .when('/blog',
				{
					templateUrl: 'html/blog.html'
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


	function sortBlogPosts(a,b) { // sorts items by date
	  return a.date<b.date?-1:a.date>b.date?1:0;
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

  /********************************************************************
   *
   *                            Controllers
   *
   ********************************************************************/
	app.controller('TopBar', ['$scope', '$route', '$location', 'selectedService', function ($scope, $route, $location, selectedService) {
		$scope.go = function (path) {
		  $location.path(path);
		};

		$scope.sideBarItems = [
			{name: 'Home', url: '#/', label: false, path: '' },
			{name: 'About Us', url: '#/about', label: false, path: 'about' },
			{name: 'Ministries', url: '#/events', label: false, path: 'events' },
			{name: 'Weekly Bible Study', url: '#/biblestudy', label: false, path: 'biblestudy' },
			{name: 'Sunday School', url: '#/sundayschool', label: false, path: 'sundayschool' },
			{name: 'The Multiply Initiative', url: '#/initiative', label: false, path: 'initiative' },
			{name: 'Upcoming Ministry Events', url: '#/upcoming', label: false, path: 'upcoming' },
			{name: 'News/Updates', url: '#/news', label: false, path: 'news' },
			{name: 'Podcasts', url: '#/podcasts', label: false, path: 'podcasts' },
			{name: 'Contact', url: '#/contact', label: false, path: 'contact' }
		];
		$scope.items = [
			{name: 'Home', url: '#/'},
			{name: 'About Us', url: '#/about'},
			{name: 'Ministries', url: '#/events'},
			{name: 'News/Updates', url: '#/news'},
			{name: 'Podcasts', url: '#/podcasts'},
			{name: 'Contact', url: '#/contact'}
		];
		$scope.itemsLeft = [
			{ name: 'Home', url: '#/' , dropdown: false, nested: [] },
			{ name: 'About Us', url: '#/about', dropdown: false, nested: [] },
			/*
			{ name: 'Ministries', url: '#/events', dropdown: true, nested: [
				{ name: 'Weekly Ministries', url: '#/weekly#biblestudy', nested: [] },
				{ name: 'The Multiply Initiative', url: '#/initiative', nested: [] },
				{ name: 'Upcoming Ministry Events', url: '#/upcoming', nested: [] },
			] },
			{ name: 'News/Updates', url: '#/news', dropdown: false, nested: [] },
			{ name: 'Podcasts', url: '#/podcasts', dropdown: false, nested: [] },
			{ name: 'Contact', url: '#/contact', dropdown: false, nested: [] }
			//*/
		];
		$scope.itemsRight = [
			{name: 'News/Updates', url: '#/news'},
			{name: 'Podcasts', url: '#/podcasts'},
			{name: 'Contact', url: '#/contact'}
		];

		var update = function() {
			$scope.selected = selectedService.getSelected();
		}
		
		for (var i=0; i<$scope.items.length; i++) {
			if ($scope.items[i].url == document.location.hash) {
				$scope.selected = $scope.items[i];
			}
		}

		$scope.select = function (item) {
			$scope.ministrySelected = false;
      //console.log('Item', item);
      /*
      if (item.name === 'Home') {
        window.open('#', '_self');
      } else if (item.name === 'News/Updates') {
        window.open('#/news', '_self');
      } else {
        $route.reload();
      }
      //*/

			$scope.selected = item;
			$('.top-bar').removeClass('expanded');
			//selectedService.setSelected(item);
			slideToggle();
		}

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
    window.addEventListener('orientationchange', checkAndFlip);

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
	}]);

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

  /********************************************************************
   *
   *                         Page Controllers
   *
   ********************************************************************/

  app.controller('NewHomeController', ['$scope', function($scope) {
  	$scope.slides = [
  		{ url: '', src: 'img/slide0-MainSlide.png' }, 
  		{ url: '#/about', src: 'img/slide1-Welcome.png' }, 
  		{ url: '', src: 'img/slide1-Welcome.png' }, 
  	];

  	$scope.bullets = [
  		{ number: 0 },
  		{ number: 1 },
  		{ number: 2 },
  	];

  	$scope.selectedBullet = $scope.bullets[0];

    var mySwipe = Swipe(document.getElementById('slider'), {
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

    $scope.prevSlide = function() {
    	mySwipe.prev();
    };
    $scope.nextSlide = function() {
    	mySwipe.next();
    };
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

  app.controller('AboutController', ['$log', '$scope', 'httpService', function ($log, $scope, httpService) {
  	$scope.options = [
  		{ value: 0, title: 'temp', content: 'temp' },
  		{ value: 1, title: 'temp', content: 'temp' },
  	];

  	$scope.switchOption = function() {
  		if ($scope.currentOption != null) {
  			if ($scope.currentOption.value === 0) {
  				$scope.getMissionStatement();
  			} else if ($scope.currentOption.value === 1) {
  				$scope.getOurYouthPastor();
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
  		missionStatement : {},
  		ourYouthPastor : {}
  	};
  	var missionStatementData;
  	var ourYouthPastorData;

  	httpService.resetSimpleGet();
  	httpService.getLabeledPost('$About Us')
  	.then(function(data) {
   		if (data.items[0] && data.items[1]) {

   			var title = data.items[0].labels[0];

   			if (title.substr(0,1) === '$') {
   				$scope.title = title.substr(1,title.length);
   			} else {
   				$scope.title = "Page Error";
   				return '';
   			}

   			if (data.items[0].title === 'Our Youth Pastor') {
   				ourYouthPastorData = data.items[0];
   				missionStatementData = data.items[1];
   			} else {
   				ourYouthPastorData = data.items[1];
   				missionStatementData = data.items[0];
   			}

   			container.missionStatement.title = missionStatementData.title;
   			container.missionStatement.content = missionStatementData.content;

   			container.ourYouthPastor.title = ourYouthPastorData.title;
   			container.ourYouthPastor.content = ourYouthPastorData.content;

   			$scope.getMissionStatement();

   			$scope.options[0].title = missionStatementData.title;
   			$scope.options[0].content = missionStatementData.content;
   			$scope.options[0].img = 'img/Smushed/about-us-1-banner.jpg';
   			
   			$scope.options[1].title = ourYouthPastorData.title;
   			$scope.options[1].content = ourYouthPastorData.content;
   			$scope.options[1].img = 'img/Smushed/about-us-2-banner.jpg';

   			$scope.currentOption = $scope.options[0];
	    	$scope.createSwipe();
   		} else {
   			$scope.title = "Page Error";
   		}
   	}, function(error) {
   		$log.error('AboutController: $About Us', error);
   	});

		$scope.getMissionStatement = function() {
			$scope.subtitle = container.missionStatement.title;
			$scope.content = container.missionStatement.content;
			$scope.img = 'img/Smushed/about-us-1-banner.jpg';
			$scope.isMissionStatement = true;
			$scope.isOurYouthPastor = false;
		}
		$scope.getOurYouthPastor = function() {
			$scope.subtitle = container.ourYouthPastor.title;
			$scope.content = container.ourYouthPastor.content;
			$scope.img = 'img/Smushed/about-us-2-banner.jpg';
			$scope.isMissionStatement = false;
			$scope.isOurYouthPastor = true;
		}
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

	app.controller('SundaySchoolController', 
	['$log', '$scope', '$compile', 'httpService', 
	function ($log, $scope, $compile, httpService) {
		$scope.title = 'Sunday School';
  	$scope.subtitle = 'About';

  	$scope.slideArray = [];
  	
  	var defaultMaxVisible = 20;
  	var defaultLastVisible = 20;
  	$scope.isCurrent = true;
  	$scope.activeSlide = 0;
  	$scope.maxVisible = defaultMaxVisible;
  	$scope.lastVisible = defaultLastVisible;

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
  		$scope.maxVisible = defaultMaxVisible;
  		$scope.lastVisible = defaultLastVisible;
  	};
  	$scope.switchOption = function() {
  		$scope.activeSlide = $scope.currentOption.index;
  	};
  	$scope.loadTeacher = function(teacher) {
  		$scope.current = teacher;
  		//console.log('$scope.current', $scope.current);
  		$('#myModal').foundation('reveal', 'open');
  	};
		$scope.$watch('activeSlide', function(newVal, oldVal) {
    	if (oldVal !== newVal && !isNaN(newVal)) {
    		$scope.currentOption = $scope.slideArray[newVal];
    	}
    });

    $scope.teachers;
		$scope.current = {};
    var http = {
    	appendPostInfo: function(value) {
				var divider = value.title.indexOf(':');
				var gradeLevel = value.title.substr(0,divider);
				var teacherName = value.title.substr(divider+1, value.title.length);

				value.name = teacherName;
				value.gradeLevel = gradeLevel;

				if (teacherName.indexOf('Howard') > 0) {
					value.index = 0;
					value.img = 'img/Smushed/bio-howard.jpg';
				} else if (teacherName.indexOf('Hurd') > 0) {
					value.index = 1;
					value.img = 'img/Smushed/bio-hurd.jpg';
				} else if (teacherName.indexOf('Munns') > 0) {
					value.index = 2;
					value.img = 'img/Smushed/bio-munns.jpg';
				} else if (teacherName.indexOf('Hull') > 0) {
					value.index = 3;
					value.img = 'img/Smushed/bio-hull.jpg';
				} else if (teacherName.indexOf('Patino') > 0) {
					value.index = 4;
					value.img = 'img/Smushed/bio-patino.jpg';
				} else if (teacherName.indexOf('Loftin') > 0) {
					value.index = 5;
					value.img = 'img/Smushed/bio-loftin.jpg';
				} else {
					// ERROR
				}
			},
			removeContentTags: function(value) {
				var newString = value.content;
				
				newString = newString.replace(/&nbsp;/g, ' ');
				newString = newString.replace(/<br \/>|<br>/g, '<br/>');
				var regexString = /<div([^>]*)>|<\/div>|<span([^>]*)>|<\/span>|<p([^>]*)>|<\/p>/g;
				newString = newString.replace(regexString, '');
				var theMultiplyInitiative = '<span class="optimus">The Multiply Initiative</span>';
				newString = newString.replace(/The Multiply Initiative/g, theMultiplyInitiative);
				value.content = newString;
			},
    	getPostsSundaySchool: function(isError) {
    		//console.log('isError', isError);
    		var label = '$$$Sunday School';
    		return httpService.getLabeledPost(label)
  			.then(function(data) {
  				if (!isError) {
						var value = data.items[0];
						if (data.items && data.items[0] && data.items[0].title === 'About') {
							value = data.items[0];
						} else {
							value = data.items[1];
						}
			   		if (value) {
			   			// Append info to all blog posts and use
			   			// regex to sanitize value.content (html)
			   			//removeContentTags(value);
			   			appendPostInfo(value);
			   			var img = 'img/Smushed/weekly-2-banner.jpg';
			   			var imgEl = '<img src="' + img + '" />';

		   				var mapLink = 'https://maps.google.com/maps?q=1411+kennoway+park,+Spring+TX,+77379&hl=en&sll=31.168934,-100.076842&sspn=10.237092,8.76709&hnear=1411+Kennoway+Park+Dr,+Spring,+Texas+77379&t=m&z=16';
							var mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&sensor=false';
			   			
			   			var map = '<a href="' + mapLink + '" target="_blank"> \
				   								<img class="bordered-image" \
				   									src="' + mapImg + '"> \
													</img> \
												</a>';

			   			var slideObject = {
			   				heading: 'Sunday School',
			   				index: 0,
			   				title: value.title,
			   				date: '',
			   				content: imgEl + value.content + map,
			   			};
			   			$scope.slideArray.push(slideObject);
			   			// Set the currentOption
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
	   			if (!isError) {
			   		//console.log(label, 'data', data);
			   		var value = data.items[0];
			   		if (value) {
			   			angular.forEach(data.items, function(value, key) {
				   			http.removeContentTags(value);
				   			http.appendPostInfo(value);
			   			});
							data.items.sort(function(a, b) { return a.index-b.index });
			   			
			   			$scope.teachers = data.items;
			   			
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
							
							var compiledElem = $compile(teacherHtml)($scope);
			   			$scope.compiledElem = compiledElem;
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
    	getPostsUpdates: function(isError) {
    		//console.log('isError', isError);
    		var label = '$$$Sunday School Posts';
   			return httpService.getLabeledPostRecursive(label)
	   		.then(function(data) {
	   			if (!isError) {
			   		//console.log(label, 'data', data);
			   		var value = data.items[0];
			   		if (value) {
			   			// Append info to all blog posts and use
				   		// regex to sanitize value.content (html)
				   		angular.forEach(data.items, function(value, key) {
				   			http.removeContentTags(value);
				   			appendPostInfo(value);
			   			});
			   			// Sort posts by most recent date first
			   			// $log.debug('Sorting Blog Posts');
			   			data.items.sort(sortBlogPosts);
			   			data.items.reverse();
			   			// Push all content into slideArray
			   			angular.forEach(data.items, function(value, key) {
			   				var slideObject = {
			   					heading: 'Updates',
			   					index: key + 1,
			   					title: value.title,
			   					date: value.dateText,
			   					content: value.content,
			   				};
				   			$scope.slideArray.push(slideObject);
			   			});
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
    	}
    };

    httpService.resetSimpleGet();
  	http.getPostsSundaySchool()
  		.then(http.getPostsTeacherBios)
  		.then(http.getPostsUpdates)
  		.then(function() {
  			$log.debug('Promise Chaining is DONE!!!!');
  		});
	}]);

	var appendPostInfo = function(value) {
		var divider = value.title.indexOf(':');
		var titleDate = value.title.substr(0,divider);
		var title = value.title.substr(divider+1, value.title.length);

		var d = parseISO8601(titleDate);
		var day = d.getDate();
		var weekday = getDayText(d.getDay());
		var month = getMonthText(d.getMonth());
		var year = d.getFullYear();

		value.title = title;
		value.date = d;
		value.dateText = weekday + ', ' + month + ' ' + day;
	};
	var removeContentTags = function(value) {
		//var newString = value.content.replace('<([^>]*)>', '');
		var newString = value.content;
		
		newString = newString.replace(/&nbsp;/g, ' ');
		//console.log('newString', newString);
		//console.log('***************************');
		
		newString = newString.replace(/<br \/>|<br>/g, '<br/><br/>');
		//console.log('newString', newString);
		//console.log('***************************');
		
		var regexString = /<div([^>]*)>|<\/div>|<span([^>]*)>|<\/span>|<p([^>]*)>|<\/p>/g;
		newString = newString.replace(regexString, '');
		//console.log('newString', newString);
		//console.log('***************************');
		
		var theMultiplyInitiative = '<span class="optimus">The Multiply Initiative</span>';
		newString = newString.replace(/The Multiply Initiative/g, theMultiplyInitiative);
		//console.log('newString', newString);
		//console.log('***************************');
		
		value.content = newString;
	};

	app.controller('InitiativeController', ['$log', '$scope', 'httpService', function ($log, $scope, httpService) {
		$scope.title = 'The Multiply Initiative';
  	$scope.subtitle = 'Meditations';

  	$scope.slideArray = [
  		/*
  		{ 
  			heading: 'About',
  			title: 'The Multiply Initiative',
  			date: null,
  			content: 'The Multiply Initiative is a ...' 
			},
  		//*/
  	];
  	
  	var defaultMaxVisible = 15;
  	var defaultLastVisible = 15;
  	$scope.isCurrent = true;
  	$scope.activeSlide = 0;
  	$scope.maxVisible = defaultMaxVisible;
  	$scope.lastVisible = defaultLastVisible;

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
  		$scope.maxVisible = defaultMaxVisible;
  		$scope.lastVisible = defaultLastVisible;
  	};
  	$scope.switchOption = function() {
  		$scope.activeSlide = $scope.currentOption.index;
  	};

		var isError = false;
		
		$scope.$watch('activeSlide', function(newVal, oldVal) {
    	if (oldVal !== newVal && !isNaN(newVal)) {
    		$scope.currentOption = $scope.slideArray[newVal];
    	}
    });

    httpService.resetSimpleGet();
  	httpService.getLabeledPost('$$$The Multiply Initiative')
		.then(function(data) {
			var value = data.items[0];
   		if (value) {
   			console.log('$$$The Multiply Initiative data', data);
   			// Append info to all blog posts and use
   			// regex to sanitize value.content (html)
   			removeContentTags(value);
   			appendPostInfo(value);
   			var slideObject = {
   				heading: 'About',
   				index: 0,
   				title: value.title,
   				date: '',
   				content: value.content,
   			};
   			$scope.slideArray.push(slideObject);
   		} else {
   			isError = true;
   		}
 		}, function(error) {
   		$log.error('InitiativeController: $$$The Multiply Initiative', error);
   	})
   	.then(function() {
   		if (!isError) {
   			httpService.getLabeledPostRecursive('$$$Meditations')
	   		.then(function(data) {
		   		console.log('$$$Meditations data', data);
		   		
		   		// Append info to all blog posts and use
		   		// regex to sanitize value.content (html)
		   		angular.forEach(data.items, function(value, key) {
		   			removeContentTags(value);
		   			appendPostInfo(value);
	   			});
	   			// Sort posts by most recent date first
	   			$log.debug('Sorting Blog Posts');
	   			data.items.sort(sortBlogPosts);
	   			data.items.reverse();
	   			// Push all content into slideArray
	   			angular.forEach(data.items, function(value, key) {
	   				var slideObject = {
	   					heading: 'Meditations',
	   					index: key + 1,
	   					title: value.title,
	   					date: value.dateText,
	   					content: value.content,
	   				};
		   			$scope.slideArray.push(slideObject);
	   			});
	   			// Set the currentOption
	   			$scope.currentOption = $scope.slideArray[0];
				}, function(error) {
					$log.error('InitiativeController: $$$Meditations', error);
				});
   		}
   	});
	}]);

	app.controller('UpcomingController', ['$scope', 'httpService', function ($scope, httpService) {
		$scope.callback = function(index) {
  	};
  	var setCover = function(data) {
  		data.imgLarge = 'img/Smushed/upcoming-default.jpg';
  		data.visible = true;

  		for (var i = 0; i < data.labels.length; i++) {
  			//console.log('data', data.title.substr(0,15));
  			if (data.title.indexOf('Youth Mission Trip') > -1) {
  				data.imgSmall = 'img/Smushed/upcoming-youth-mission-trip.jpg';
  				data.imgLarge = 'img/Smushed/upcoming-youth-mission-trip.jpg';
  				break;
  			} else if (data.title.indexOf('Crawdad') > -1) {
  				data.imgSmall = 'img/Smushed/upcoming-crawdad-small.jpg';
  				data.imgLarge = 'img/Smushed/upcoming-crawdad.jpg';
  				data.visible = false;
  				break;
  			} else if (data.title.indexOf('Summer Lock-In') > -1) {
  				data.imgSmall = 'img/Smushed/upcoming-lock-in.jpg';
  				data.imgLarge = 'img/Smushed/upcoming-lock-in.jpg';
  				break;
  			} else if (data.labels[i] === 'Evangelism') {
  				data.imgSmall = 'img/Smushed/upcoming-evangelism.jpg';
  				data.imgLarge = 'img/Smushed/upcoming-evangelism.jpg';
  				break;
  			} else if (data.labels[i] === 'Afterglow') {
  				break;
  			} else if (data.labels[i] === 'Afterglow') {
  				break;
  			} else if (data.labels[i] === 'Afterglow') {
  				break;
  			} else {
  			}
  		}
  	};

  	//************************************
    //************************************

  	var label = '$$Upcoming Ministry Events';
  	$scope.title = label.substr(2, label.length);
  	
  	var upcomingEvents = {};
  	var oldEvents = {};

  	$scope.allUpcomingEvents;
  	// = new Array();

  	httpService.resetRecursiveGet();
  	httpService.getLabeledPostRecursive(label)
  	.then(function(data) {
   		var today = new Date();

   		console.log('data', data);

   		//data.items.reverse();

   		angular.forEach(data.items, function(value, key) {
   			var divider = value.title.indexOf(':');
   			var titleDate = value.title.substr(0,divider);
   			var title = value.title.substr(divider+1, value.title.length);

   			//var d = new Date(titleDate);
   			var d = parseISO8601(titleDate);
   			var dPlusOne = parseISO8601(titleDate);
   			dPlusOne.setDate(dPlusOne.getDate() + 1);
   			var day = d.getDate();
   			var weekday = getDayText(d.getDay());
   			var month = getMonthText(d.getMonth());
   			var year = d.getFullYear();

   			//console.log('parse', titleDate, parseISO8601(titleDate));

   			value.title = title;
   			value.date = d;
   			value.dateText = weekday + ', ' + month + ' ' + day;
   			setCover(value);


   			if (today > dPlusOne) {
   				if (!oldEvents[year]) {
	   				oldEvents[year] = {
	   					year: year,
	   					events: new Array()
	   				};
	   			}
	   			oldEvents[year].events.push(value);
   			} else {
   				if (year) {
   					if (!upcomingEvents[year]) {
		   				upcomingEvents[year] = {
		   					year: year,
		   					events: new Array()
		   				};
		   			}
		   			upcomingEvents[year].events.push(value);
   				}
   			}
   		});

   		//console.log('pre-sorted', upcomingEvents);

   		//var sortedEvents = $.extend(true, {}, upcomingEvents);
   		//upcomingEvents.slice(0);

   		angular.forEach(upcomingEvents, function (value, key) {
   			value.events.sort(sortBlogPosts);
   		});

   		//console.log('post-sorted', sortedEvents);

   		$scope.allUpcomingEvents = upcomingEvents;

   		console.log('$scope', $scope);
   		//$scope.createSwipe();
   	}, function(error) {
   		$log.error('UpcomingController: $$Upcoming Ministry Events', error);
   	});
	}]);

	var removeContentTags2 = function(value) {
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
	};

	app.controller('NewsController', ['$log', '$scope', 'httpService', function ($log, $scope, httpService) {
		$scope.title = 'News/Updates';
  	//$scope.subtitle = 'Meditations';

  	$scope.slideArray = [
  		/*
  		{ 
  			heading: 'About',
  			title: 'The Multiply Initiative',
  			date: null,
  			content: 'The Multiply Initiative is a ...' 
			},
  		//*/
  	];
  	
  	var defaultMaxVisible = 15;
  	var defaultLastVisible = 15;
  	$scope.isCurrent = true;
  	$scope.activeSlide = 0;
  	$scope.maxVisible = defaultMaxVisible;
  	$scope.lastVisible = defaultLastVisible;

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
  		$scope.maxVisible = defaultMaxVisible;
  		$scope.lastVisible = defaultLastVisible;
  	};
  	$scope.switchOption = function() {
  		$scope.activeSlide = $scope.currentOption.index;
  	};

		$scope.$watch('activeSlide', function(newVal, oldVal) {
    	if (oldVal !== newVal && !isNaN(newVal)) {
    		$scope.currentOption = $scope.slideArray[newVal];
    	}
    });

    httpService.resetRecursiveGet();
  	httpService.getLabeledPostRecursive('$News/Updates')
 		.then(function(data) {
   		console.log('$News/Updates data', data);
   		
   		// Append info to all blog posts and use
   		// regex to sanitize value.content (html)
   		angular.forEach(data.items, function(value, key) {
   			removeContentTags2(value);
   			appendPostInfo(value);
 			});
 			// Sort posts by most recent date first
 			$log.debug('Sorting Blog Posts');
 			data.items.sort(sortBlogPosts);
 			data.items.reverse();
 			// Push all content into slideArray
 			angular.forEach(data.items, function(value, key) {
 				var slideObject = {
 					//heading: 'Meditations',
 					index: key,
 					title: value.title,
 					date: value.dateText,
 					content: value.content,
 				};
   			$scope.slideArray.push(slideObject);
 			});
 			// Set the currentOption
 			$scope.currentOption = $scope.slideArray[0];
		}, function(error) {
			$log.error('InitiativeController: $$$Meditations', error);
		});
	}]);

	app.controller('PodcastsController', ['$log', '$scope', 'httpService', function ($log, $scope, httpService) {
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

  app.controller('ContactController', ['$log', '$scope', 'httpService', function ($log, $scope, httpService) {
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

  /********************************************************************
   *
   *                            UI Directives
   *
   ********************************************************************/
	
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
	    	if (isInternal && !isNaN(newVal) && scope.slides.length >= infiniteSwipe.minLength) {
	    		//console.log('switch to newVal', newVal);
	    		isDigest = false;
	    		goToPage(newVal);
	    		//console.log('infiniteSwipe.carousel', infiniteSwipe.carousel);
	    	} 
	    	isInternal = true;
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
	    	infiniteSwipe.carousel.goToPage(index);
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


})();

