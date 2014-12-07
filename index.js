(function(){

    var log = require('./lib/console'),
        config = require('./lib/config'),
        connect = require('connect'),
        express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        bodyParser = require('body-parser'),
        less = require('less-middleware'),
        path = require('path'),
        files = require('./lib/files'),
        bootstrap = require('kuba-bootstrap'),
        bootstrapPath = path.join(__dirname, 'node_modules', 'kuba-bootstrap'),
        aws = require('aws-sdk');
        
        // auth = require('./lib/services/auth'),
        // user = require('./lib/services/user'),
        // posts = require('./lib/services/posts'),
        // products = require('./lib/services/products'),
        // ingredients = require('./lib/services/ingredients'),
        // likes = require('./lib/services/likes'),
        // comments = require('./lib/services/comments'),
        // hashtags = require('./lib/services/hashtags'),
        // profile = require('./lib/services/profile'),
        // dashboard = require('./lib/services/dashboard'),
        // app_stats = require('./lib/services/app_stats'),
        // search = require('./lib/services/search');

    log('i', 'dashboard started');

    server.listen(config.port);

    app.use(bodyParser({limit: '5mb'}));
    app.use(bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(less(__dirname + '/public'));
    app.use(express.static(__dirname + '/public'));
        
    aws.config.update({ 
        "accessKeyId": config.aws_access_key_id,
        "secretAccessKey": config.aws_secret_access_key,
        "region": config.aws_region || "us-west-1",
        "apiVersions": { "s3": '2006-03-01' }
    });

    app.s3 = new aws.S3();

    function loadAssets(res){

        var assets = {

            css: [
                // css
                'css/master.css',
                'css/responsive.css'
            ],
            
            scripts: [ 
                // libs
                'js/libs/jquery-1.9.1.min.js',
                'js/libs/underscore-min.js',
                'js/libs/angular.min.js',
                // 'js/libs/angular-route.min.js',
                // 'js/libs/lawnchair-0.6.1.js',
                'js/main.js',
                'js/app.js',
                'js/config.js',
                'js/directives.js',

                // factory
                // 'js/factory/services.js',
                // 'js/factory/storage.js',
                // 'js/factory/like.js',
                // 'js/factory/images.js',
                // 'js/factory/graphs.js',
            
                // controllers
                'js/controllers/index.js',
                // 'js/controllers/menu.js',
                // 'js/controllers/login.js',
                // 'js/controllers/press.js',
                // 'js/controllers/about.js',
                // 'js/controllers/about-products.js',
                // 'js/controllers/dashboard.js',
                // 'js/controllers/my-posts.js',
                // 'js/controllers/my-products.js',
                // 'js/controllers/settings.js',
                // 'js/controllers/posts.js',
                // 'js/controllers/products.js',
                // 'js/controllers/ingredients.js',
                // 'js/controllers/hashtags-posts.js',
                // 'js/controllers/hashtags-products.js',
                // 'js/controllers/post.js',
                // 'js/controllers/product.js',
                // 'js/controllers/ingredient.js',
                // 'js/controllers/search.js',
                // 'js/controllers/profile.js',
                // 'js/controllers/404.js'
            ]
        };

        //TODO: create async file load and combine all assets to render

        // title
        assets['title'] = config.title;

        // css
        files('less', '.css', function(files){
            log('i', files);

            // assets['css'] = files;
        });

        // libs
        files('js/libs', '.js', function(files){
            log('i', files);

            // assets['scripts'] = files;
        });

        // modules
        files('js/fx', '.js', function(files){
            log('i', files);

            assets['fx'] = files;

            log('w', assets);

            res.render('index', assets);
        });
    } 

    // loadAssets(res);

    // services
    // auth(app);
    // user(app);
    // posts(app);
    // products(app);
    // ingredients(app);
    // likes(app);
    // comments(app);
    // hashtags(app);
    // profile(app);
    // dashboard(app);
    // app_stats(app);
    // search(app);

    app.get('*', function(req, res){

        if(config.mode == 'dev'){
            log('de', 'dynamic asset loading');

            loadAssets(res);
        }
    });

})();