var VerBebidasTerraza = function (adapter, platos) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
       
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verBebidasTerraza(platos));
        return this.el;
    };
    
    this.inicializar();
}