var VerPlatosCategoria = function (adapter) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('keyup', '#btnBuscar', this.encontrarPorNombre);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.home());
        return this.el;
    };
    //este método lo movemos tal cual de app.js:
    this.encontrarPorNombre = function() {
        adapter.encontrarPorNombre($('#btnBuscar').val()).done(function (futbolistas) {
           $("#lstFutbolistas").html(Handlebars.templates.listaJugadores(futbolistas)); 
	   });
    };
    this.inicializar();
}