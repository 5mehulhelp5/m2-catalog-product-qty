<?php

declare(strict_types=1);

namespace Infrangible\CatalogProductQty\Plugin\Catalog\Pricing\Render;

use Infrangible\CatalogProductQty\Block\Catalog\Pricing\Render\UnitPriceBox;
use Infrangible\Core\Helper\Block;
use Infrangible\Core\Helper\Stores;
use Magento\Catalog\Pricing\Price\FinalPrice;
use Magento\Framework\Exception\LocalizedException;

/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */
class FinalPriceBox
{
    /** @var Stores */
    protected $storeHelper;

    /** @var Block */
    protected $blockHelper;

    public function __construct(Stores $storeHelper, Block $blockHelper)
    {
        $this->storeHelper = $storeHelper;
        $this->blockHelper = $blockHelper;
    }

    /**
     * @throws LocalizedException
     */
    public function afterToHtml(\Magento\Catalog\Pricing\Render\FinalPriceBox $subject, string $html): string
    {
        if ($html === '') {
            return $html;
        }

        if ($subject->getData('zone') !== 'item_view') {
            return $html;
        }

        if (! $this->storeHelper->getStoreConfigFlag('infrangible_catalogproductqty/product_view/show_unit_price')) {
            return $html;
        }

        $saleableItem = $subject->getSaleableItem();

        /** @var FinalPrice $price */
        $price = $saleableItem->getPriceInfo()->getPrice('final_price');

        $html .= $this->blockHelper->renderLayoutTemplateExtendedBlock(
            $subject->getLayout(),
            UnitPriceBox::class,
            'Infrangible_CatalogProductQty::product/price/unit_price.phtml',
            [],
            [
                'rendererPool' => $subject->getRendererPool(),
                'price'        => $price,
                'saleableItem' => $subject->getSaleableItem()
            ]
        );

        return $html;
    }
}
