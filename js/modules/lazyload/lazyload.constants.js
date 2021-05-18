(function() {
    "use strict";

    angular
        .module("app.lazyload")
        .constant("APP_REQUIRES", {
          // jQuery based and standalone scripts
          scripts: {
            "whirl":              ["vendor/whirl/dist/whirl.css"],
            "animo":              ["vendor/animo.js/animo.js"],
            "classyloader":       ["vendor/jquery-classyloader/js/jquery.classyloader.js"],
            "fastclick":          ["vendor/fastclick/lib/fastclick.js"],
            "modernizr":          ["vendor/modernizr/modernizr.custom.js"],
            "animate":            ["vendor/animate.css/animate.min.css"],
            "slimscroll":         ["vendor/slimScroll/jquery.slimscroll.min.js"],
            "filestyle":          ["vendor/bootstrap-filestyle/api-private/bootstrap-filestyle.js"],
            "loaders.css":        ["vendor/loaders.css/loaders.min.css"],
            "spinkit":            ["vendor/spinkit/css/spinkit.css"],
            "jquery-ui":          ["vendor/jquery-ui/ui/minified/jquery-ui.min.js",
                                   "vendor/jquery-ui/themes/base/jquery-ui.css"],
            "jquery-mousewheel":  ["vendor/jquery-mousewheel/jquery.mousewheel.min.js"]
          },
          // Angular based script (use the right module name)
          modules: [
            {name: "toaster",                   files: ["vendor/angularjs-toaster/toaster.js",
                                                       "vendor/angularjs-toaster/toaster.css"]},
            {name: "ngDialog",                  files: ["vendor/ngDialog/js/ngDialog.min.js",
                                                       "vendor/ngDialog/css/ngDialog.min.css",
                                                       "vendor/ngDialog/css/ngDialog-theme-default.min.css"] },
            {name: "ngImgCrop",                 files: ["vendor/ng-img-crop/compile/unminified/ng-img-crop.js",
                                                        "vendor/ng-img-crop/compile/unminified/ng-img-crop.css"]},

            {name: "ngScrollable",              files: ["vendor/ngScrollable/min/ng-scrollable.min.js",
                                                        "vendor/ngScrollable/min/ng-scrollable.min.css"]},
            {name: "ui.slider",                 files: ["vendor/angular-ui-slider/api-private/slider.js"]},

            {name: "angular-loaders",           files: ["vendor/angular-loaders/dist/angular-loaders.min.js",
                                                        "vendor/loaders.css/loaders.min.css"], serie: true },
            {name: "oitozero.ngSweetAlert",     files: ["vendor/sweetalert/dist/sweetalert.css",
                                                        "vendor/sweetalert/dist/sweetalert.min.js",
                                                        "vendor/ngSweetAlert/SweetAlert.min.js"]},
            {name: "ngFileSaver",               files: ["vendor/angular-file-saver/dist/angular-file-saver.bundle.min.js"]},
            {name: "favico",                    files: ["vendor/favico.js/favico.js"]}, 
            {name: "angularBootstrapNavTree",   files: ["vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js",
                                                        "vendor/angular-bootstrap-nav-tree/dist/abn_tree.css"]}

          ]
        });

})();
