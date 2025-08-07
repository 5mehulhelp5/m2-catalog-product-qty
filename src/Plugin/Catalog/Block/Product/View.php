<?php /** @noinspection PhpUnusedParameterInspection */

declare(strict_types=1);

namespace Infrangible\CatalogProductQty\Plugin\Catalog\Block\Product;

use FeWeDev\Base\Json;

/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */
class View
{
    /** @var Json */
    protected $json;

    public function __construct(Json $json)
    {
        $this->json = $json;
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

        return $this->json->encode($config);
    }
}
