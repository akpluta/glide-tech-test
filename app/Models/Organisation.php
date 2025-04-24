<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $registry
 * @property string $assignment
 * @property string $name
 * @property string|null $address
 *
 * @method static int upsert(array $items, $uniqueBy, $update = null)
 */
class Organisation extends Model
{
    protected $fillable = [
        'registry',
        'assignment',
        'name',
        'address',
    ];

    public static function findByAssigments(array $assigments)
    {

    }

    /**
     * @param string[] $assignments
     * @return Collection
     */
    public static function mapByAssignment(array $assignments): Collection
    {
        return Organisation::query()
            ->whereIn('assignment', $assignments)
            ->get()
            ->mapWithKeys(fn (Organisation $org) => [$org->assignment => $org]);
    }
}
