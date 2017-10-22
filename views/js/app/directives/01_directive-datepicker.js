// Require : jQuery, jQuery UI
angular.module('clhGunttApp').directive('directiveDatepicker', function() 
{
   return 	{
		        require: 'ngModel',                        
		        link: function (scope, element, attrs, ngModelCtrl) 
		        {                                                                                                                  
			        jQuery(element).datepicker
			        (
			        	{
				            changeYear: true,
				            changeMonth: true,
				            dateFormat: 'dd.mm.yy',
				            yearRange: '2000:2020',
				            
				            onSelect: function(dateText, inst) 
				            {
				              ngModelCtrl.$setViewValue(dateText);
				              scope.$apply();
				            }
			         	}
			        );
		  		}
 			}	
});
  
