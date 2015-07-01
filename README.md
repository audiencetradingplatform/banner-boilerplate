#atp banners
##banner ads boilerplate

Local setup and dev
```
$ sudo npm install
$ grunt build
```

And then...
```
$ grunt watch
```
to keep track of changes

All files from src folder are compiled into a single html doc in /build.

Ad network guidelines / restrictions
- 100kb max file size
- maximum of 3 loops or 30secs
- end frame with hover effects is good practice
- all ads should click through to one place defined in ```var clickTag = ```
