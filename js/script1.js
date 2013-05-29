;(function($, window, document, undefined){
    var pluginName = 'accrdn',
        defaults = {
            init: 0,
            slideSpeed: 400,
            closeOtherMenus: false,
            toggle: false
        };
    function Accrdn(element, options) {
        this.element = $(element);
        this.options = $.extend( {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.handles = this.element.find('.handle'),
        this.panels = this.element.find('.panel');
        this.init();
        this.main(this.options);
    };
    Accrdn.prototype.init = function () {
        if (this.element.has('.panel'&&'.handle').length) {
            var numPanels = 0;
            this.handles.each(function () {
                numPanels += 1;
            });
            if (this.options.init > 0 && this.options.init <= numPanels) {
                var index = this.options.init - 1;
                this.element.find('.panel:not(.panel:eq(' + index + '))')
                    .slideUp(1)
                    .prev('.handle').data('open', false);
                this.handles.eq(index).data('open', true);
            } else if (!this.options.init) {
                this.panels.slideUp(1);
                this.handles.data('open', false);
            } else {
                throw 'error: init has to be less than or equal to the number of accordion panels';
            };
        }; 
    };
    Accrdn.prototype.main = function (options) {
        var thisAccrdn = this;
        this.handles.click(function (){
            var $this = $(this);
            if (!$this.data('open')) {
                if (options.closeOtherMenus) {
                    thisAccrdn.handles.each(function () {
                        if ($(this).data('open')) {
                            $(this).next('.panel').slideToggle(options.slideSpeed);
                            $(this).data('open', false);
                        }
                    })
                };
                $this.next('.panel').slideToggle(options.slideSpeed);
                $this.data('open', true);
            } else if ($this.data('open') && options.toggle) {
                $this.next('.panel').slideToggle(options.slideSpeed);
                $(this).data('open', false);
            };
        });
    };
    $.fn.accrdn = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Accrdn(this, options));
            }
        });
    };
})(jQuery, window, document);