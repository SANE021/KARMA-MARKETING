$('.mobilemenu').click(function (e) {
    e.preventDefault();
    $('.mobilebox').show('fast');
});

$('.cross_icon').click(function (e) {
    e.preventDefault();
    $('.mobilebox').hide('fast');
});

$('.tab-btn').click(function (e) {
    e.preventDefault();
    var dropdownContainer = $(this).next('.mobile-submenu');
    var isRotated = $(this).attr('style') === 'transform: rotate(180deg);';
    if (isRotated) {
        $(this).removeAttr('style');
    } else {
        $(this).attr('style', 'transform: rotate(180deg);');
    }
    if (dropdownContainer.is(':visible')) {
        dropdownContainer.slideUp('fast');
    } else {
        dropdownContainer.slideDown('fast');
    }
});



(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,           
		to: 0,                 
		speed: 1000,           
		refreshInterval: 100,  
		decimals: 0,           
		formatter: formatter, 
		onUpdate: null,        
		onComplete: null       
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
$('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
});
$('.timer').each(count);  

function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
}
});

var swiper = new Swiper(".clientSwiper", {
	slidesPerView: 1,
	spaceBetween: 30,
	pagination: {
	el: ".swiper-pagination",
	clickable: true,
	},
});


$(document).ready(function() {
    moveAllProgressBars();
    
    $(window).resize(function() {
        moveAllProgressBars();
    });
});

function moveAllProgressBars() {
    $('.progress-wrap').each(function() {
        moveProgressBar($(this));
    });
}

function moveProgressBar(progressWrap) {
    console.log("moveProgressBar");
    var getPercent = (progressWrap.data('progress-percent') / 100);
    var getProgressWrapWidth = progressWrap.width();
    var progressTotal = getPercent * getProgressWrapWidth;
    var animationLength = 2500;

    // Find the .progress-bar element within the current .progress-wrap and animate it
    progressWrap.find('.progress-bar').stop().animate({
        width: progressTotal
    }, animationLength);
}