/*START*/
/*DATE & TIME-LINEs CONTROLLER*/
//Require jQuery
angular.module('clhGunttApp').controller('gunttDateTimeCtrl', function($scope, $interval, $log, $window, $document)
{

			
	//MAIN ELEMENTS DYNAMIC WIDTH Fn
	$interval( function()
		{
			$scope.mainWidth  = angular.element( jQuery('.guntt-nav-head-main') ).width();
			$scope.panelWidth = angular.element( jQuery('.nav-panel-control-main') ).width();
			$scope.dateTableWidth = angular.element ( jQuery('.table-time') ).width();
			
			$scope.dateTableWidthDynamic = $scope.dateTableWidth;

			//time right width
			$scope.tTableHeader = $scope.mainWidth - 320;
				
		}, 100
	);
	// end

	
//*START*/////////////////* TIME TABLE - TIME DISPLAY CONTROL PANEL *////////////////////////
	
	//Date TODAY is a Default date for DISPLAY DATE TABLE
	$scope.toDay = new Date();
	
	//SET DEFAULT TIME DISPLAY LIMITS
	$scope.userTimeCollection.displayDateTop = $scope.toDay.setHours(23,59);
	$scope.userTimeCollection.displayDateBottom = $scope.toDay.setHours(0,0);
	$scope.userTimeCollection.displayDay = $scope.toDay.getDay(); 

	
	//Increase Date TODAY for 1 day ahead in DISPLAY DATE TABLE by each click "DAY >>"
	$scope.dayPlus = function()
	{
		var dayIncrease = $scope.toDay.getDate();
		
		dayIncrease+=1;
		
		$scope.toDay.setDate(dayIncrease);

		//add to userTimeCollection new date TIME DISPLAY LIMITS
		$scope.userTimeCollection.displayDateBottom = $scope.toDay.setHours(0,0);
		$scope.userTimeCollection.displayDateTop = $scope.toDay.setHours(23,59);

		//add to userTimeCollection displayed 'day of the week' TIME DISPLAY LIMITS
		$scope.userTimeCollection.displayDay = $scope.toDay.getDay();

		//call 'toDay button' display status
		goToDayDisplay();	
	}

	//Decrease Date TODAY for 1 day back in DISPLAY DATE TABLE by each click "<< DAY"
	$scope.dayMinus = function()
	{
		var dayDecrease = $scope.toDay.getDate();
		
		dayDecrease-=1;
		
		$scope.toDay.setDate(dayDecrease);
		
		//add to userTimeCollection new date TIME DISPLAY LIMITS
		$scope.userTimeCollection.displayDateBottom = $scope.toDay.setHours(0,0);
		$scope.userTimeCollection.displayDateTop = $scope.toDay.setHours(23,59);

		//add to userTimeCollection displayed 'day of the week' TIME DISPLAY LIMITS
		$scope.userTimeCollection.displayDay = $scope.toDay.getDay();

		//call 'toDay button' display status
		goToDayDisplay();
	}

	//GO TO DATE  *START*
		$scope.goToDateTrigger = function()
		{	
			
			var arrayGoToDate = $scope.goToDateChoice.split("."); 

			arrayGoToDate[1] = +arrayGoToDate[1] - 1;// because months in Date() are 0-11

			$scope.toDay.setFullYear(+arrayGoToDate[2],+arrayGoToDate[1],+arrayGoToDate[0]); 
			
			//add to userTimeCollection new date TIME DISPLAY LIMITS
			$scope.userTimeCollection.displayDateBottom = $scope.toDay.setHours(0,0);
			$scope.userTimeCollection.displayDateTop = $scope.toDay.setHours(23,59);

			//close sub-menu and reset data
			$scope.goToDateShow = false;

			//call 'toDay BTN' display status (SHOW/HIDE)
			goToDayDisplay();
		}	
	//GO TO DATE  *END*
	
	//ToDay BTN display status *START*
	   function	goToDayDisplay()
	   {
	   		(Date.now() > $scope.userTimeCollection.displayDateBottom && Date.now() < $scope.userTimeCollection.displayDateTop)?
	   		
	   			$scope.showToDay = false : $scope.showToDay = true;	
	    }
	//ToDay BTN display status *END*

	//'Go ToDAY!' *START*
		$scope.goToDay = function()
		{
			$scope.toDay = new Date();

			//add to userTimeCollection new date TIME DISPLAY LIMITS
			$scope.userTimeCollection.displayDateBottom = $scope.toDay.setHours(0,0);
			$scope.userTimeCollection.displayDateTop = $scope.toDay.setHours(23,59);

			//add to userTimeCollection displayed 'day of the week' TIME DISPLAY LIMITS
			$scope.userTimeCollection.displayDay = $scope.toDay.getDay();

			$scope.showToDay = false;//'toDay BTN' display status is HIDE
		}
	//'Go ToDAY!' *END*
//*END*///////////////////* TIME TABLE - TIME DISPLAY CONTROL PANEL *////////////////////////

/*************************************************************************************************************************

////////////////////////////////////////////*START*////////////////////////////////////////////////////////////////////////
///////////////////////////////////* EVENT MODALS SECTION *///////////////////////////////////////////////////////////////

//*START*////////////////* "EVENT MENU's TEMPLATE" SELECTED VARIANTs *///////////////////
		
		var resourceIndexActiveEvent = false;// RESOURCE EVENT ACTIVATED Status (by default)

		$scope.EventTemplateVariant = function(variant, resIndex)
		{		
			//SINGLE EVENT MENU variant
			if(variant == "SE")
			{
				$scope.eventModalType = "SE";
				$scope.eventModalTitle = "SINGLE EVENT";
				resourceIndexActiveEvent = resIndex;

				//menu toolbox set
				$scope.eventModalSingleStartDateSection  = true;
				$scope.eventModalSingleEndDateSection = false;
				$scope.eventModalWeekDaysSection = false;
				$scope.eventModalSingleTypeAndMsgSection  = true;
				$scope.eventModalSingleBookingMsgSection = false;
				$scope.eventModalSingleTimeStartEndSection = true;
				$scope.newEventCreated = false;

				$scope.recurringEventEndDateRequired = false;
				$scope.eventTypeRequired = true;
				$scope.bookingInfoInputsRequired = false;	
			}

			//RECURRING EVENT MENU variant
			if(variant == "RE")
			{
				$scope.eventModalType = "RE";
				$scope.eventModalTitle = "RECURRING EVENTS";
				resourceIndexActiveEvent = resIndex;

				//menu toolbox set
				$scope.eventModalSingleStartDateSection  = true;
				$scope.eventModalSingleEndDateSection = true;
				$scope.eventModalWeekDaysSection = true;
				$scope.eventModalSingleTypeAndMsgSection  = true;
				$scope.eventModalSingleBookingMsgSection = false;
				$scope.eventModalSingleTimeStartEndSection = true;
				$scope.newEventCreated = false;

				$scope.recurringEventEndDateRequired = true;
				$scope.eventTypeRequired = true;
				$scope.bookingInfoInputsRequired = false;
			}
			
			//BOOKING EVENT MENU variant
			if(variant == "SBE")
			{
				$scope.eventModalType = "SBE";
				$scope.eventModalTitle = "BOOKING EVENT";
				resourceIndexActiveEvent = resIndex;

				//menu toolbox set
				$scope.eventModalSingleStartDateSection  = true;
				$scope.eventModalSingleEndDateSection = false;
				$scope.eventModalWeekDaysSection = false;
				$scope.eventModalSingleTypeAndMsgSection  = false;
				$scope.eventModalSingleBookingMsgSection = true;
				$scope.eventModalSingleTimeStartEndSection = true;
				$scope.newEventCreated = false;
				
				$scope.recurringEventEndDateRequired = false;
				$scope.eventTypeRequired = false;
				$scope.bookingInfoInputsRequired = true;
			}
		}
//*END*//////////////////* "EVENT MENU's TEMPLATE" SELECTED VARIANTs *///////////////////


//*START*/////////////////* DEFAULT DATA AND PREPARATION Fn's */////////////////////////
		// Default DATA *START*
		$scope.singleEventStartHr = 0;
		$scope.singleEventStartMin = 0;
		$scope.singleEventEndHr = 0;
		$scope.singleEventEndMin = 0;
		
		$scope.weekDaysSelectionOptionStatus = false;

		$scope.eventStartDate = '';
		$scope.startDateInputRequired = true;
		$scope.todayChoice = false; 
		// Default DATA *END*
		
		// event types list
		$scope.eventType = ["Work time","Off work time"];

		// date validation pattern
		$scope.SingleEventSatrtDatePattern = new RegExp( '[0-3]{1}[0-9]{1}.[0-1]{1}[0-9]{1}.(20)[0-9]{1}[0-9]{1}' );
		
		//time validation pattern
		$scope.eventTimePattern = new RegExp ( '[0-9]' );

		//*START*////Trigger Fn for "ToDay Selection" option in MODAL EVENTS MENU 
		$scope.todayChoiceTrigger = function(today)
		{	
			if(today)
			{	
				$scope.eventStartDate = '';
				$scope.startDateInputRequired = false;
				$scope.todayChoice = true;			
			}

			if(!today)
			{	
				$scope.eventStartDate = '';
				$scope.startDateInputRequired = true;
				$scope.todayChoice = false;
			}
		}
		//*END*////Trigger Fn for "ToDay Selection" option in MODAL EVENTS MENU 
//*END*///////////////////* DEFAULT DATA AND PREPARATION Fn's */////////////////////////	


//*START*//////////////////////////* ADD NEW  EVENT *//////////////////////////////////////////
		
		$scope.addNewUserSingleEvent = function()
		{	
			//*START*//////*Single Event form validation satus *////
				//Time input validation
				if (+$scope.singleEventStartHr > 23){ $scope.startHour23more = true;  return false;}

				if (+$scope.singleEventEndHr > 24){ $scope.endHour24more = true;   return false; }

				if (+$scope.singleEventStartMin > 59 || +$scope.singleEventEndMin > 59 ){ $scope.minutes = true;   return false; }
				
				if (+$scope.singleEventEndHr == 24 && +$scope.singleEventEndMin > 0 ){ $scope.timeMore24hr = true;   return false; }
			//*END*/////* Single Event form validation satus *////


			//*START*//////* "ToDay" option *////
				//if "ToDay" option is selected
				if ($scope.todayOptionChecked)
				{
					$scope.singleEventDate = new Date();
				} 

				//if "ToDay" option is not selected, transform user input date string into DateObjFormat, 
				//and set Date as new Date('formated date');
				if (!$scope.todayOptionChecked)
				{	
					var arrayToDate = $scope.eventStartDate.split("."); 

					arrayToDate[1] = arrayToDate[1] - 1;// because the months in the Date() are 0-11

					$scope.singleEventDate = new Date(arrayToDate[2],arrayToDate[1],arrayToDate[0],0,1,0); 
				}
			//*END*/////* "ToDay" option *////

			//*START*//////*Time transformation *////
				var timeStart = +$scope.singleEventStartHr + +$scope.singleEventStartMin/60;
				
				var timeEnd = +$scope.singleEventEndHr + +$scope.singleEventEndMin/60;
				
				var duration = timeEnd - timeStart;
				
				var eventId =  new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
				//Time input validation
				if(timeEnd <= timeStart){ $scope.tStartMore_tEnd = true; return false; }
			//*END*/////*Time transformation *////
			
			///// ...When all transformations and validations are successfully done, "ADD NEW EVENT" Fn *START* ////

		//*START*////////////*for SINGLE EVENTS *////	
			if ($scope.eventModalType == "SE")
			{
				if(resourceIndexActiveEvent == undefined)// if user is activeted
				{
					$scope.userTimeCollection.singleEvents.push
					(
						{
							eventId:            		eventId,
							eventClass:         		"Single Event",
							dateStart :    				$scope.singleEventDate,
							eventType :     			$scope.eventTypeChecked,
							eventRequester: 			$scope.user.userName,
							eventRequesterContact: 		"",
							eventRequesterMsg: 			$scope.eventMsg || "no msg left",
							
							timeStartHr:    			$scope.singleEventStartHr,
							timeStartMin:   			$scope.singleEventStartMin,
							timeStart:      			timeStart.toFixed(2), 
							
							timeEndHr:      			$scope.singleEventEndHr,
							timeEndMin:    				$scope.singleEventEndMin,
							timeEnd:       				timeEnd.toFixed(2),
							duration:          			duration.toFixed(2),
						}
					);
				}

				if(resourceIndexActiveEvent != undefined)// if resource is activeted
				{
					$scope.userResourceCollection[resourceIndexActiveEvent].resTimeCollection.singleEvents.push
					(
						{
							eventId:            		eventId,
							eventClass:         		"Single Event",
							dateStart :    				$scope.singleEventDate,
							eventType :     			$scope.eventTypeChecked,
							eventRequester: 			$scope.user.userName,
							eventRequesterContact: 		"",
							eventRequesterMsg: 			$scope.eventMsg || "no msg left",
							
							timeStartHr:    			$scope.singleEventStartHr,
							timeStartMin:   			$scope.singleEventStartMin,
							timeStart:      			timeStart.toFixed(2), 
							
							timeEndHr:      			$scope.singleEventEndHr,
							timeEndMin:    				$scope.singleEventEndMin,
							timeEnd:       				timeEnd.toFixed(2),
							duration:          			duration.toFixed(2),
							
						}
					); 
				}
			}	
		//*END*////////////*for SINGLE EVENTS *////
		

		//*START*////////////*for BOOKING EVENTS *////	
			if ($scope.eventModalType == "SBE")
			{	
				if(resourceIndexActiveEvent == undefined)// if user is activeted
				{
					$scope.userTimeCollection.singleEvents.push
					(
						{
							eventId:           			eventId,
							eventClass:        		 	"Booking Event",
							dateStart :    				$scope.singleEventDate,
							eventType :     			"Work time",
							eventRequester: 			$scope.BookRequesterName,
							eventRequesterContact: 		$scope.bookRequesterContact,
							eventRequesterMsg: 			$scope.bookRequesterMsg,
							
							timeStartHr:    			$scope.singleEventStartHr,
							timeStartMin:   			$scope.singleEventStartMin,
							timeStart:      			timeStart.toFixed(2), 
							
							timeEndHr:      			$scope.singleEventEndHr,
							timeEndMin:    				$scope.singleEventEndMin,
							timeEnd:       				timeEnd.toFixed(2),
							duration:          			duration.toFixed(2),
							
						}
					);
				}

				if(resourceIndexActiveEvent != undefined)// if resource is activeted
				{
					$scope.userResourceCollection[resourceIndexActiveEvent].resTimeCollection.singleEvents.push
					(
						{
							eventId:           			eventId,
							eventClass:        		 	"Booking Event",
							dateStart :    				$scope.singleEventDate,
							eventType :     			"Work time",
							eventRequester: 			$scope.BookRequesterName,
							eventRequesterContact: 		$scope.bookRequesterContact,
							eventRequesterMsg: 			$scope.bookRequesterMsg,
							
							timeStartHr:    			$scope.singleEventStartHr,
							timeStartMin:   			$scope.singleEventStartMin,
							timeStart:      			timeStart.toFixed(2), 
							
							timeEndHr:      			$scope.singleEventEndHr,
							timeEndMin:    				$scope.singleEventEndMin,
							timeEnd:       				timeEnd.toFixed(2),
							duration:          			duration.toFixed(2),
						}
					);
				}
			}

				//... some intermediate transformations of "End Date" inputs strings into DateObjFormat, 
				//and set "End Date" as new Date('formated date');
					if ($scope.recurringEventEndDate)
					{
						var arrayToDateEnd = $scope.recurringEventEndDate.split("."); 

						arrayToDateEnd[1] = arrayToDateEnd[1] - 1;// because the months in the Date() are 0-11

						$scope.recurringEventEndDate = new Date(arrayToDateEnd[2],arrayToDateEnd[1],arrayToDateEnd[0],24,0,0); 
					}			
		//*END*////////////*for BOOKING EVENTS *////			
		

		//*START*////////////*for RECURRING EVENTS *////		
			if ($scope.eventModalType == "RE")
			{	
				// if "week days" selector is activated
				if($scope.weekDaysSelectionOptionStatus == true) 
				{
					var weekDaysSelectedArr = [];
					
					// find which week days were selected	
					angular.forEach( $scope.userTimeCollection.weekDays, function(day, index)											
						{
							if(day.checked == true)
							{
								weekDaysSelectedArr.push(index);// push to arr selected days indexes
							}
						}
					);
				}
				// ...finaly, push the recurring event ))
				// if USER is activeted
				if(resourceIndexActiveEvent == undefined)
				{
					$scope.userTimeCollection.recurringEvents.push
					(
						{
							eventId:           			eventId,
							eventClass:        		 	"Recurring Event",
							dateStart :    				$scope.singleEventDate,
							dateEnd :    				$scope.recurringEventEndDate,
							weekDaysChoice:				weekDaysSelectedArr || "Days of week were not selected",
							eventType :     			$scope.eventTypeChecked,
							eventRequester: 			$scope.user.userName,
							eventRequesterContact: 		"",
							eventRequesterMsg: 			$scope.eventMsg || "no msg left",
							
							timeStartHr:    			$scope.singleEventStartHr,
							timeStartMin:   			$scope.singleEventStartMin,
							timeStart:      			timeStart.toFixed(2), 
							
							timeEndHr:      			$scope.singleEventEndHr,
							timeEndMin:    				$scope.singleEventEndMin,
							timeEnd:       				timeEnd.toFixed(2),
							duration:          			duration.toFixed(2),
						}
					);
				}
				// if RESOURCE is activeted
				if(resourceIndexActiveEvent != undefined)
				{
					$scope.userResourceCollection[resourceIndexActiveEvent].resTimeCollection.recurringEvents.push
					(
						{
							eventId:           			eventId,
							eventClass:        		 	"Recurring Event",
							dateStart :    				$scope.singleEventDate,
							dateEnd :    				$scope.recurringEventEndDate,
							weekDaysChoice:				weekDaysSelectedArr || "Days of week were not selected",
							eventType :     			$scope.eventTypeChecked,
							eventRequester: 			$scope.user.userName,
							eventRequesterContact: 		"",
							eventRequesterMsg: 			$scope.eventMsg || "no msg left",
							
							timeStartHr:    			$scope.singleEventStartHr,
							timeStartMin:   			$scope.singleEventStartMin,
							timeStart:      			timeStart.toFixed(2), 
							
							timeEndHr:      			$scope.singleEventEndHr,
							timeEndMin:    				$scope.singleEventEndMin,
							timeEnd:       				timeEnd.toFixed(2),
							duration:          			duration.toFixed(2),
						}
					);
				}
			}
		//*END*////////////*for RECURRING EVENTS *////


			//...after success EVENT ADD fn, set all input data to a default values
			
			//menu toolbox set (close all, beside "SUCCESS MSG" )
			$scope.eventModalSingleStartDateSection  = false;
			$scope.eventModalSingleEndDateSection = false;
			$scope.eventModalWeekDaysSection = false;
			$scope.eventModalSingleTypeAndMsgSection  = false;
			$scope.eventModalSingleBookingMsgSection = false;
			$scope.eventModalSingleTimeStartEndSection = false;
			
			//"SUCCESS MSG"
			$scope.newEventCreated = true;

			//erase fn for event modal button "CLOSE"	
			$scope.eventInputDataErase(); 

			$log.debug('NEW EVENT IS ADDED');
			$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
		}
		
		//*START*////////////*erase fn for event modal button "CLOSE"*////
		$scope.eventInputDataErase = function()
			{
				eventId = '';
				$scope.eventMsg = '';
				$scope.eventStartDate = '';
				$scope.singleEventDate = '';
				$scope.todayOptionChecked = false;
				$scope.startDateInputRequired =true;
				$scope.todayChoice = false;
				$scope.recurringEventEndDate = '';
				$scope.weekDaysSelectionOptionStatus = false;

				$scope.BookRequesterName = '';
				$scope.bookRequesterContact = '';
				$scope.bookRequesterMsg = '';

				$scope.singleEventStartHr = 0;
				$scope.singleEventStartMin = 0;
				$scope.singleEventEndHr = 0;
				$scope.singleEventEndMin = 0;
				
				//close sub-menus
				$scope.showWeekDaysSelectingPanel = false;

				//reset resource index active event
				resourceIndexActiveEvent = false;
				
				// set all week days selected array to a default status
				angular.forEach( $scope.userTimeCollection.weekDays, function(day)
						{
							day.checked = false;
						}
					);

				//erase all errors msg's
				$scope.tStartMore_tEnd = false;
				$scope.startHour23more = false;
				$scope.endHour24more = false;
				$scope.minutes = false;
				$scope.timeMore24hr = false;
			}
			//*END*////////////*erase fn for event modal button "CLOSE"*////
//*END*////////////////////////////* ADD NEW  EVENT *//////////////////////////////////////////	

///////////////////////////////////*EVENT MODALS SECTION*/////////////////////////////////////////////////////////////////
///////////////////////////////////////////*END*//////////////////////////////////////////////////////////////////////////

/*************************************************************************************************************************

///////////////////////////////////////////*START*//////////////////////////////////////////////////////////////////////////
///////////////////////////////////*EVENT INFO PANEL DATA*/////////////////////////////////////////////////////////////////

		$scope.eventInfoPanel = function(eventClass, eventId, resIndex)
		{	
		//*START*////////////*for SINGLE EVENTS *////	
			if(eventClass == "Single Event")
			{	
				$scope.eventIdDisplay = false; //display status of  event Id info
				$scope.eventReqContact = false; //display status of 'Event Requester' contact info( for booking events only)
				$scope.eventEndDate = false; //display status of 'Event End Date' info( for recurring events only)
				$scope.eventWeekDays = false; // display status of 'Event Week Days Selection' ( for recurring events only)

				//if EVENT belongs to USER
				if(resIndex === undefined)
				{
					angular.forEach( $scope.userTimeCollection.singleEvents, function(event, eventIndex, eventCollectionArray)
						{
							if(eventId == event.eventId)
							{
								$scope.infoEventId = event.eventId;
								$scope.infoEventClass = eventClass;
								$scope.infoEventDateStart = event.dateStart;
								$scope.infoEventType = event.eventType;
								$scope.infoEventRequester = event.eventRequester;
								$scope.infoEventRequesterMsg = event.eventRequesterMsg;
								
								// formating Hrs & Minutes to 00:00 format for INFO PANEL DISPLAY
								if(event.timeStartHr < 10) { $scope.infoEventHrStart = "0" + event.timeStartHr; }
								else{ $scope.infoEventHrStart = event.timeStartHr; }

								if(event.timeStartMin < 10) { $scope.infoEventMinStart = "0" + event.timeStartMin; }
								else{ $scope.infoEventMinStart = event.timeStartMin; }
								
								if(event.timeEndHr < 10) { $scope.infoEventHrEnd = "0" + event.timeEndHr; }
								else{ $scope.infoEventHrEnd = event.timeEndHr; }
								
								if(event.timeEndMin < 10) { $scope.infoEventMinEnd = "0" + event.timeEndMin; }
								else{ $scope.infoEventMinEnd = event.timeEndMin; }
								//end
								
								$scope.eventIndex = eventIndex;// get EVENT index for DELETE EVENT Fn
							}
						}
					);

					//DELETE EVENT Fn for USER Single Event
					$scope.deleteEvent = function()
					{
						$scope.userTimeCollection.singleEvents.splice($scope.eventIndex,1); // delete event from event Collection

						//close "Delete-sub-menu"
						$scope.deleteEventSubMenu = false;
						
						//erase all data after event is deleted
						$scope.infoEventId = '';
						$scope.infoEventClass = '';
						$scope.infoEventDateStart = '';
						$scope.infoEventType = '';
						$scope.infoEventRequester = '';
						$scope.infoEventRequesterMsg = '';
						$scope.infoEventHrStart = '';
						$scope.infoEventMinStart = '';
						$scope.infoEventHrEnd = '';
						$scope.infoEventMinEnd = '';

						$log.debug('EVENT is REMOED');
						$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
					}//DELETE EVENT Fn END
				}

				//if EVENT belongs to RESOURCE
				if(resIndex != undefined)
				{
					angular.forEach( $scope.userResourceCollection[resIndex].resTimeCollection.singleEvents, function(event, eventIndex, eventCollectionArray)
						{
							if(eventId == event.eventId)
							{
								$scope.infoEventId = event.eventId;
								$scope.infoEventClass = eventClass;
								$scope.infoEventDateStart = event.dateStart;
								$scope.infoEventType = event.eventType;
								$scope.infoEventRequester = event.eventRequester;
								$scope.infoEventRequesterMsg = event.eventRequesterMsg;
								
								// formating Hrs & Minutes to 00:00 format for INFO PANEL DISPLAY
								if(event.timeStartHr < 10) { $scope.infoEventHrStart = "0" + event.timeStartHr; }
								else{ $scope.infoEventHrStart = event.timeStartHr; }

								if(event.timeStartMin < 10) { $scope.infoEventMinStart = "0" + event.timeStartMin; }
								else{ $scope.infoEventMinStart = event.timeStartMin; }
								
								if(event.timeEndHr < 10) { $scope.infoEventHrEnd = "0" + event.timeEndHr; }
								else{ $scope.infoEventHrEnd = event.timeEndHr; }
								
								if(event.timeEndMin < 10) { $scope.infoEventMinEnd = "0" + event.timeEndMin; }
								else{ $scope.infoEventMinEnd = event.timeEndMin; }
								//end
								
								$scope.eventIndex = eventIndex;// get EVENT index for DELETE EVENT Fn
							}
						}
					);

					//DELETE EVENT Fn for RESOURCE Single Event
					$scope.deleteEvent = function()
					{
						$scope.userResourceCollection[resIndex].resTimeCollection.singleEvents.splice($scope.eventIndex,1); // delete event from event Collection

						//close "Delete-sub-menu"
						$scope.deleteEventSubMenu = false;
						
						//erase all data after event is deleted
						$scope.infoEventId = '';
						$scope.infoEventClass = '';
						$scope.infoEventDateStart = '';
						$scope.infoEventType = '';
						$scope.infoEventRequester = '';
						$scope.infoEventRequesterMsg = '';
						$scope.infoEventHrStart = '';
						$scope.infoEventMinStart = '';
						$scope.infoEventHrEnd = '';
						$scope.infoEventMinEnd = '';

						$log.debug('EVENT is REMOED');
						$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
					}//DELETE EVENT Fn END
				}
			}
		//*END*////////////*for SINGLE EVENTS *////

		//*START*////////////*For RECURRING EVENT *////	
			if(eventClass == "Recurring Event" )
			{	
				$scope.eventIdDisplay = false; //display status of  event Id info
				$scope.eventReqContact = false; //display status of 'Event Requester' contact info( for booking events only)
				$scope.eventEndDate = true; //display status of 'Event End Date' info( for recurring events only)
				$scope.eventWeekDays = true; // display status of 'Event Week Days Selection' ( for recurring events only)

				//if EVENT belongs to USER
				if(resIndex == undefined)
				{
					angular.forEach( $scope.userTimeCollection.recurringEvents, function(event, eventIndex, eventCollectionArray)
						{	
							if(eventId == event.eventId)
							{
								$scope.infoEventId = event.eventId;
								$scope.infoEventClass = "Recurring Event";
								$scope.infoEventDateStart = event.dateStart;
								$scope.infoEventDateEnd = event.dateEnd;
								$scope.infoEventWeekDays = event.weekDaysChoice;
								$scope.infoEventType = event.eventType;
								$scope.infoEventRequester = event.eventRequester;
								$scope.infoEventRequesterMsg = event.eventRequesterMsg;
								
								// formating Hrs & Minutes to 00:00 format for INFO PANEL DISPLAY
								if(event.timeStartHr < 10) { $scope.infoEventHrStart = "0" + event.timeStartHr; }
								else{ $scope.infoEventHrStart = event.timeStartHr; }

								if(event.timeStartMin < 10) { $scope.infoEventMinStart = "0" + event.timeStartMin; }
								else{ $scope.infoEventMinStart = event.timeStartMin; }
								
								if(event.timeEndHr < 10) { $scope.infoEventHrEnd = "0" + event.timeEndHr; }
								else{ $scope.infoEventHrEnd = event.timeEndHr; }
								
								if(event.timeEndMin < 10) { $scope.infoEventMinEnd = "0" + event.timeEndMin; }
								else{ $scope.infoEventMinEnd = event.timeEndMin; }
								//end
								
								$scope.eventIndex = eventIndex;// get EVENT index for DELETE EVENT Fn
							}

							//DELETE EVENT Fn
							$scope.deleteEvent = function()
							{
								$scope.userTimeCollection.recurringEvents.splice($scope.eventIndex,1); // delete event from event Collection

								//close "Delete-sub-menu"
								$scope.deleteEventSubMenu = false;
								
								//erase all data after event is deleted
								$scope.infoEventId = '';
								$scope.infoEventClass = '';
								$scope.infoEventDateStart = '';
								$scope.infoEventDateEnd = '';
								//$scope.infoEventWeekDays = '';
								$scope.infoEventType = '';
								$scope.infoEventRequester = '';
								$scope.infoEventRequesterMsg = '';
								$scope.infoEventHrStart = '';
								$scope.infoEventMinStart = '';
								$scope.infoEventHrEnd = '';
								$scope.infoEventMinEnd = '';

								$log.debug('EVENT is REMOED');
								$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
							}
							//DELETE EVENT Fn END
						}
					);
				}

				//if EVENT belongs to RESOURCE
				if(resIndex != undefined)
				{
					angular.forEach( $scope.userResourceCollection[resIndex].resTimeCollection.recurringEvents, function(event, eventIndex, eventCollectionArray)
						{
							if(eventId == event.eventId)
							{
								$scope.infoEventId = event.eventId;
								$scope.infoEventClass = "Recurring Event";
								$scope.infoEventDateStart = event.dateStart;
								$scope.infoEventDateEnd = event.dateEnd;
								$scope.infoEventWeekDays = event.weekDaysChoice;
								$scope.infoEventType = event.eventType;
								$scope.infoEventRequester = event.eventRequester;
								$scope.infoEventRequesterMsg = event.eventRequesterMsg;
								
								// formating Hrs & Minutes to 00:00 format for INFO PANEL DISPLAY
								if(event.timeStartHr < 10) { $scope.infoEventHrStart = "0" + event.timeStartHr; }
								else{ $scope.infoEventHrStart = event.timeStartHr; }

								if(event.timeStartMin < 10) { $scope.infoEventMinStart = "0" + event.timeStartMin; }
								else{ $scope.infoEventMinStart = event.timeStartMin; }
								
								if(event.timeEndHr < 10) { $scope.infoEventHrEnd = "0" + event.timeEndHr; }
								else{ $scope.infoEventHrEnd = event.timeEndHr; }
								
								if(event.timeEndMin < 10) { $scope.infoEventMinEnd = "0" + event.timeEndMin; }
								else{ $scope.infoEventMinEnd = event.timeEndMin; }
								//end
									
								$log.debug('EVENT is REMOED');
								$scope.eventIndex = eventIndex;// get EVENT index for DELETE EVENT Fn
							}



							//DELETE EVENT Fn
							$scope.deleteEvent = function()
							{
								$scope.userResourceCollection[resIndex].resTimeCollection.recurringEvents.splice($scope.eventIndex,1); // delete event from event Collection

								//close "Delete-sub-menu"
								$scope.deleteEventSubMenu = false;
								
								//erase all data after event is deleted
								$scope.infoEventId = '';
								$scope.infoEventClass = '';
								$scope.infoEventDateStart = '';
								$scope.infoEventDateEnd = '';
								//$scope.infoEventWeekDays = '';
								$scope.infoEventType = '';
								$scope.infoEventRequester = '';
								$scope.infoEventRequesterMsg = '';
								$scope.infoEventHrStart = '';
								$scope.infoEventMinStart = '';
								$scope.infoEventHrEnd = '';
								$scope.infoEventMinEnd = '';

								$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
							}
							//DELETE EVENT Fn END
						}
					);
				}
			}
		//*END*////////////*For RECURRING EVENT *////	

		//*START*////////////*For BOOKING EVENT *////	
			if(eventClass == "Booking Event")
			{	
				$scope.eventIdDisplay = false; //display status of  event Id info
				$scope.eventReqContact = true; //display status of 'Event Requester' contact info( for booking events only)
				$scope.eventEndDate = false; //display status of 'Event End Date' info( for recurring events only)
				$scope.eventWeekDays = false; // display status of 'Event Week Days Selection' ( for recurring events only)

				//if EVENT belongs to USER
				if(resIndex == undefined)
				{
					angular.forEach( $scope.userTimeCollection.singleEvents, function(event, eventIndex, eventCollectionArray)
						{
							if(eventId == event.eventId)
							{
								$scope.infoEventId = event.eventId;
								$scope.infoEventClass = eventClass;
								$scope.infoEventDateStart = event.dateStart;
								$scope.infoEventType = "Booking";
								$scope.infoEventRequester = event.eventRequester;
								$scope.infoEventRequesterContact = event.eventRequesterContact;
								$scope.infoEventRequesterMsg = event.eventRequesterMsg;
								
								// formating Hrs & Minutes to 00:00 format for INFO PANEL DISPLAY
								if(event.timeStartHr < 10) { $scope.infoEventHrStart = "0" + event.timeStartHr; }
								else{ $scope.infoEventHrStart = event.timeStartHr; }

								if(event.timeStartMin < 10) { $scope.infoEventMinStart = "0" + event.timeStartMin; }
								else{ $scope.infoEventMinStart = event.timeStartMin; }
								
								if(event.timeEndHr < 10) { $scope.infoEventHrEnd = "0" + event.timeEndHr; }
								else{ $scope.infoEventHrEnd = event.timeEndHr; }
								
								if(event.timeEndMin < 10) { $scope.infoEventMinEnd = "0" + event.timeEndMin; }
								else{ $scope.infoEventMinEnd = event.timeEndMin; }
								//end
								
								$scope.eventIndex = eventIndex;// get EVENT index for DELETE EVENT Fn
							}

							//DELETE EVENT Fn
							$scope.deleteEvent = function()
							{
								$scope.userTimeCollection.singleEvents.splice($scope.eventIndex,1); // delete event from event Collection

								//close "Delete-sub-menu"
								$scope.deleteEventSubMenu = false;
								
								//erase all data after event is deleted
								$scope.infoEventId = '';
								$scope.infoEventClass = '';
								$scope.infoEventDateStart = '';
								$scope.infoEventType = '';
								$scope.infoEventRequester = '';
								$scope.infoEventRequesterContact = '';
								$scope.infoEventRequesterMsg = '';
								$scope.infoEventHrStart = '';
								$scope.infoEventMinStart = '';
								$scope.infoEventHrEnd = '';
								$scope.infoEventMinEnd = '';

								$log.debug('EVENT is REMOED');
								$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
							}
							//DELETE EVENT Fn END
						}
					);
				}

				//if EVENT belongs to RESOURCE
				if(resIndex != undefined)
				{
					angular.forEach( $scope.userResourceCollection[resIndex].resTimeCollection.singleEvents, function(event, eventIndex, eventCollectionArray)
						{
							if(eventId == event.eventId)
							{
								$scope.infoEventId = event.eventId;
								$scope.infoEventClass = eventClass;
								$scope.infoEventDateStart = event.dateStart;
								$scope.infoEventType = "Booking";
								$scope.infoEventRequester = event.eventRequester;
								$scope.infoEventRequesterContact = event.eventRequesterContact;
								$scope.infoEventRequesterMsg = event.eventRequesterMsg;
								
								// formating Hrs & Minutes to 00:00 format for INFO PANEL DISPLAY
								if(event.timeStartHr < 10) { $scope.infoEventHrStart = "0" + event.timeStartHr; }
								else{ $scope.infoEventHrStart = event.timeStartHr; }

								if(event.timeStartMin < 10) { $scope.infoEventMinStart = "0" + event.timeStartMin; }
								else{ $scope.infoEventMinStart = event.timeStartMin; }
								
								if(event.timeEndHr < 10) { $scope.infoEventHrEnd = "0" + event.timeEndHr; }
								else{ $scope.infoEventHrEnd = event.timeEndHr; }
								
								if(event.timeEndMin < 10) { $scope.infoEventMinEnd = "0" + event.timeEndMin; }
								else{ $scope.infoEventMinEnd = event.timeEndMin; }
								//end
								
								$scope.eventIndex = eventIndex;// get EVENT index for DELETE EVENT Fn
							}

							//DELETE EVENT Fn
							$scope.deleteEvent = function()
							{
								$scope.userResourceCollection[resIndex].resTimeCollection.singleEvents.splice($scope.eventIndex,1); // delete event from event Collection

								//close "Delete-sub-menu"
								$scope.deleteEventSubMenu = false;
								
								//erase all data after event is deleted
								$scope.infoEventId = '';
								$scope.infoEventClass = '';
								$scope.infoEventDateStart = '';
								$scope.infoEventType = '';
								$scope.infoEventRequester = '';
								$scope.infoEventRequesterContact = '';
								$scope.infoEventRequesterMsg = '';
								$scope.infoEventHrStart = '';
								$scope.infoEventMinStart = '';
								$scope.infoEventHrEnd = '';
								$scope.infoEventMinEnd = '';

								$log.debug('EVENT is REMOED');
								$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
							}
							//DELETE EVENT Fn END
						}
					);
				}
			}
		//*END*////////////*For BOOKING EVENT *////
		}

///////////////////////////////////*EVENT INFO PANEL DATA*/////////////////////////////////////////////////////////////////
///////////////////////////////////////////*END*//////////////////////////////////////////////////////////////////////////

/*************************************************************************************************************************

//*START*///////////////////* EVENTS DISPLAY FILTERS */////////////////////////
	
	//DISPLAY DATE FILTER FOR TIMELINE TABLE (SINGLE/BOOKING EVENTS)
	$scope.displayedDate = function(event)
	{
		return event.dateStart < $scope.userTimeCollection.displayDateTop &&
			   event.dateStart > $scope.userTimeCollection.displayDateBottom ; 
	}
	//end
	
	//DISPLAY DATE FILTERS FOR TIMELINE TABLE (RECURRING EVENTS)
	$scope.displayedDateRange = function(event)
	{	// if no 'weeks days' filter is selected
		if(angular.isString(event.weekDaysChoice)) 
		{
			return  event.dateStart < $scope.userTimeCollection.displayDateTop && event.dateEnd > $scope.userTimeCollection.displayDateTop;
		}
		
		// if 'weeks days' filter is selected
		if(angular.isArray(event.weekDaysChoice)) 
		{		
			return  +event.weekDaysChoice[0]  == +$scope.userTimeCollection.displayDay && event.dateStart < $scope.userTimeCollection.displayDateTop && event.dateEnd > $scope.userTimeCollection.displayDateTop ||
					+event.weekDaysChoice[1]  == +$scope.userTimeCollection.displayDay && event.dateStart < $scope.userTimeCollection.displayDateTop && event.dateEnd > $scope.userTimeCollection.displayDateTop ||
					+event.weekDaysChoice[2]  == +$scope.userTimeCollection.displayDay && event.dateStart < $scope.userTimeCollection.displayDateTop && event.dateEnd > $scope.userTimeCollection.displayDateTop ||
					+event.weekDaysChoice[3]  == +$scope.userTimeCollection.displayDay && event.dateStart < $scope.userTimeCollection.displayDateTop && event.dateEnd > $scope.userTimeCollection.displayDateTop ||
					+event.weekDaysChoice[4]  == +$scope.userTimeCollection.displayDay && event.dateStart < $scope.userTimeCollection.displayDateTop && event.dateEnd > $scope.userTimeCollection.displayDateTop ||
					+event.weekDaysChoice[5]  == +$scope.userTimeCollection.displayDay && event.dateStart < $scope.userTimeCollection.displayDateTop && event.dateEnd > $scope.userTimeCollection.displayDateTop ||
					+event.weekDaysChoice[6]  == +$scope.userTimeCollection.displayDay && event.dateStart < $scope.userTimeCollection.displayDateTop && event.dateEnd > $scope.userTimeCollection.displayDateTop ;
		}    
	}
	//end
//*END*///////////////////* EVENTS DISPLAY FILTERS */////////////////////////


	/*collapse button func's for RESOURCES*/
	$scope.collapseToggle = function(index)
	{
		$scope.userResourceCollection[index].isCollapsed = !$scope.userResourceCollection[index].isCollapsed;
	}
	/*end*/

			


		var timerEnd_gunttDateTimeCtrl = Date.now();
		var totalTime_gunttDateTimeCtrl = timerEnd_gunttDateTimeCtrl - timerStart;

		$log.info('3)  gunttDateTimeCtrl loaded in ' + totalTime_gunttDateTimeCtrl + 'ms');


});
/*DATE & TIME-LINEs CONTROLLER*/
/*END*/
