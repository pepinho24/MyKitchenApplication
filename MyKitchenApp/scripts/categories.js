(function (global) {

    var app = global.app = global.app || {};

    var CategoriyListViewModel = kendo.data.ObservableObject.extend({

        categoryDataSource: null,

        init: function () {
            var that = this;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        dataType: "json",
                        url: "http://localhost:3321/api/Categories/All"
                    }
                }
            });

            that.set("categoryDataSource", dataSource);
        },

        showDetail: function (e) {
            var that = new CategoriyListViewModel();

            var data = that.get("categoryDataSource");

            data.fetch(function () {
                var id = e.view.params.uid;
                var model = data.at(parseInt(id) - 1);
                kendo.bind(e.view.element, model, kendo.mobile.ui);
            });
        }
    });

    app.category = {
        viewModel: new CategoriyListViewModel(),
    };

})(window);