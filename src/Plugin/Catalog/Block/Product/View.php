<?php /** @noinspection PhpUnusedParameterInspection */

declare(strict_types=1);

namespace Infrangible\CatalogProductQty\Plugin\Catalog\Block\Product;

use FeWeDev\Base\Json;
use Infrangible\Core\Helper\Stores;

/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */
class View
{
    /** @var Json */
    protected $json;

    /** @var Stores */
    protected $storeHelper;

    public function __construct(Json $json, Stores $storeHelper)
    {
        $this->json = $json;
        $this->storeHelper = $storeHelper;
    }

    public function afterGetJsonConfig(\Magento\Catalog\Block\Product\View $subject, string $result): string
    {
        $config = $this->json->decode($result);

        if (array_key_exists(
            'prices',
            $config
        )) {
            $config[ 'prices' ][ 'unitPrice' ] = $config[ 'prices' ][ 'finalPrice' ];
        }

        $config[ 'unitPrice' ] =
            $this->storeHelper->getStoreConfigFlag('infrangible_catalogproductqty/product_view/show_unit_price_hint');

        return $this->json->encode($config);
    }
}
