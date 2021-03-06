
(function () {

	$(function() {
		FastClick.attach(document.body);
	});

	var app = angular.module('msmApp', ['angulartics', 'angulartics.google.analytics']);
	//var app = angular.module('msmApp', []);

	app.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/',
				{
					templateUrl: 'html/test/home.html',
				})
			.when('/about',
				{
					templateUrl: 'html/test/about.html',
				})
			.when('/events',
				{
					templateUrl: 'html/events.html',
				})
			.when('/weekly',
				{
					templateUrl: 'html/test/weekly.html',
				})
			.when('/initiative',
				{
					templateUrl: 'html/test/initiative.html',
				})
			.when('/upcoming',
				{
					templateUrl: 'html/test/upcoming.html',
				})
			.when('/news',
				{
					templateUrl: 'html/news.html',
				})
			.when('/podcasts',
				{
					controller: 'podcastsController',
					templateUrl: 'html/podcasts.html',
				})
			.when('/contact',
				{
					templateUrl: 'html/test/contact.html',
				})
      .when('/thankyou',
				{
					templateUrl: 'html/thankyou.html',
				})
      .when('/blog',
				{
					templateUrl: 'html/test/blog.html',
				})
			.otherwise({ redirectTo: '/' });
	});

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
			setSelected: setSelected,
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

	function sortBlogPosts(a,b){
	  return a.date<b.date?-1:a.date>b.date?1:0;
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
	};

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

  /********************************************************************
   *
   *                            Controllers
   *
   ********************************************************************/
	app.controller('TopBar', function($scope, $route, selectedService) {
		$scope.items = [
			{name: 'Home', url: '#'},
			{name: 'About Us', url: '#/about'},
			{name: 'Ministries', url: '#/events'},
			{name: 'News/Updates', url: '#/news'},
			{name: 'Podcasts', url: '#/podcasts'},
			{name: 'Contact', url: '#/contact'},
		];

		var update = function() {
			$scope.selected = selectedService.getSelected();
		}
		//selectedService.setSelected($scope.items[0], $scope.$id, update);
		$scope.selected = $scope.items[0];
		//$scope.selected = selectedService.getSelected();

		$scope.select = function (item) {
			$route.reload();
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
	});

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

  app.controller('JoyrideController', function($scope) {
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
  });

	app.controller('InitializeController', function (){
		$(document).foundation();
	});

	app.controller('podcastsController', function($scope) {
		$('audio').mediaelementplayer();

		$scope.playThis = function (pathToAudio) {
			//console.log(pathToAudio);
			var player = new MediaElementPlayer('#podcastPlayer');
			player.pause();
			player.setSrc(pathToAudio);
			player.play();
		}
	});

	/********************************************************************
   *
   *                         Page Controllers
   *
   ********************************************************************/
  app.controller('homeController', ['$scope', 'httpService', function ($scope, httpService) {
  	//console.log('HomeController');
	  //--------------------------------------

  	var upcomingData;

  	label = '$$Upcoming Ministry Events';
  	$scope.title = label.substr(2, label.length);
  	
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

   		//--------------------------------------

   		//console.log('SlidesController');
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
		    //*/
	  	});

	  	var minHeight = (angular.element('.orbit-container img').first().height()+20);
	  	angular.element('.orbit-slides-container').css({ 'min-height': minHeight });

   	});
	}]);

  app.controller('AboutController', ['$scope', 'httpService', function ($scope, httpService) {

  	var container = {
  		missionStatement : {},
  		ourYouthPastor : {},
  	};
  	var missionStatementData;
  	var ourYouthPastorData;

  	httpService.getLabeledPost('$About Us').
   	success(function(data, status, headers, config) {
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
   		} else {
   			$scope.title = "Page Error";
   		}

   	}).
   	error(function(data, status, headers, config) {
	  });

		$scope.getMissionStatement = function() {
			$scope.subtitle = container.missionStatement.title;
			$scope.content = container.missionStatement.content;
			$scope.isMissionStatement = true;
			$scope.isOurYouthPastor = false;
		}
		$scope.getOurYouthPastor = function() {
			$scope.subtitle = container.ourYouthPastor.title;
			$scope.content = container.ourYouthPastor.content;
			$scope.isMissionStatement = false;
			$scope.isOurYouthPastor = true;
		}
	}]);

	app.controller('WeeklyController', ['$scope', 'httpService', function ($scope, httpService) {
		var container = {
  		bibleStudy : {},
  		sundaySchool : {},
  	};
  	var bibleStudyData;
  	var sundaySchoolData;

  	httpService.getLabeledPost('$$Weekly Ministries').
   	success(function(data, status, headers, config) {
   		if (data.items[0] && data.items[1]) {

   			var title = data.items[0].labels[0];

   			if (title.substr(0,2) === '$$') {
   				$scope.title = title.substr(2,title.length);
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
   		} else {
   			$scope.title = "Page Error";
   		}

   	}).
   	error(function(data, status, headers, config) {
	  });

		$scope.getBibleStudyTemplate = function() {
			//$scope.url = 'html/test/biblestudy.html';
			$scope.image = 'img/Revelation_s.png';
			$scope.subtitle = container.bibleStudy.title;
			$scope.content = container.bibleStudy.content;
			$scope.mapLink = 'https://maps.google.com/maps?q=1411+kennoway+park,+Spring+TX,+77379&hl=en&sll=31.168934,-100.076842&sspn=10.237092,8.76709&hnear=1411+Kennoway+Park+Dr,+Spring,+Texas+77379&t=m&z=16';
			$scope.mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=1411+kennoway+park,+Spring+TX,+77379&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C1411+kennoway+park,+Spring+TX,+77379&sensor=false';
			
			$scope.isBibleStudy = true;
			$scope.isSundaySchool = false;
		}
		$scope.getSundaySchoolTemplate = function() {
			//$scope.url = 'html/test/sundayschool.html';
			$scope.image = 'img/proverbs_s.png';
			$scope.subtitle = container.sundaySchool.title;
			$scope.content = container.sundaySchool.content;
			$scope.mapLink = 'https://maps.google.com/maps?q=24724+aldine+westfield,+spring+TX,+77373&hl=en&ll=30.065213,-95.401046&spn=0.010047,0.01457&sll=31.168934,-100.076842&sspn=10.762073,12.436523&hnear=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&t=m&z=16';
			$scope.mapImg = 'http://maps.googleapis.com/maps/api/staticmap?center=24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Ccolor:red%7Clabel:A%7C24724+Aldine+Westfield+Rd,+Spring,+Texas+77373&sensor=false';
			
			$scope.isBibleStudy = false;
			$scope.isSundaySchool = true;
		}
	}]);

	app.controller('InitiativeController', ['$scope', 'httpService', function ($scope, httpService) {

  	label = '$$The Multiply Initiative';
  	$scope.title = label.substr(2, label.length);

  	var startDate = parseISO8601('2013-10-20');
  	var activeIndex = 0;

  	var mainTabs = {
  		0 : {
  			title: "Today's Meditation",
  			isActive: false,
  			data: {},
  		},
  		1 : {
  			title: "The Multiply Initiative",
  			isActive: false,
  			data: {},
  		},
  	};
  	var weeklyData = {};

  	$scope.mainTabs = mainTabs;

  	$scope.loadTemplate = function(data, index) {
  		mainTabs[activeIndex].isActive = false;
  		mainTabs[index].isActive = true;
  		activeIndex = index;

  		$scope.displayed = data;

  		//console.log('displayed', data, $scope.displayed);
  	}

  	httpService.getLabeledPost('$$$The Multiply Initiative').
   	success(function(data, status, headers, config) {
   		//console.log('Multiply initiative', data);
   		if (data.items[0]) {
   			mainTabs[1].title = data.items[0].title;
   			mainTabs[1].data = new Array(data.items[0]);
   		}
   	}).
   	error(function(data, status, headers, config) {
	  });

  	httpService.getLabeledPost('$$$Meditations').
   	success(function(data, status, headers, config) {
   		//console.log('data', data);
   		var today = new Date();
   		var maxWeek = -1;
   		var mostRecentDate;
   		var dateDataMaps = {};

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

   			//console.log('d', titleDate, d);
   			//console.log('parse', titleDate, parseISO8601(titleDate));

   			value.title = title;
   			value.date = d;
   			value.dateText = weekday + ', ' + month + ' ' + day;

   			if (!mostRecentDate) {
   				mostRecentDate = d;
   			} else if (d > mostRecentDate) {
   				mostRecentDate = d;
   			}

   			dateDataMaps[d] = value;

   			if (isSameDate(today, d)) { // add to Today's Meditation
   				//console.log('today!');
   				var week = Math.ceil(dateDiff(startDate, d)/7);
   				if (week > maxWeek) {
   					maxWeek = week;
   				}
   				if (!weeklyData[week]) {
   					weeklyData[week] = {
   						data: new Array(),
   					};
   				}
   				weeklyData[week].data.push(value);

   				mainTabs[0].data = new Array(value);
   			} else if (d <= today) {
   				var week = Math.ceil(dateDiff(startDate, d)/7);
   				if (week > maxWeek) {
   					maxWeek = week;
   				}
   				if (!weeklyData[week]) {
   					weeklyData[week] = {
   						data: new Array(),
   					};
   				}
   				weeklyData[week].data.push(value);
   			} else { //upcoming
   				// don't post
   			}
 			});

			//console.log(dateDataMaps);

			if (!mainTabs[0].data[0]) {
				mainTabs[0].data = new Array(dateDataMaps[mostRecentDate]);
			}

			//console.log('mainTabs', mainTabs);

 			//console.log(maxWeek);
   		for (var i=2; i<maxWeek+2; i++) {
   			var number = maxWeek+2-i;
   			if (mainTabs[i]) {
   				mainTabs[i] = {};
   			}
   			if (!weeklyData[number]) {
   				weeklyData[number] = {
   					data: new Array(),
   				}
   			}
   			mainTabs[i] = {
   				title: 'Week ' + number,
   				isActive: false,
   				data: weeklyData[number].data,
   			}
   		}

   		angular.forEach(mainTabs, function (value, key) {
   			value.data.sort(sortBlogPosts);
   			value.data.reverse();
   		});

   		//console.log(weeklyData);
   		//console.log(mainTabs);
   		
   		/*

   			if (today > d) {
   				if (!oldEvents[year]) {
	   				oldEvents[year] = {
	   					year: year,
	   					events: new Array(),
	   				};
	   			}
	   			oldEvents[year].events.push(value);
   			} else {
   				if (!upcomingEvents[year]) {
	   				upcomingEvents[year] = {
	   					year: year,
	   					events: new Array(),
	   				};
	   			}
	   			upcomingEvents[year].events.push(value);
   			}
			//*/
			console.log('mainTabs', mainTabs)
			$scope.loadTemplate(mainTabs[0].data,0);
		}).
   	error(function(data, status, headers, config) {
	  });
	}]);

	app.controller('UpcomingController', ['$scope', 'httpService', function ($scope, httpService) {
  	var upcomingData;

  	label = '$$Upcoming Ministry Events';
  	$scope.title = label.substr(2, label.length);
  	
  	var upcomingEvents = {};
  	var oldEvents = {};

  	$scope.allUpcomingEvents;
  	// = new Array();

  	httpService.getLabeledPostRecursive(label).
   	then(function(data, status, headers, config) {
   		var today = new Date();

   		//data.items.reverse();

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

   			//console.log('d', titleDate, d);
   			//console.log('parse', titleDate, parseISO8601(titleDate));

   			value.title = title;
   			value.date = d;
   			value.dateText = weekday + ', ' + month + ' ' + day;

   			if (today > d) {
   				if (!oldEvents[year]) {
	   				oldEvents[year] = {
	   					year: year,
	   					events: new Array(),
	   				};
	   			}
	   			oldEvents[year].events.push(value);
   			} else {
   				if (year) {
   					if (!upcomingEvents[year]) {
		   				upcomingEvents[year] = {
		   					year: year,
		   					events: new Array(),
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
   	});
	}]);

  app.controller('ContactController', ['$scope', 'httpService', function ($scope, httpService) {

  	httpService.getLabeledPost('$Contact').
   	success(function(data, status, headers, config) {
   		if (data.items[0]) {
   			var pageData = data.items[0];
   			$scope.title = pageData.title;
   			$scope.content = pageData.content;
   		} else {
   			$scope.title = "Page Error";
   		}

   	}).
   	error(function(data, status, headers, config) {
	  });
	}]);


  /********************************************************************
   *
   *                            Directives
   *
   ********************************************************************/
	app.directive('weeklyEvent', function ($http, $compile, $location) {
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
			},
		}
	});

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

	app.service('httpService', ['$http', '$q', function ($http, $q) {
		var self = this;
		
		// Request an API Key for the Blogger API from 
	  // https://code.google.com/apis/console/
	  var apikey = "AIzaSyBwh5B3d-nVf8Ut6mf690Id5miFFQ01s0M";
	  
	  // You can find the blogId in the HTML source of a blog
	  var blogId = "1357003820482584675";

	  self.getBlog = function() {
	  	var url = 'https://www.googleapis.com/blogger/v3/blogs/' +
	    blogId + '?key=' + apikey + '&callback=JSON_CALLBACK';
	    
	    //console.log(url);
	    return $http.jsonp(url);
	  };
		self.getBlogPosts = function() {     
	    var url = 'https://www.googleapis.com/blogger/v3/blogs/' +
	    blogId + '/posts?maxPosts=9999&key=' + apikey + '&callback=JSON_CALLBACK';
	    
	    //console.log(url);
	    return $http.jsonp(url);
		};
		self.getLabeledPost = function(label) {
			var url = 'https://www.googleapis.com/blogger/v3' +
			'/blogs/' + blogId + 
			'/posts?maxResults=20' +
			'&labels=' + label +
			'&fields=nextPageToken,items(title,published,labels,content)'+
			'&key='+ apikey + '&callback=JSON_CALLBACK';

			//console.log(url);
	    return $http.jsonp(url);
		};

		var recursiveContainer = {
			items : new Array()
		};
		var mainLabel;
		var deferred;

		var recursiveGet = function(label, nextPageToken) {
			var url = 'https://www.googleapis.com/blogger/v3' +
			'/blogs/' + blogId + 
			'/posts?maxResults=20';
			if (nextPageToken) {
				url += '&pageToken='+ nextPageToken;
			}
			url += '&labels=' + mainLabel +
			'&fields=nextPageToken,items(title,published,labels,content)'+
			'&key='+ apikey + '&callback=JSON_CALLBACK';

			//console.log('>>recursiveGet<<', mainLabel, nextPageToken, url);
	    $http.jsonp(url).
   		success(function(data, status, headers, config) {
   			//recursiveContainer.items.push(data.items);
   			recursiveContainer.items.push.apply(recursiveContainer.items, data.items);
   			if(data.nextPageToken) {
   				recursiveGet(mainLabel, data.nextPageToken);
   			} else {
   				deferred.resolve(recursiveContainer);
   			}
	   	}).
	   	error(function(data, status, headers, config) {
		  });
		};

		self.getLabeledPostRecursive = function(label, nextPageToken) {
			deferred = $q.defer();
			mainLabel = label;

			recursiveGet();

			return deferred.promise;
		};

		/*
		page tokens
		CgkIChiA45D1nigQ48DZtY_5wuoS
		CgkIChiE_-DznigQ48DZtY_5wuoS

		//*/
	}]);

})();

