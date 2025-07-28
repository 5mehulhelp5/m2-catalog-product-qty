/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */

define([
    'jquery',
    'underscore'
], function ($, _) {
    'use strict';

    return function (widget) {
        $.widget('mage.SwatchRenderer', widget, {
            _getNewPrices: function () {
                var qtyInput = $(this.options.qtyInfo);
                var qtyValue = qtyInput.length > 0 ? qtyInput.val() : 0;

                var newPrices = this._super();

                if (qtyValue > 1) {
                    var allowedProduct = this._getAllowedProductWithMinPrice(this._CalcProducts());

                    if (!_.isEmpty(allowedProduct)) {
                        if (this.options.jsonConfig.optionPrices[allowedProduct].tierPrices) {
                            var tierPrices = this.options.jsonConfig.optionPrices[allowedProduct].tierPrices;
                            var i, tierPriceItem;
                            for (i = 0; i < tierPrices.length; i++) {
                                tierPriceItem = tierPrices[i];
                                if (qtyValue >= tierPriceItem.qty) {
                                    newPrices.finalPrice.unitAmount = tierPriceItem.price;
                                }
                            }
                        }
                    }
                }

                $.each(newPrices, function(priceHash, priceData) {
                    if (! priceData.orgAmount) {
                        if (priceData.unitAmount) {
                            priceData.amount = priceData.unitAmount * qtyValue;
                        } else if (priceData.amount) {
                            priceData.unitAmount = priceData.amount;
                            priceData.amount = priceData.unitAmount * qtyValue;
                        }
                    }
                });

                return newPrices;
            }
        });

        return $.mage.SwatchRenderer;
    };
});
