HD GLOBAL STUDIES

HD GLOBAL STUDIES is a website that introduces study abroad consulting services. Main features include:

- Customers can send requests for service consultation through the request form
- HD Global Studies content administrators can manage services, blogs, albums on the site
- Administrators can update login accounts

TECHNOLOGIES USED:

- ReactJS: open-source frontend Javascript. In this project, we using Vite to build
- TailwindCSS: A utility-first CSS framework packed with classes
- EmailJS: Sending email
- PHP: For server develop

CONFIGURE AND INSTALL THE RUNNING

- Requirement

* PHP >= 8.0
* MySQL/Apache (XAMPP)

1. Clone and install

- git clone https://github.com/DLoc03/HD-Global-Study.git
- cd client & admin => type the command `npm install` to install node_modules
- cd server and do the steps below:
  - Type the command `composer install`
  - Type the command `composer require vlucas/phpdotenv`
  - Type the command `composer require firebase/php-jwt`

2. Configure to running server

- In the root of folder `server`, create .env file and declare environment variables like in .env.example
  Database environment variables:

  ```
  DB_HOST (Domain for Database)
  DB_PORT (Listening port for connection of database)
  DB_NAME (Database name)
  DB_USER (Username to login and access database)
  DB_PASS (Password to login and access database)
  ```

  Default admin account (We need to provide default data for the admin account to log in to the content management page, then provide login data information for the customer. The customer can later change the account information themselves):

```
   DEFAULT_ADMIN_USER
   DEFAULT_ADMIN_PASS
```

`JWT_SECRET (JWT Secret Key): The secret string used to encode/decode JSON Web Token (JWT). Should be long, random, unpredictable string`

`BACKEND_PREFIX: For example, when i build and setup server in 'server' folder, and move it into htdocs, the value of BACKEND_PREFIX=server. So, specifies the root path (prefix) of the backend if it is not running on the root domain. If the backend runs on the root domain in production, you can let it empty`

```VITE_API_ADMIN_URL: Admin URL
   VITE_API_FE_URL: Client URL
```

`MAIL_TO (Web service email. This is the email that receives service requests from customers visiting the website and sends them to the service provider.)`

- Running server first

* Type the command `php -S ... -t public` to start the server first and create the tables in the database
* cd scripts => php seeder.php to create default data from .env file

- Running frontend:
  - Create .env file in client and admin, then and initialize the value for VITE_API_URL (Is the server URL)

* cd client => type the command `npm run dev`
* cd admin => type the command `npm run dev` and do the steps below:
  - Login with default account admin (DEFAULT_ADMIN_USER & DEFAULT_ADMIN_PASS)
  - If you want, you can change your account information in the settings.
