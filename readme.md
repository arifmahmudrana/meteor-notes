# Meteor Boilerplate

Basic react and auth setup with bootstrap4.

## Heroku Deployment

```bash
$ heroku create *****
Creating ⬢ *****... done
https://*****.herokuapp.com/ | https://git.heroku.com/******.git

$ git remote -v
heroku  https://git.heroku.com/*****.git (fetch)
heroku  https://git.heroku.com/*****.git (push)
origin  https://github.com/*****.git (fetch)
origin  https://github.com/*****.git (push)

$ heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
Buildpack set. Next release on notes-max will use https://github.com/AdmitHub/meteor-buildpack-horse.git.
Run git push heroku master to create a new release using this buildpack.

$ heroku addons:create mongolab:sandbox
Creating mongolab:sandbox on ⬢ *****... free
Welcome to mLab.  Your new subscription is being created and will be available shortly.  Please consult the mLab Add-on Admin UI to check on its progress.
Created mongolab-clear-45141 as MONGODB_URI
Use heroku addons:docs mongolab to view documentation

$ heroku config:set ROOT_URL="https://*****.herokuapp.com"
Setting ROOT_URL and restarting ⬢ notes-max... done, v4
ROOT_URL: https://******.herokuapp.com

$ meteor node -v  # update package.json "engines"
v8.11.4

$ git status
On branch master
Your branch is ahead of 'origin/master' by 11 commits.
  (use "git push" to publish your local commits)
nothing to commit, working tree clean

$ git push heroku master 

$ heroku open
```
