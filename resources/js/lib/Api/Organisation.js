import { BaseClient } from "./BaseClient.js";


export default new class Organisation extends BaseClient
{
    /**
     * Find vendor names for given collection of MAC addresses
     *
     * @param {string[]} macAddresses
     * @return {Promise}
     */
    vendorLookup(macAddresses) {
        return new Promise((resolve, reject) => {
            this.post('/organisation/lookup', { addresses: macAddresses })
                .then(({data}) => resolve(data))
                .catch(err => this.errorHandler(err, reject))
        })
    }
}
