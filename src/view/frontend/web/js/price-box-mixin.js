/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */

define([
    'jquery'
], function ($) {
    'use strict';

    return function (widget) {
        $.widget('mage.priceBox', widget, {
            updatePrice: function updatePrice(newPrices) {
                if (newPrices) {
                    var qtyInput = $(this.qtyInfo);

                    var qtyValue = qtyInput.length > 0 ? qtyInput.val() : 1;

                    $.each(newPrices, function(priceHash, prices) {
                        if (priceHash !== 'prices') {
                            $.each(prices, function(price, priceData) {
                                if (! priceData.orgAmount) {
                                    if (priceData.unitAmount) {
                                        priceData.amount = priceData.unitAmount * qtyValue;
                                    } else if (priceData.amount) {
                                        priceData.unitAmount = priceData.amount;
                                        priceData.amount = priceData.unitAmount * qtyValue;
                                    }
                                }
                            });
                        }
                    });
                }

                this._super(newPrices);
            },

            getPrice: function(priceKey) {
                var tierPrice = this._super(priceKey);

                var finalPriceBox = $('[data-price-type="finalPrice"]', this.element);

                if (finalPriceBox.length === 0) {
                    return tierPrice;
                }

                if (tierPrice === undefined) {
                    tierPrice = priceKey === 'price' ? this.options.prices.finalPrice.amount :
                        (priceKey === 'basePrice' ? this.options.prices.basePrice.amount : 0);
                }

                var qtyInput = $(this.qtyInfo);
                var qtyValue = qtyInput.length > 0 ? qtyInput.val() : 1;

                var totalPrice = tierPrice * qtyValue;

                if (priceKey === 'price') {
                    $.each(this.cache.additionalPriceObject, function(priceHash, prices) {
                        if (priceHash !== 'prices') {
                            $.each(prices, function(price, priceData) {
                                if (! priceData.orgAmount) {
                                    if (priceData.unitAmount) {
                                        priceData.amount = priceData.unitAmount * qtyValue;
                                    } else if (priceData.amount) {
                                        priceData.unitAmount = priceData.amount;
                                        priceData.amount = priceData.unitAmount * qtyValue;
                                    }
                                }
                            });
                        }
                    });
                }

                return totalPrice;
            }
        });

        return $.mage.priceBox;
    };
});
