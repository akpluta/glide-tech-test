# Glide - Test App

## Application setup

Install project dependencies:
```shell
composer install
npm install
```

Bundle all resources:
```shell
npm run build
```

Create the database and import the OUI data:
```shell
./artisan migrate
./artisan app:import-oui
```

Start the application and access it [here](http://127.0.0.1:8000/):
```shell
./artisan serve
```

### API
List of available endpoints:
- `GET http://127.0.0.1:8000/api/organisation` - 
  returns full information about all vendors existing in the system
- `GET http://127.0.0.1:8000/api/organisation/lookup/{mac}` -
  search for a vendor for the given MAC address
- `POST http://127.0.0.1:8000/api/organisation/lookup`
  find vendor information for multiple MAC addresses.  
  The endpoint expects a payload in JSON format: 
  ```json
  {"addresses": ["MAC_ADDR_1", "MAC_ADDR_2", ...]}
  ```
