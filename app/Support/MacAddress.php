<?php
namespace App\Support;

use Exception;

class MacAddress
{
    const VALID_PATTERNS = [
        '/^[0-9A-F]{2}(:[0-9A-F]{2}){5}$/',
        '/^[0-9A-F]{2}(-[0-9A-F]{2}){5}$/',
        '/^[0-9A-F]{4}(.[0-9A-F]{4}){2}$/',
        '/^[0-9A-F]{12}$/',
    ];

    /**
     * @param string $address
     * @param string $separator
     * @return string
     * @throws Exception
     */
    public static function normalize(string $address, string $separator = ':'): string
    {
        if (! in_array($separator, [':', '-', '.', ''], true)) {
            throw new Exception('Invalid MAC address separator');
        }

        $address = strtoupper(str_replace([':', '.', '-'], '', $address));
        if ($separator === '') {
            return $address;
        }
        return implode($separator, str_split($address, $separator === '.' ? 4 : 2));
    }

    public static function isValid(string $address): bool
    {
        foreach (static::VALID_PATTERNS as $pattern) {
            if (preg_match($pattern, $address)) {
                return true;
            }
        }
        return false;
    }

    public static function isRandomised(string $address): bool
    {
        return preg_match('/^.[26AE]/i', $address);
    }
}
