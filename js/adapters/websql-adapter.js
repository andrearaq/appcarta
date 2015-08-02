//Base de datos Carta

var WebSqlAdapter = function () {

    this.inicializar = function () {
        var deferred = $.Deferred();
        this.db = window.openDatabase("Carta", "1.0", "Carta Restaurante", 200000);
        //Database name, Version number, Text description, Estimated size of database
        this.db.transaction(
            function (tx) {
                crearTablaP(tx);
                insertarDatosP(tx);
                crearTablaC(tx);
                insertarDatosC(tx);
            },
            function (error) {
                console.log('Transacción Error: ' + error);
                deferred.reject('Transacción Error: ' + error);
            },
            function () {
                console.log('Transacción con éxito');
                deferred.resolve();
            }
        );
        //Los tres parámetros son la transacción en sí, la función de tratamiento de error, y la de todo OK.
        return deferred.promise();
    }

    this.encontrarCategoriaIdioma = function (id) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                var sql="";
                localStorage['idioma'] = id;
                console.log("localstorage idioma: "+localStorage['idioma']+" tipo: "+typeof(localStorage['idioma']));
                switch (id) {
                    case "1":
                        sql = "SELECT cid, ccastellano AS nomcateg, cimagen FROM categorias ORDER BY cid";
                        break;
                    case "2":
                        sql = "SELECT cid, cingles AS nomcateg, cimagen FROM categorias ORDER BY cid";
                        break;
                    case "3":
                        sql = "SELECT cid, cfrances AS nomcateg, cimagen FROM categorias ORDER BY cid";
                        break;                    
                    case "4":
                        sql = "SELECT cid, citaliano AS nomcateg, cimagen FROM categorias ORDER BY cid";
                        break; 
                }
                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length,
                        categorias = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        categorias[i] = results.rows.item(i);
                    }
                    deferred.resolve(categorias);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    
    this.encontrarPlatosIdioma = function (id, cat) {
        var deferred = $.Deferred();
        console.log("dentro de encontrar platos. tipo cat: "+typeof(cat));
        this.db.transaction(
            function (tx) {
                switch(id) {
                    case "1":
                        var sql = "SELECT a.id, a.nombre, a.castellano as nomplato, a.imagen, a.precio, b.ccastellano AS nomcateg"+
                            " FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break;
                    case "2":
                        var sql = "SELECT a.id, a.nombre, a.ingles as nomplato, a.imagen, a.precio, b.cingles AS nomcateg"+
                            " FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break;
                    case "3":
                        var sql = "SELECT a.id, a.nombre, a.frances as nomplato, a.imagen, a.precio, b.cfrances AS nomcateg"+
                            " FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break;                    
                    case "4":
                        var sql = "SELECT a.id, a.nombre, a.italiano as nomplato, a.imagen, a.precio, b.citaliano AS nomcateg"+
                            " FROM platos as a, categorias as b WHERE a.categoria=? AND b.cid = a.categoria";
                        break; 
                }
                tx.executeSql(sql, [cat], function (tx, results) {
                    var len = results.rows.length,
                        platos = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        platos[i] = results.rows.item(i);
                    }
                    deferred.resolve(platos);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    
    this.encontrarBebidasIdioma = function (id, cat) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                switch(id) {
                    case "1":
                        var sql = "SELECT id, castellano as nomplato, imagen, precio FROM platos WHERE categoria=?";
                        break;
                    case "2":
                        var sql = "SELECT id, ingles as nomplato, imagen, precio FROM platos WHERE categoria=?";
                        break;
                    case "3":
                        var sql = "SELECT id, frances as nomplato, imagen, precio FROM platos WHERE categoria=?";
                        break;                    
                    case "4":
                        var sql = "SELECT id, italiano as nomplato, imagen, precio FROM platos WHERE categoria=?";
                        break; 
                }
                tx.executeSql(sql, [cat], function (tx, results) {
                    var len = results.rows.length,
                        platos = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        platos[i] = results.rows.item(i);
                        
                    }
                    deferred.resolve(platos);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    //crear tabla Categorias
    var crearTablaC = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS categorias');
        var sql = "CREATE TABLE IF NOT EXISTS categorias ( " +
            "cid INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "ccastellano VARCHAR(50), " +
            "cingles VARCHAR(50), " +
            "cfrances VARCHAR(50), " +
            "citaliano VARCHAR(50), " +            
            "cimagen VARCHAR(50))";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla categorias OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
    //crear tabla Platos
    var crearTablaP = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS platos');
        var sql = "CREATE TABLE IF NOT EXISTS platos ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "nombre VARCHAR(50), " +
            "categoria INTEGER, " +
            "castellano VARCHAR(50), " +
            "ingles VARCHAR(50), " +
            "frances VARCHAR(50), " +
            "italiano VARCHAR(50), " +            
            "imagen VARCHAR(50), " +
            "precio FLOAT)";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla platos OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
    
    var insertarDatosC = function (tx, categorias) {

        var categorias = [
        {"cid": 1, "ccastellano": "Entrantes frios", "cingles": "Cold starters", "cfrances": "Entrées froides", "citaliano": "Antipasti freddi",  "cimagen":"entrantesfrios.jpg"},
        {"cid": 2, "ccastellano": "Entrantes calientes", "cingles": "Hot starters", "cfrances": "Entrées chaudes", "citaliano": "Antipasti calde",  "cimagen":"entrantescalientes.jpg"},
        {"cid": 3, "ccastellano": "Carnes", "cingles": "Meat", "cfrances": "Viande", "citaliano": "Carne",  "cimagen":"carnes.jpg"},
        {"cid": 4, "ccastellano": "Pescados", "cingles": "Fish", "cfrances": "Poisson", "citaliano": "Pesce",  "cimagen":"pescados.jpg"},
        {"cid": 5, "ccastellano": "Postres", "cingles": "Desserts", "cfrances": "Desserts", "citaliano": "Dessert",  "cimagen":"postres.jpg"},
        {"cid": 6, "ccastellano": "Raciones", "cingles": "Servings", "cfrances": "Portions", "citaliano": "Porzioni",  "cimagen":"raciones.jpg"},
        {"cid": 7, "ccastellano": "Menus", "cingles": "Menu", "cfrances": "Menus", "citaliano": "Menus",  "cimagen":"menus.jpg"},
        {"cid": 8, "ccastellano": "Bebidas", "cingles": "Drinks", "cfrances": "Boissons", "citaliano": "Bevande",  "cimagen":"bebidas.jpg"},
        {"cid": 9, "ccastellano": "Bebidas Terraza", "cingles": "Terrace drinks", "cfrances": "Boissons terrasse", "citaliano": "Bevande terrazza",  "cimagen":"bebidasterraza.jpg"}
    ];

        var l = categorias.length;
        var sql = "INSERT OR REPLACE INTO categorias " +
            "(cid, ccastellano, cingles, cfrances, citaliano, cimagen) " +
            "VALUES (?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = categorias[i];
            tx.executeSql(sql, [e.cid, e.ccastellano, e.cingles, e.cfrances, e.citaliano, e.cimagen],
                function () {
                    console.log('INSERT OK');
                },
                function (tx, error) {
                    alert('INSERT error: ' + error.message);
                });
        }
    }
    
    var insertarDatosP = function (tx, platos) {

        var platos = [
        {"id": 1, "nombre": "Salmón marinado", "categoria": 1, "castellano": "Salmón marinado a las finas hierbas con mousse de foie", "ingles": "Marinated salmon with herb and mousse de foie", "frances": "Saumon mariné aux herbes et mousse de foie", "italiano":"Salmone marinato con erbe e mousse de foie", "imagen":"salmonmarinado.jpg", "precio":12.00},
        {"id": 2, "nombre": "Micuit de foie", "categoria": 1, "castellano": "Micuit de foie, confitura de zanahoria y caviar de pétalos de violeta", "ingles": "Micuit gras, carrot confit and caviar violet petals", "frances": "Mi-cuit gras, confit de carottes et de caviar pétales de violettes", "italiano":"Micuit gras, confit carota e suoi petali di viola", "imagen":"micuitfoie.jpg", "precio":12.00},
        {"id": 3, "nombre": "Anchoas marinadas", "categoria": 1, "castellano": "Anchoas marinadas sobre compota de manzana y jengibre, y helado de tomate", "ingles": "Marinated anchovies on applesauce and ginger and tomato ice cream", "frances": "Anchois marinés sur la compote de pommes et gingembre et crème glacée à la tomate", "italiano":"Acciughe marinate in salsa di mele e zenzero e pomodoro gelato", "imagen":"anchoas.jpg", "precio":12.00},  
        {"id": 4, "nombre": "Jamón Ibérico de bellota", "categoria": 1, "castellano": "Jamón Ibérico de bellota (Sánchez Romero Carvajal ) con pan y tomate", "ingles": "Iberian ham with bread and tomato", "frances": "Jambon ibérique avec du pain et de la tomate", "italiano":"Prosciutto iberico con pane e pomodoro", "imagen":"jamon.jpg", "precio":21.00},  
        {"id": 5, "nombre": "Ensalada de bonito", "categoria": 1, "castellano": "Ensalada de bonito fresco en su escabeche artesano", "ingles": "Fresh tuna salad on their artisan pickled", "frances": "Salade de thon frais mariné sur leur artisan", "italiano":"Insalata di tonno fresco su loro salamoia artigianale", "imagen":"ensaladabonito.jpg", "precio":14.00}, 
        {"id": 6, "nombre": "Gazpacho Andaluz", "categoria": 1, "castellano": "Gazpacho Andaluz y sus guarniciones", "ingles": "Gazpacho Andaluz and fittings", "frances": "Gazpacho Andaluz et raccords", "italiano":"Gazpacho Andaluz e accessori", "imagen":"gazpacho.jpg", "precio":7.00},
        {"id": 7, "nombre": "Chipirones fritos", "categoria": 2, "castellano": "Chipirones fritos a la andaluza con pimientos de padrón", "ingles": "Andalusian fried squid with peppers of Padron", "frances": "Andalouse calmars frit avec poivrons de Padron", "italiano":"Andaluso calamari fritti con peperoni di Padron", "imagen":"chipirones.jpg", "precio":12.50},
        {"id": 8, "nombre": "Gambas a la plancha", "categoria": 2, "castellano": "Gamba blanca de Huelva a la plancha (12 unidades)", "ingles": "Grilled Huelva prawns (12 units)", "frances": "Huelva grillé de crevettes (12 unités)", "italiano":"Grigliate di Huelva gamberetti (12 unitá)", "imagen":"gambasplancha.jpg", "precio":12.50},
        {"id": 9, "nombre": "Risotto de boletus", "categoria": 2, "castellano": "Risotto de boletus y crujiente de patamulo", "ingles": "Risotto with mushrooms and crispy Patamulo", "frances": "Risotto aux champignons et croustillant Patamulo", "italiano":"Risotto con funghi e Patamulo croccanti", "imagen":"risottoboletus.jpg", "precio":12.00},
        {"id": 10, "nombre": "Gambas al ajillo", "categoria": 2, "castellano": "Gamba langostinera al ajillo", "ingles": "Prawns with garlic", "frances": "Gambas à l'ail", "italiano":"Gamberi con aglio", "imagen":"gambasajillo.jpg", "precio":14.00},
        {"id": 11, "nombre": "Steak tartar", "categoria": 3, "castellano": "Steak tartar a nuestro estilo y helado de mostaza en grano ", "ingles": "Steak tartar and grain mustard ice cream", "frances": "Steak tartare et le grain de la glace à la moutarde", "italiano":"Steak tartare e grano crema di senape gelato", "imagen":"steaktartar.jpg", "precio":20.00},
        {"id": 12, "nombre": "Lechal asado", "categoria": 3, "castellano": "Lechal asado D.O Aranda (previo encargo)", "ingles": "Roast suckling O.D. Aranda", "frances": "De lait rôti O.D. Aranda", "italiano":"Roast lattante O.D. Aranda", "imagen":"lechal.jpg", "precio":19.00},
        {"id": 13, "nombre": "Solomillo de ternera", "categoria": 3, "castellano": "Solomillo de ternera, plancha ó reducción de Pedro Ximenez", "ingles": "Beef tenderloin, grilled or Pedro Ximenez reduction", "frances": "Filet de boeuf, grillé ou la réduction Pedro Ximenez", "italiano":"Filetto di manzo, alla griglia o la riduzione di Pedro Ximenez", "imagen":"solomilloternera.jpg", "precio":21.00},
        {"id": 14, "nombre": "Entrecotte de ternera", "categoria": 3, "castellano": "Entrecotte de ternera plancha ó salsa roquefort", "ingles": "Veal entrecote in roquefort sauce or grilled", "frances": "Entrecôte de veau à la sauce roquefort ou grillé", "italiano":"Entrecote di vitello alla griglia o salsa roquefort", "imagen":"entrecotteternera.jpg", "precio":19.00},
        {"id": 15, "nombre": "Dorada a la sal", "categoria": 4, "castellano": "Dorada de mar a la sal", "ingles": "Salty wild gilthead bream", "frances": "Daurade sauvage au sel", "italiano":"Orata selvaggia salato", "imagen":"doradasal.jpg", "precio":17.00}, 
        {"id": 16, "nombre": "Merluza plancha o salsa verde", "categoria": 4, "castellano": "Merluza plancha ó con almejas en salsa verde", "ingles": "Grilled hake or with clams in green sauce ", "frances": "Merlu grillé ou aux palourdes à la sauce verte", "italiano":"Nasello alla griglia o con vongole in salsa verde", "imagen":"merluzasalsa.jpg", "precio":18.00},
        {"id": 17, "nombre": "Paella de bogavante", "categoria": 4, "castellano": "Paella de bogavante (min. 2 personas)", "ingles": "Lobster Paella (min. 2 people)", "frances": "Paella de homard (min. 2 personnes)", "italiano":"Paella di aragosta (min. 2 persone)", "imagen":"paellabogavante.jpg", "precio":17.00},
        {"id": 18, "nombre": "Rape plancha o salsa americana", "categoria": 4, "castellano": "Rape (Coruña) plancha ó con almejas en salsa americana", "ingles": "Grilled monkfish (Coruña) or with clams in American sauce", "frances": "Lotte (Coruña) grillée ou aux palourdes en sauce américaine", "italiano":"Coda di rospo (Coruña) alla griglia o con vongole in salsa americana", "imagen":"rapeplancha.jpg", "precio":21.00},
        {"id": 19, "nombre": "Mousse de requesón", "categoria": 5, "castellano": "Mousse de requesón y pure de manzana asada", "ingles": "Cottage cheese mousse and baked apple puree", "frances": "Fromage cottage mousse et purée de pommes au four", "italiano":"Ricotta mousse e al forno purè di mele", "imagen":"mousserequeson.jpg", "precio":6.00},
        {"id": 20, "nombre": "Hojaldre con helado", "categoria": 5, "castellano": "Hojaldre con helado de vainilla, bourbón y chocolate caliente", "ingles": "Puff pastry with vanilla ice, bourbon and hot chocolate", "frances": "Pâte feuilletée avec de la glace à la vanille bourbon et de chocolat chaud", "italiano":"Pasta sfoglia con gelato alla vaniglia, bourbon e chocolat caldo", "imagen":"hojaldre.jpg", "precio":6.00},
        {"id": 21, "nombre": "Sorbete de limón", "categoria": 5, "castellano": "Sorbete de limón a la menta", "ingles": "Lemon sorbet with mint", "frances": "Sorbet au citron à la menthe", "italiano":"Sorbetto al limone con la menta", "imagen":"sorbetelimon.jpg", "precio":5.00},
        {"id": 22, "nombre": "Sorbete de mango", "categoria": 5, "castellano": "Sorbete de mango y jenjibre", "ingles": "mango sorbet and ginger", "frances": "Sorbet à la mangue et au gingembre", "italiano":"Sorbetto al mango e zenzero", "imagen":"sorbetemango.jpg", "precio":5.00},
        {"id": 23, "nombre": "Brownie de chocolate", "categoria": 5, "castellano": "Brownie de chocolate y almendras, con helado de vainilla y bourbon ", "ingles": "Brownie chocolate and almonds with vanilla ice cream and bourbon", "frances": "Brownie chocolat et amandes avec de la crème glacée à la vanille et bourbon", "italiano":"Brownie cioccolato e mandorle con gelato alla vaniglia e bourbon", "imagen":"brownie.jpg", "precio":6.00},
        {"id": 24, "nombre": "Trufas de chocolate", "categoria": 5, "castellano": "Trufas de chocolate", "ingles": "Chocolate truffles", "frances": "Truffes au chocolat", "italiano":"Tartufi di cioccolato", "imagen":"trufas.jpg", "precio":5.00},
        {"id": 25, "nombre": "Carpaccio de piña", "categoria": 5, "castellano": "Carpaccio de piña al azafrán con helado de coco", "ingles": "Pineapple carpaccio with saffron with coconut ice cream", "frances": "Carpaccio d'ananas avec du safran avec de la crème glacée à la noix de coco", "italiano":"Carpaccio di ananas con zafferano con gelato al cocco", "imagen":"pina.jpg", "precio":6.00},
        {"id": 26, "nombre": "Pan con tomate", "categoria": 6, "castellano": "Ración de pan con tomate", "ingles": "Ration of bread with tomato", "frances": "Ration de pain à la tomate", "italiano":"Razione di pane con pomodoro", "imagen":"bale.jpg", "precio":2.00},
        {"id": 27, "nombre": "Ración de olivas", "categoria": 6, "castellano": "Ración de olivas", "ingles": "Serving of olives", "frances": "Ration d'olives", "italiano":"Razione di olive", "imagen":"olivas.jpg", "precio":2.00},
        {"id": 28, "nombre": "Surtido de quesos", "categoria": 6, "castellano": "Surtido de quesos", "ingles": "Assortment of cheeses", "frances": "Assortiment de fromages", "italiano":"Assortimento di formaggi", "imagen":"quesos.jpg", "precio":10.00},
        {"id": 29, "nombre": "Ensalada ilustrada", "categoria": 6, "castellano": "Ensalada ilustrada", "ingles": "mixed salad", "frances": "Salade composée", "italiano":"Insalata mista", "imagen":"ensaladailustrada.jpg", "precio":10.00},
        {"id": 30, "nombre": "Jamón ibérico", "categoria": 6, "castellano": "Jamón ibérico con pan y tomate", "ingles": "Iberian ham with bread and tomato", "frances": "Jambon ibérique avec du pain et de la tomate", "italiano":"Prosciutto iberico con pane e pomodoro", "imagen":"jamon.jpg", "precio":12.00},
        {"id": 31, "nombre": "Ensaladilla rusa", "categoria": 6, "castellano": "Ensaladilla rusa", "ingles": "Russian salad", "frances": "Salade russe", "italiano":"Insalata russa", "imagen":"ensaladillarusa.jpg", "precio":6.00},
        {"id": 32, "nombre": "Croquetas de queso", "categoria": 6, "castellano": "Croquetas ligeras de queso (8 unidades)", "ingles": "Light cheese croquettes (8 units)", "frances": "Croquettes de fromage légers (8 unités)", "italiano":"Crocchette di formaggio luce (8 unità)", "imagen":"croquetasqueso.jpg", "precio":5.00},
        {"id": 33, "nombre": "Tortitas de camarón", "categoria": 6, "castellano": "Tortitas de camarón (4 unidades)", "ingles": "Shrimp pancakes (4 units)", "frances": "Crêpes aux crevettes (4 unités)", "italiano":"Frittelle di gamberetti (4 unitá)", "imagen":"tortitascamaron.jpg", "precio":8.00},
        {"id": 34, "nombre": "Chipirones a la andaluza", "categoria": 6, "castellano": "Chipirones a la andaluza", "ingles": "Andalusian fried squid", "frances": "Andalouse calmars frit", "italiano":"Andaluso calamari fritti", "imagen":"chipirones.jpg", "precio":10.00},
        {"id": 35, "nombre": "Gambas a la plancha", "categoria": 6, "castellano": "Gambas de Huelva a la plancha (6 unidades) ", "ingles": "Grilled Huelva prawns (6 units)", "frances": "Huelva grillé de crevettes (6 unités)", "italiano":"Grigliate di Huelva gamberetti (6 unitá)", "imagen":"gambasplancha.jpg", "precio":8.00},
        {"id": 36, "nombre": "Anchoas marinadas", "categoria": 6, "castellano": "Anchoas marinadas (6 unidades)", "ingles": "Marinated anchovies (6 units)", "frances": "Anchois marinés (6 unités)", "italiano":"Acciughe marinate (6 unitá)", "imagen":"anchoasmarinadas.jpg", "precio":8.00},
        {"id": 37, "nombre": "Pulpo a la gallega", "categoria": 6, "castellano": "Pulpo a la gallega", "ingles": "Galician octopus", "frances": "Poulpe galicien", "italiano":"Polpo gallego", "imagen":"pulpogallega.jpg", "precio":12.00},
        {"id": 38, "nombre": "Sorbetes de fruta natural", "categoria": 6, "castellano": "Sorbetes de fruta natural", "ingles": "Natural fruit sorbets", "frances": "Sorbets de fruits naturels", "italiano":"Sorbetti alla frutta naturale", "imagen":"sorbetelimon.jpg", "precio":5.00},
        {"id": 39, "nombre": "Brownie de chocolate", "categoria": 6, "castellano": "Brownie de chocolate con helado de vainilla", "ingles": "Chocolate brownie with vanilla ice", "frances": "Brownie au chocolat avec glace à la vanille", "italiano":"Brownie al cioccolato con gelato alla vaniglia", "imagen":"brownie.jpg", "precio":5.00},
        {"id": 40, "nombre": "Trufas de chocolate", "categoria": 6, "castellano": "Trufas de chocolate (5 unidades)", "ingles": "Chocolate truffles (5 units)", "frances": "Truffes au chocolat (5 unités)", "italiano":"Tartufi di cioccolato (5 unitá)", "imagen":"trufas.jpg", "precio":5.00},
        {"id": 41, "nombre": "Menú Desgustación", "categoria": 7, "castellano": "Menú Degustación", "ingles": "Tasting menu", "frances": "Menu dégustation", "italiano":"Menu degustazione", "imagen":"bale.jpg", "precio":39.00},
        {"id": 41, "nombre": "Menú del arroz", "categoria": 7, "castellano": "Menú del arroz", "ingles": "Rice Menu", "frances": "Menu riz", "italiano":"Rice Menu", "imagen":"bale.jpg", "precio":30.00},
        {"id": 41, "nombre": "Menú del chuletón", "categoria": 7, "castellano": "Menú del chuletón", "ingles": "Steak menu", "frances": "Menu steak", "italiano":"Menu bistecca", "imagen":"bale.jpg", "precio":30.00},
        {"id": 41, "nombre": "Menú gastronómico", "categoria": 7, "castellano": "Menú gastronómico", "ingles": "Gourmet menu", "frances": "Menu gastronomique", "italiano":"Menù gourmet", "imagen":"bale.jpg", "precio":39.00}
    ];
        var l = platos.length;
        var sql = "INSERT OR REPLACE INTO platos " + 
            "(id, nombre, categoria, castellano, ingles, frances, italiano, imagen, precio) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = platos[i];
            tx.executeSql(sql, [e.id, e.nombre, e.categoria, e.castellano, e.ingles, e.frances, e.italiano, e.imagen, e.precio],
                function () {
                    console.log('INSERT OK');
                },
                function (tx, error) {
                    alert('INSERT error: ' + error.message);
                });
        }
    }
}