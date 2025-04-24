<?php
namespace App\Console\Commands;

use App\Models\Organisation;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OuiImport extends Command
{
    const DEFAULT_OUI_SOURCE = 'http://standards-oui.ieee.org/oui/oui.csv';

    protected $signature = 'app:import-oui
        {source? : file path or URL (default: ' . self::DEFAULT_OUI_SOURCE . ')}' .')}
        ';

    protected $description = 'Import/update list of organisationally unique identifiers';


    public function handle(): int
    {
        $source = $this->argument('source') ?? self::DEFAULT_OUI_SOURCE;

        $data = $this->importFromSource($source);
        if (! $data->count()) {
            return 0;
        }

        DB::transaction(function () use ($data) {
            /*
             * Clean-up no longer existing assignments
             */
            $prefixes = $data->pluck('assignment')->toArray();
            $deleted = Organisation::query()->whereNotIn('assignment', $prefixes)->delete();

            /*
             * Create new or update existing ones
             */
            $processed = Organisation::upsert(
                $data->toArray(),
                uniqueBy: ['assignment'],
                update: ['name', 'address']
            );
            $this->output->success('Processed: ' . $processed);
        });
        return 0;
    }

    protected function importFromSource(string $source): Collection
    {
        $input = @file_get_contents($source);
        if ($input === false) {
            $this->error('Could not read data from the given source: ' . $source);
        }

        $rows       = array_filter(explode("\n", $input));
        $headers    = str_getcsv(array_shift($rows));
        // Normalize headers
        $headers    = array_map(fn ($name) => Str::camel(str_ireplace('organization', '', $name)), $headers);
        $defaults   = array_fill(0, count($headers), null);

        $rows = array_map(
            fn ($row) => array_combine($headers, str_getcsv($row) + $defaults),
            $rows
        );
        return new Collection($rows);
    }
}
