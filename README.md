# navbar
A navbar to unify the micro-frontends in use as ohmage 2.x clients.  See integration below for a brief overview.


## ohmage Integration/Installation
This codebase acts as an arbitor of frontend visits for users.  It does this by providing a default "home page" that lists the frontends available for a given deployment as well as a static page-top navbar with links to these frontends.  In addition, this navbar handles some user-related tasks: authentication, registration, password resets.  It is intended to be run at the root of your web server `/` to catch all ohmage-related requests.

### customizing available frontends
In order to customize the homepage and available frontends, a few simple models can be found at `config/`. You can override these as you wish to provide whatever lists/dropdowns/links you need.  Take a look at `config/mobilize.js` to see how we've overridden the default `config/ohmage.js` model to customize logos, available frontends and links.  Finally, you'll want to visit `config.js` at the root of this project to add a case to the `switch(location.hostname)` block to fit your hostname needs! 

## Licensing
The code in this respository is open-source and licensed under the Apache License, version 2.0. The full text of the license may be found at this link: http://www.apache.org/licenses/LICENSE-2.0.
