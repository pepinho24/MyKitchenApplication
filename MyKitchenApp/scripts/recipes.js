(function (global) {

    var app = global.app = global.app || {};

    var RecipesListViewModel = kendo.data.ObservableObject.extend({

        recipesDataSource: null,

        init: function () {
            var that = this;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        dataType: "json",
                        url: "http://coocking.apphb.com/api/Products/All"
                    }
                }
            });

            that.set("recipesDataSource", dataSource);
        },

        showDetail: function (e) {
            var that = new RecipesListViewModel();

            var data = that.get("recipesDataSource");

            data.fetch(function () {
                var id = e.view.params.uid;
                var model = data.at(parseInt(id) - 1);
                kendo.bind(e.view.element, model, kendo.mobile.ui);
            });
        },

        showDescription: function () {
            var that = new RecipesListViewModel();

            var data = that.get("recipesDataSource");

            data.fetch(function () {
                var id = parseInt($('#description-container').attr('data-description'));
                var recipe = data.at(parseInt(id) - 1);
                var model = {
                    name: recipe.name,
                    description: recipe.description
                };

                kendo.bind($('#recipe-description'), model, kendo.mobile.ui);
                $("#recipe-description").kendoMobileModalView("open");
            });
        },
        closeDescription: function () {
            $("#recipe-description").kendoMobileModalView("close");
        },
        createRecipe: function () {

        }
    });

    app.recipes = {
        viewModel: new RecipesListViewModel(),
    };

})(window);