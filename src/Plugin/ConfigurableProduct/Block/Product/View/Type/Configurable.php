<?php /** @noinspection PhpUnusedParameterInspection */

declare(strict_types=1);

namespace Infrangible\CatalogProductQty\Plugin\ConfigurableProduct\Block\Product\View\Type;

use FeWeDev\Base\Json;

/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */
class Configurable
{
    /** @var Json */
    protected $json;

    public function __construct(Json $json)
    {
        $this->json = $json;
    }

    public function afterGetJsonConfig(
        \Magento\ConfigurableProduct\Block\Product\View\Type\Configurable $subject,
        string $result
    ): string {
        $config = $this->json->decode($result);

        $config[ 'prices' ][ 'unitPrice' ] = $config[ 'prices' ][ 'finalPrice' ];

        foreach ($config[ 'optionPrices' ] as $usedProductId => $usedProductPrices) {
            $config[ 'optionPrices' ][ $usedProductId ][ 'unitPrice' ] =
                $config[ 'optionPrices' ][ $usedProductId ][ 'finalPrice' ];
        }

        return $this->json->encode($config);
    }
}
