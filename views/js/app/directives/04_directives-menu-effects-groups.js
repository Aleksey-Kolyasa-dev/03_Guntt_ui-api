// Require : jQuery, jQuery UI

angular.module('clhGunttApp')

//SLIDE OPEN for EDIT sub-menu's in MAIN MENU
.directive('directiveSlideShowGr', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(jQuery('.slide-menu-gr')).show('slide',500);
			        });
		  		}
 			}	
})
//SLIDE CLOSE for EDIT sub-menu's in MAIN MENU 
.directive('directiveSlideHideGr', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){			        	
			        	angular.element(jQuery('.slide-menu-gr')).hide('slide',500);
			        });
		  		}
 			}	
})

///////////////////////////////////////////SUB-MENU's in MENU/////////////////////////////////////////

//BLIND OPEN/CLOSE for RENAME sub-menu's in EDIT MENU
.directive('directiveBlindShowGr', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(document.querySelector('.blind-show-gr')).toggle('blind',150);
			        });
		  		},
		  		scope: true
 			}	
})

//BLIND OPEN/CLOSE for TYPES sub-menu's in EDIT MENU
.directive('directiveBlindColorShow', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(document.querySelector('.blind-show-color')).toggle('blind',150);
			        });
		  		},
		  		scope: true
 			}	
})
// ============== CLOSE ALL for GROUP CLOSE MENU's BTN's =================
.directive('directiveBlindCloseGr', function() 
{
   return 	{                   
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        element.on('click', function(){
			        	angular.element(jQuery('.slide-menu-gr, .blind-show-gr, .blind-show-color'))
			        		.hide('blind',150);
			        });
		  		}
 			}	
});
