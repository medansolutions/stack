### Development
Below guide is written for Ubuntu OS and has not been tested on other OS. But should work with minimal
changes on macOS and Windows computers.

#### Prerequisites
Installed nvm and Docker.

#### First time setup
```
nvm use
npm install
```

#### Launching projects
##### Running whole stack for a project:
```
npm run <project-name>:local
```
_Note_: If you have to run docker commands with `sudo`, in `package.json` prepend `sudo` to
`docker compose up` of the project you wish to run.

i.e.
```
"psidacta:local": "docker compose --file docker/psidacta.docker-compose.yml up --remove-orphans"
```

should become:
```
"psidacta:local": "sudo docker compose --file docker/psidacta.docker-compose.yml up --remove-orphans"
```

##### Running single app
All apps have Dockerfile so running any app is just running its container.
Apps of course can depend on other apps and/or outside services (i.e. Database), so you should already be 
familiar with what the code inside the app is doing and expecting in order to start an app in isolation.
