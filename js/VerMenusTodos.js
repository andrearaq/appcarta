var VerMenusTodos = function (adapter, platos) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
       this.el.on('click', '.idiomas img', this.encontrarMenus);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verMenus(platos));
        return this.el;
    };
    // mostrar menus segun el idioma indicado por la bandera pulsada
    this.encontrarMenus = function() {
        //agregar pagina con cambio de idioma al history del navegador
        window.history.pushState({}, null, '#categorias/'+$(this).attr('id'));
        window.history.pushState({}, null, '#categoria/7/'+$(this).attr('alt'));
        var idioma = $(this).attr('id');
        localStorage['idioma']=idioma;
        adapter.encontrarPlatosIdioma(idioma, 7).done(function(platos) {
            $('body').html(new VerMenusTodos(adapter, platos).render());
        });
    };
    this.inicializar();
}