var Categorias = function(adapter, categorias) {
    this.inicializar = function() {
        this.el = $('<div/>');
    };
    this.render = function() {
        this.el.html(Handlebars.templates.categorias(categorias));
        return this.el;
    };
    
    this.inicializar();
   // this.render();
}