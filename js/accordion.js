(function($){
    var defaults = {
        toggle: true,
        start: 0,
        multiple: false,
        toggleSpeed: 'fast',
        handle: '.handle',
        panel: '.panel'
    }
    var Accordion = function($el, options) {
        var $this = this;
        this.$el = $el;
        this.options = $.extend({}, options, defaults);
        this.init();
        this.handle = this.$el.find('div.handle');
        this.panel = this.$el.find('div.panel');
    };
    Accordion.prototype.init = function() {
        this.onload();
        this.handle.click($.proxy(this.showMenu, this), $.proxy(this.hideMenus, this));
    };
    Accordion.prototype.onload = function() {
        if (this.options.start == 0) {
            return this.panel.each(function() {
                $(this).slideUp($this.options.toggleSpeed);
            }); //????
        }
        else {
            var openOnloadIndex = this.options.start - 1;
            return this.$el.find('div.panel:not(:nth-child(openOnloadIndex))').each(function() {
                $(this).slideUp(this.options.toggleSpeed); //????
            })
        }
    };
    Accordion.prototype.showMenu = function() {
        this.handle.addClass('.current');
        this.handle.next('div').slideToggle(this.options.toggleSpeed);   
    };
    Accordion.prototype.hideMenus = function() {
        this.$el.find('div.panel:not(.current)').slideUp(this.options.toggleSpeed);
        this.handle.removeClass('.current'); 
    };
    
    $.fn.accordion = function (options) {
        var $this = $(this);
        options = options || {};
        $this.each(function(){
            var $el = $(this),
                accrdn = new Accordion($el, options);
            $el.data({'accordion-plugin': accrdn});
        });
    };
})(jQuery);