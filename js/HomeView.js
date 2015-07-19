var HomeView = function (adapter) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('keyup', '#btnBuscar', this.encontrarPorNombre);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.home());
        return this.el;
     //esto es lo que hemos movido de app.js aquí:
     //$('body').html(Handlebars.templates.home());
     //La siguiente línea sobra, ya está puesta al inicializar: 
     //$('#btnBuscar').on('keyup', encontrarPorNombre);

    };
    //este método lo movemos tal cual de app.js:
    this.encontrarPorNombre = function() {
        adapter.encontrarPorNombre($('#btnBuscar').val()).done(function (futbolistas) {
           $("#lstFutbolistas").html(Handlebars.templates.listaJugadores(futbolistas)); 
	});
    };
    this.inicializar();
}