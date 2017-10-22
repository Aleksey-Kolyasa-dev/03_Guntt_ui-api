// Require : jQuery, jQuery UI

angular.module('clhGunttApp')

//SLIDE OPEN for EDIT sub-menu's in MAIN MENU
.directive('directiveSlideShowOrg', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(jQuery('.slide-menu-org')).show('slide',500);
			        });
		  		}
 			}	
})
//SLIDE CLOSE for EDIT sub-menu's in MAIN MENU 
.directive('directiveSlideHideOrg', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){			        	
			        	angular.element(jQuery('.slide-menu-org')).hide('slide',500);
			        });
		  		}
 			}	
})

///////////////////////////////////////////SUB-MENU's in MENU/////////////////////////////////////////


//BLIND OPEN/CLOSE for RENAME sub-menu's in EDIT MENU
.directive('directiveBlindShowOrg', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(document.querySelector('.blind-show-org')).toggle('blind',150);
			        });
		  		}
 			}	
})

//BLIND OPEN/CLOSE for MEMBERSHIP sub-menu's in EDIT MENU
.directive('directiveBlindMemShow', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(document.querySelector('.blind-show-mem')).toggle('blind',150);
			        });
		  		}
 			}	
})

// ============== CLOSE ALL for CLOSE MENU's BTN's =================
.directive('directiveBlindCloseOrg', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(jQuery('.slide-menu-org, .blind-show-org, .blind-show-mem'))
			        		.hide('blind',150);
			        });
		  		}
 			}	
});
/**
//BLIND OPEN/CLOSE for ORGS sub-menu's in EDIT MENU
.directive('directiveBlindOrgsShow', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(document.querySelector('.blind-show-orgs')).toggle('blind',150);
			        });
		  		}
 			}	
})



///////////////////////////////////////////HEADER DROPDOWN MENU's/////////////////////////////////////////

//BLIND OPEN/CLOSE for header DISPLAY FILTERS DROPDOWN MENU
.directive('directiveBlindDropdownShow', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {   
		        	var menu;                                                                                                               
			       
			        element.on('click', function()
			        {
			        	menu = angular.element( document.querySelector('.header-dropdown-blind') );
			        	
			        	menu.toggle('blind',150);

			        	menu.on('mouseleave', function()
			        	{
			        		menu.hide('blind',200);
			        	});
			        });
		  		}
 			}	
});

*/