var VerPlatosCategoria = function (adapter, platos, nomcateg) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
       
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verOtraCategoria(platos, nomcateg));
        return this.el;
    };
    
    this.inicializar();
}