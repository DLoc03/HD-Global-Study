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

`MAIL_TO (Web service email. This is the email that receives service requests from customers visiting the website and sends them to the service provider.)`

- Running:
  - Back to root project, type the command `npm run build`, then, `dist` folder will be created, move into dist folder, copy all and move them to `htdocs` folder located in your XAMPP folder.
  - Open XAMPP Control Panel, start Apache and MySQL service, then click on the button `Admin` of Apache in XAMPP Control Panel

* Note:
  - The login account when accessing /admin will be the account you set in `DEFAULT_ADMIN_USER` & `DEFAULT_ADMIN_PASS`
