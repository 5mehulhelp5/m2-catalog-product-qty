/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */

define([
    'jquery',
    'domReady',
    'Infrangible_Select2/js/select2'
], function ($, domReady) {
    'use strict';

    return function (widget) {
        $.widget('mage.priceBox', widget, {
            updatePrice: function updatePrice(newPrices) {
                var self = this;

                if (newPrices) {
                    var qtyInput = $(self.qtyInfo);

                    var qtyValue = qtyInput.length > 0 ? qtyInput.val() : 1;

                    $.each(newPrices, function(priceHash, prices) {
                        if (priceHash !== 'prices') {
                            $.each(prices, function(priceCode, priceData) {
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

                self._super(newPrices);
            },

            updateProductTierPrice: function updateProductTierPrice() {
                var self = this,
                    originalPrice,
                    prices = {'prices': {}};

                if (self.options.prices.finalPrice) {
                    originalPrice = self.options.prices.finalPrice.amount;
                    prices.prices.unitPrice = {'amount': self.getPrice('unit') - originalPrice};
                }

                self.updatePrice(prices);

                self._super();
            },

            getPrice: function(priceKey) {
                var self = this;

                var tierPrice = self._super(priceKey === 'unit' ? 'price' : priceKey);

                var finalPriceBox = $('[data-price-type="finalPrice"]', self.element);

                if (finalPriceBox.length === 0) {
                    return tierPrice;
                }

                if (tierPrice === undefined) {
                    tierPrice = priceKey === 'price' || priceKey === 'unit' ? self.options.prices.finalPrice.amount :
                        (priceKey === 'basePrice' ? self.options.prices.basePrice.amount : 0);
                }

                if (priceKey === 'unit') {
                    return tierPrice;
                }

                var qtyInput = $(self.qtyInfo);
                var qtyValue = qtyInput.length > 0 ? qtyInput.val() : 1;

                var totalPrice = tierPrice * qtyValue;

                if (priceKey === 'price') {
                    $.each(self.cache.additionalPriceObject, function(priceHash, prices) {
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
            },

            reloadPrice: function reDrawPrices() {
                var self = this;

                self._super();

                if (! self.options.priceConfig.unitPrice) {
                    return;
                }

                var finalPriceBox = $('[data-price-type="finalPrice"]', self.element);

                if (finalPriceBox.length === 0) {
                    return;
                }

                _.each(self.cache.displayPrices, function (price, priceCode) {
                    if (priceCode === 'unitPrice') {
                        var priceValue = price.final;
                        var formattedPrice = price.formatted;

                        var qtyInput = $(self.qtyInfo);
                        if (qtyInput.length > 0) {
                            var qtyValue = qtyInput.length > 0 ? qtyInput.val() : 1;

                            var qtyField = qtyInput.closest('.field.qty');
                            if (qtyField.length > 0) {
                                var qtySelect = qtyField.find('select');
                                var unitPriceHint = qtyField.find('.unit-price-hint');

                                if (qtyValue > 1) {
                                    var addUnitPrice = true;

                                    if (qtySelect.length > 0) {
                                        qtySelect.attr('data-unit-price-value', priceValue);
                                        qtySelect.attr('data-unit-price-formatted', formattedPrice);

                                        var qtySelect2 = qtyField.find('.select2-container .selection .select2-selection .select2-selection__rendered');
                                        if (qtySelect2.length > 0) {
                                            if (unitPriceHint.length > 0) {
                                                unitPriceHint.remove();
                                            }

                                            qtySelect2.text(qtySelect2.attr('title') +
                                                ' (' + formattedPrice + ' / ' + $.mage.__('QtyItem') + ')');

                                            addUnitPrice = false;
                                        }
                                    }

                                    if (addUnitPrice) {
                                        if (unitPriceHint.length === 0) {
                                            unitPriceHint = $('<span>', {class: 'unit-price-hint'});
                                            qtyField.append(unitPriceHint);
                                        }

                                        unitPriceHint.text(formattedPrice + ' / ' + $.mage.__('QtyItem'));
                                    }
                                } else {
                                    if (unitPriceHint.length > 0) {
                                        unitPriceHint.remove();
                                    }
                                }
                            }
                        }
                    }
                });
            }
        });

        return $.mage.priceBox;
    };
});
