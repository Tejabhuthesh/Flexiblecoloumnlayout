sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library',
    'sap/m/MessageBox'
 
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, fioriLibrary) {
        "use strict";

        return Controller.extend("idflex.flex.controller.Detail", {
            onInit: function () {

                var oModel = this.getOwnerComponent().getModel("LData");

                oModel.read("/userSet", {
                    success: (odata) => {
                        
                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata);
                        this.getView().setModel(oModel1, "Data1");
                        

                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        var message = oError;
                        var msg = $(error.response.body).find('message').first().text();
                        var action = "OK";
                        MessageBox.error(msg, {

                            onClose: function () {
                                if (action === "OK") {

                                }
                            }
                        });
                    }
                })
                var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Detail").attachPatternMatched(this.onRouteMatch, this);
                
                // var Namee = oRouter.getHashChanger().getHash().slice(7);
            },  
            onRouteMatch: function (evt) {
                debugger
                var that=this;
                var name = evt.mParameters.arguments.Name;
               
                var array1 =that.getView().getModel("Data1").getData().results;
                var data = [];
                for (var i = 0; i < array1.length; i++) {

                    if (name === array1[i].Name) {
                        data.push(array1[i]);

                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(data);
                        this.getView().setModel(oModel, "Data6");
                    }
                }
            },

            onEditToggleButtonPress: function () {
                var oObjectPage = this.getView().byId("ObjectPageLayout"),
                    bCurrentShowFooterState = oObjectPage.getShowFooter();

                oObjectPage.setShowFooter(!bCurrentShowFooterState);
            },
            onSuppliers: function (evt) {
                var oFCL = this.oView.getParent().getParent();

                oFCL.setLayout(fioriLibrary.LayoutType.ThreeColumnsMidExpanded);
                var Name=evt.oSource.mAggregations.cells[0].mProperties.text;
                var oEVentBus = sap.ui.getCore().getEventBus();
                
                oEVentBus.publish("Detail", "ShowPopup", { text: Name });
               
            }

        });
    });
