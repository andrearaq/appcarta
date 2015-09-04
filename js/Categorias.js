var Categorias = function(adapter, categorias) {
    this.inicializar = function() {
        this.el = $('<div/>');
        this.el.on('click', '.flag', this.encontrarCategoria);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.categorias(categorias));
        return this.el;
    };
    this.encontrarCategoria = function() {
        //agregar pagina con cambio de idioma al history del navegador
        window.history.pushState({}, null, '#categorias/'+$(this).attr('id'));
        adapter.encontrarCategoriaIdioma($(this).attr('id')).done(function(categorias) {
            $('body').html(new Categorias(adapter, categorias).render());
        });
    };
    this.inicializar();
   // this.render();
}