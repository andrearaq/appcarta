var VerOtraCategoria = function (adapter, platos) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
       this.el.on('click', '.flag', this.encontrarRaciones);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.VerOtraCategoria(platos));
        return this.el;
    };
    this.encontrarRaciones = function() {
        //agregar pagina con cambio de idioma al history del navegador
        window.history.pushState({}, null, '#categorias/'+$(this).attr('id'));
        window.history.pushState({}, null, '#categoria/6/'+$(this).attr('alt'));
        var idioma = $(this).attr('id');
        adapter.encontrarPlatosIdioma(idioma, 6).done(function(platos) {
            $('body').html(new VerOtraCategoria(adapter, platos).render());
        });
    };
    this.inicializar();
}