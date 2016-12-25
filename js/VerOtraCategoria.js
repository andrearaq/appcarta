var VerOtraCategoria = function (adapter, platos) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
       this.el.on('click', '.idiomas img', this.encontrarRaciones);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verOtraCategoria(platos));
        return this.el;
    };
    // mostrar raciones segun el idioma indicado por la bandera pulsada
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