// Require : jQuery, jQuery UI

angular.module('clhGunttApp')

//SLIDE OPEN for EDIT sub-menu's in MAIN MENU
.directive('directiveSlideShow', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(jQuery('.slide-menu')).show('slide',500);
			        });
		  		}
 			}	
})
//SLIDE CLOSE for EDIT sub-menu's in MAIN MENU 
.directive('directiveSlideHide', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){			        	
			        	angular.element(jQuery('.slide-menu')).hide('slide',500);
			        });
		  		}
 			}	
})

///////////////////////////////////////////SUB-MENU's in MENU/////////////////////////////////////////

//BLIND OPEN/CLOSE for RENAME sub-menu's in EDIT MENU
.directive('directiveBlindShow', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(document.querySelector('.blind-show')).toggle('blind',150);
			        });
		  		},
		  		scope: true
 			}	
})

//BLIND OPEN/CLOSE for TYPES sub-menu's in EDIT MENU
.directive('directiveBlindTypesShow', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(document.querySelector('.blind-show-types')).toggle('blind',150);
			        });
		  		},
		  		scope: true
 			}	
})

//BLIND OPEN/CLOSE for GROUPS sub-menu's in EDIT MENU
.directive('directiveBlindGroupsShow', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(document.querySelector('.blind-show-groups')).toggle('blind',150);
			        });
		  		}
 			}	
})

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

// ============== CLOSE ALL for CLOSE MENU's BTN's =================
.directive('directiveBlindClose', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(jQuery('.blind-show, .blind-show-types, .blind-show-groups, .blind-show-orgs'))
			        		.hide('blind',150);
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