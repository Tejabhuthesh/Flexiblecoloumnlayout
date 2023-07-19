sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library',
    'sap/m/MessageBox'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,fioriLibrary,MessageBox) {
        "use strict";

        return Controller.extend("idflex.flex.controller.List", {
            onInit: function () {
                var that = this;
                var oModel = that.getOwnerComponent().getModel("LData");
                oModel.read("/userSet", {
                    success: function (odata) {
                        // debugger;
                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata);
                        that.getView().setModel(oModel1, "Data1");
                        // alert("Success");
                        // MessageBox.success(oModel1);

                    },
                    error: function (oError) {
                        // Check what is ErrorHandler file
                        sap.ui.core.BusyIndicator.hide();
                        var message = error;
                        var msg = $(error.response.body).find('message').first().text();
                        MessageBox.error(msg);
                    }
                })
                
            },
            _getRouter: function() {
                // Keep in basecontroller
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onListItemPress: function (evt) {
                // oEvent
                var oFCL = this.oView.getParent().getParent();
    
                oFCL.setLayout("TwoColumnsMidExpanded");
                 var Name=evt.oSource.mAggregations.cells[0].mProperties.title;
                 // oEvent.getSource().getBindingContext(), getPath()

                 this._getRouter().navTo("Detail", { Name: Name});
            }
        });
    });
