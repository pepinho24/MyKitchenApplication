(function (global) {

    var app = global.app = global.app || {};

    var ProductsListViewModel = kendo.data.ObservableObject.extend({

        productsDataSource: null,

        init: function () {
            var that = this;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        dataType: "json",
                        url: "http://coocking.apphb.com/api/Receipts/All"
                    }
                }
            });

            that.set("productsDataSource", dataSource);
        },

        showDetail: function (e) {
            var that = new ProductsListViewModel();

            var data = that.get("productsDataSource");

            data.fetch(function () {
                var id = e.view.params.uid;
                var model = data.at(parseInt(id) - 1);
                kendo.bind(e.view.element, model, kendo.mobile.ui);
            });
        },

        showDescription: function () {
            var that = new ProductsListViewModel();

            var data = that.get("productsDataSource");

            data.fetch(function () {
                var id = parseInt($('#description-container').attr('data-description'));
                var product = data.at(parseInt(id) - 1);
                var model = {
                    //name: product.name
                   
                };

                kendo.bind($('#recipe-description'), model, kendo.mobile.ui);
                $("#recipe-description").kendoMobileModalView("open");
            });
        },

        closeDescription: function () {
            $("#recipe-description").kendoMobileModalView("close");
        },

        createProduct: function () {

        }
    });

    app.products = {
        viewModel: new ProductsListViewModel()
    };

})(window);