Configuration to run the HD GLOBAL Studies project:

Client/Admin (ReactJS):
npm install
npm run dev

Server (PHP) - Running local:

1. composer install.
2. update your environment variables in .env file.
3. typing command php -S ... -t public to start the server first to create the tables in the database.
4. Run the following commands to seed default data: cd scripts -> php seeder.php.

The default admin account can be configured manually in the .env file.
"MAIL TO" is the guest email.
JWT SECRET is a string that you can declare anything, for example "hdglobal123..."
