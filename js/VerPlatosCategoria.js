var VerPlatosCategoria = function (adapter, platos) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '.idiomas img', this.encontrarPlatos);
        this.el.on('click', '.platoP', this.mostrarPlato);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verPlatosCategoria(platos));
        return this.el;
    };
    // mostrar platos segun el idioma indicado por la bandera pulsada
    this.encontrarPlatos = function() {
        //agregar pagina con cambio de idioma al history del navegador
        var categ = $('#numcateg').html();
        window.history.pushState({}, null, '#categorias/'+$(this).attr('id'));
        window.history.pushState({}, null, '#categoria/'+categ+'/'+$('#categ').html());
        var idioma = $(this).attr('id');
        
        adapter.encontrarPlatosIdioma(idioma, parseInt(categ)).done(function(platos) {
            $('body').html(new VerPlatosCategoria(adapter, platos).render());
        });
    };
    // ver foto del plato pulsado
    this.mostrarPlato = function() {
        $('#fotoplato').attr('src',$(this).attr('src'));
        $('#precioplato').html($(this).next().text());
        $('#textoplato').html($(this).attr('alt'));
        $('#alergenos').attr('src',$(this).next().next().attr('src'));
    };
    
    this.inicializar();
}
