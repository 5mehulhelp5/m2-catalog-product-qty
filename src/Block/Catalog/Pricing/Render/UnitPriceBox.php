<?php

declare(strict_types=1);

namespace Infrangible\CatalogProductQty\Block\Catalog\Pricing\Render;

use Magento\Catalog\Model\Product\Pricing\Renderer\SalableResolverInterface;
use Magento\Framework\Pricing\Price\PriceInterface;
use Magento\Framework\Pricing\Render\PriceBox;
use Magento\Framework\Pricing\Render\RendererPool;
use Magento\Framework\Pricing\SaleableInterface;
use Magento\Framework\View\Element\Template;

/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */
class UnitPriceBox extends PriceBox
{
    /** @var SalableResolverInterface */
    protected $salableResolver;

    public function __construct(
        Template\Context $context,
        SaleableInterface $saleableItem,
        PriceInterface $price,
        RendererPool $rendererPool,
        SalableResolverInterface $salableResolver,
        array $data = []
    ) {
        parent::__construct(
            $context,
            $saleableItem,
            $price,
            $rendererPool,
            $data
        );

        $this->salableResolver = $salableResolver;
    }

    protected function _toHtml(): string
    {
        $cssClasses = $this->hasData('css_classes') ? explode(
            ' ',
            $this->getData('css_classes')
        ) : [];

        $cssClasses[] = 'price-unit_price';

        $this->setData(
            'css_classes',
            implode(
                ' ',
                $cssClasses
            )
        );

        return $this->wrapResult(Template::_toHtml());
    }

    protected function wrapResult(string $html): string
    {
        if (! $this->salableResolver->isSalable($this->getSaleableItem())) {
            return '';
        }

        return sprintf(
            "<div class=\"price-box %s\" data-role=\"priceBox\" data-product-id=\"%s\" data-price-box=\"product-id-%s\">%s</div>",
            $this->getData('css_classes'),
            $this->getSaleableItem()->getId(),
            $this->getSaleableItem()->getId(),
            $html
        );
    }
}
