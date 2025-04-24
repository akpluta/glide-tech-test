<?php
namespace App\Http\Controllers\Resources;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrganisationResource;
use App\Models\Organisation;
use App\Support\MacAddress;
use Exception;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;


class OrganisationController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return OrganisationResource::collection(Organisation::all());
    }

    /**
     * @throws Exception
     */
    public function lookup(string $macAddress): array|object
    {
        $result = $this->lookupByMacAddress($macAddress);
        if (empty($result)) {
            abort(404);
        }
        return $this->lookupByMacAddress($macAddress)[0];
    }

    /**
     * @throws Exception
     */
    public function lookupMultiple(): array
    {
        return $this->lookupByMacAddress(request()->json('addresses', []));
    }

    /**
     * @param string|string[] $addresses
     * @return array
     * @throws Exception
     */
    public function lookupByMacAddress(string|array $addresses): array
    {
        if (is_string($addresses)) {
            $addresses = [$addresses];
        }
        $addresses = array_map(fn ($mac) => MacAddress::normalize($mac, ''), $addresses);
        $addresses = array_filter($addresses);

        $output = [];
        if (! empty($addresses)) {
            /*
             * Convert full MAC addresses into prefixes and find matching Organisations
             */
            $organisationsMap = Organisation::mapByAssignment(
                array_map(fn ($mac) => substr($mac, 0, 6), $addresses)
            );

            foreach ($addresses as $mac) {
                if (! MacAddress::isValid($mac)) {
                    continue;
                }

                $prefix = substr($mac, 0, 6);
                $vendor = MacAddress::isRandomised($mac)
                    ? 'Unknown - randomised address'
                    : $organisationsMap[$prefix]->name ?? 'Unknown';

                $output[] = [
                    'mac_address'   => MacAddress::normalize($mac),
                    'vendor'        => $vendor,
                ];
            }
        }
        return $output;
    }
}
