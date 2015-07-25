var JugadorView = function(adapter, futbolista) {
    this.inicializar = function() {
        this.el = $('<div/>');
    };
    this.render = function() {
        this.el.html(Handlebars.templates.jugador(futbolista));
        return this.el;
    };
    
    this.inicializar();
    
}