var VerMenu = function (adapter, menus) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
       
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verMenu(menus));
        return this.el;
    };
    
    this.inicializar();
}