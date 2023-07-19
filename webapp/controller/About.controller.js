sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library',
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,fioriLibrary,MessageBox) {
        "use strict";

        return Controller.extend("idflex.flex.controller.About", {
            onInit: function () {

             
                  var that = this;
                var oModel = that.getOwnerComponent().getModel("LData");
                oModel.read("/userSet", {
                    success: function (odata) {
                        
                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata);
                        that.getView().setModel(oModel1, "Data1");
                        

                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        var message = error;
                        var msg = $(error.response.body).find('message').first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error(msg, {

                            onClose: function () {
                                if (action === "OK") {

                                }
                            }
                        });
                    }
                })
                var eventBus = sap.ui.getCore().getEventBus();
                eventBus.subscribe("Detail", "ShowPopup", that.onShowPopup, that); // Listener L
            },
            onShowPopup: function (sChanal, sEvent, oData) {
                debugger
                if (sEvent === "ShowPopup" ) {
                   var name = oData.text;
                } else {
                    var msg = "Message from : Main View";
                }
                // MessageBox.information(msg);
                var array1 =this.getView().getModel("Data1").getData().results;
                var data = [];
                for (var i = 0; i < array1.length; i++) {

                    if (name === array1[i].Name) {
                        data.push(array1[i]);

                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(data);
                        this.getView().setModel(oModel, "Data6");
                    }
                }
            }
        });
    });
