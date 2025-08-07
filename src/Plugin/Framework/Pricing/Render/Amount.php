<?php

declare(strict_types=1);

namespace Infrangible\CatalogProductQty\Plugin\Framework\Pricing\Render;

use FeWeDev\Base\Variables;

/**
 * @author      Andreas Knollmann
 * @copyright   2014-2025 Softwareentwicklung Andreas Knollmann
 * @license     http://www.opensource.org/licenses/mit-license.php MIT
 */
class Amount
{
    /** @var Variables */
    protected $variables;

    public function __construct(Variables $variables)
    {
        $this->variables = $variables;
    }

    public function afterHasAdjustmentsHtml(\Magento\Framework\Pricing\Render\Amount $subject, bool $result): bool
    {
        return $result || ! $this->variables->isEmpty($subject->getData('display_caption'));
    }

    public function afterGetAdjustmentsHtml(\Magento\Framework\Pricing\Render\Amount $subject, string $result): string
    {
        $displayCaption = $subject->getData('display_caption');

        if (! $this->variables->isEmpty($displayCaption)) {
            $result .= sprintf('<span class="price-caption">%s</span>', $displayCaption);
        }

        return $result;
    }
}
