var VerBebidas = function (adapter, platos) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '.idiomas img', this.encontrarBebidas);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verBebidas(platos));
        return this.el;
    };
    // mostrar bebidas segun el idioma indicado por la bandera pulsada
    this.encontrarBebidas = function() {
        //agregar pagina con cambio de idioma al history del navegador
        window.history.pushState({}, null, '#categorias/'+$(this).attr('id'));
        window.history.pushState({}, null, '#categoria/8/'+$(this).attr('alt'));
        var idioma = $(this).attr('id');
        adapter.encontrarPlatosIdioma(idioma, 8).done(function(platos) {
            $('body').html(new VerBebidas(adapter, platos).render());
        });
    };
    this.inicializar();
}