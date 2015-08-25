var VerBebidasTerraza = function (adapter, platos) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
       this.el.on('click', '.flag', this.encontrarBebidas);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verBebidasTerraza(platos));
        return this.el;
    };
    this.encontrarBebidas = function() {
        //agregar pagina con cambio de idioma al history del navegador
        window.history.pushState({}, null, '#categorias/'+$(this).attr('id'));
         window.history.pushState({}, null, '#categoria/9/'+$(this).attr('alt'));
        var idioma = $(this).attr('id');
        adapter.encontrarPlatosIdioma(idioma, 9).done(function(platos) {
            $('body').html(new VerBebidasTerraza(adapter, platos).render());
        });
    };
    this.inicializar();
}