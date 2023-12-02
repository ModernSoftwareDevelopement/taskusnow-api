# taskusnow-api

# Known issues and solutions

## Git Pull issue

if there is any issue as folllowed happened when pulling latest request,

```
error: cannot lock ref 'refs/remotes/origin/feature/post': is at 1259774825281e0a635a4bf0611511e934a4f765 but expected 9d78207e1eef5d2fa27787fb5ec7e6856974ee7e
From https://github.com/ModernSoftwareDevelopement/taskusnow-api
```

run this command and pull again.

```
git remote prune origin
```
