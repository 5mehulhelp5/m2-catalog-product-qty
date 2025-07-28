/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */

var config = {
    config: {
        mixins: {
            'Magento_Catalog/js/price-box': {
                'Infrangible_CatalogProductQty/js/price-box-mixin': true
            },
            'Magento_Swatches/js/swatch-renderer': {
                'Infrangible_CatalogProductQty/js/swatch-renderer-mixin': true
            }
        }
    }
};
