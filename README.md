Open Knowledge Button
=====================

The Open Knowledge Button is a meta-addon browser extension that provide functionalities for open annotation projects.
You can join in too! [Here how!]() TODO - add guidelines how to join.

Rationale
---------

We want to help an open eco-system to grow our communities and make life easier for our users: Instead of having multiple , possible conflicting addons, we provide one customisable extension with a combined set of features.

Our would like to motivate others to adopt the open annotation standards and enjoy a powerful extension that provides a complete solution for annotations.

Credits
-------

Build using great [BabelExt](https://github.com/honestbleeps/BabelExt) cross browser
boilerplate/library for extension development.

Building
--------

First, clone/download all of the source from GitHub.

In Windows, run `makelinks.bat` to create symlinks to extension.js - these links are not
handled by GitHub, which is why you unfortunately have to make them yourself.
**NOTE:** You may need to open a command prompt as Administrator for this batch file to
work.

In UNIX-based OSes, you can run `makelinks.sh`. Note that this will make hardlinks.

**IMPORTANT OPERA NOTE:** Note that the Opera js file has .user.js in it - that's because without this,
@include and @exclude directives will be ignored and your script will run on every page on
the internet!

**IMPORTANT SAFARI NOTE:** Safari has a "security feature" that is not documented, gives no user
feedback at all, and can be a HUGE time sink if you don't know about it!  If you have any
files in your extension directory that are symlinks, Safari will **silently** ignore them.
With Safari, a hard link will work, but a symbolic link will not.  If you made the links
yourself instead of using the batch file, and your extension is doing nothing at all in
Safari, double check that!

One last Safari quirk: if the directory does not end in ".safariextension", it will not be
recognized by Safari. Don't remove that from the name!

Loading/testing the Extension in Browsers
-----------------------------------------

### Chrome ###

- Click the wrench icon and choose Tools -> Extensions.
- Check the "Developer Mode" checkbox.
- Click "load unpacked extension" and choose the Chrome directory.
- You're good to go!
- Further Chrome development information can be found at [http://code.google.com/chrome/extensions/index.html](http://code.google.com/chrome/extensions/index.html).

### Firefox ###

- Download the Firefox Addon SDK from [https://addons.mozilla.org/en-US/developers/builder](https://addons.mozilla.org/en-US/developers/builder).
- Follow the installation instructions there, and run the appropriate activation script (i.e. bin\activate.bat in windows).
- Navigate to the Firefox directory, and type: `cfx run`.
- You're good to go!
- Further Firefox development information can be found at [https://addons.mozilla.org/en-US/developers/docs/sdk/latest/](https://addons.mozilla.org/en-US/developers/docs/sdk/latest/).

### Opera ###

- Click Tools -> Extensions -> Manage Extensions.
- Find the config.xml file in the Opera directory of the extension, and drag it to the Extensions window.
- You're good to go!
- Further Opera development information can be found at [http://dev.opera.com/addons/extensions/](http://dev.opera.com/addons/extensions/).

### Safari ###

- Click the gear icon, and choose Settings -> Preferences -> Advanced.
- Check the box that reads "Show Develop menu in menu bar".
- Click the menu button (left of the gear icon), and choose Develop -> Show Extension Builder.
- Click the + button at the bottom left, and choose "Add Extension".
- Choose the Safari.safariextension directory.
- You're good to go!
- Further Safari development information can be found at [https://developer.apple.com/library/safari/#documentation/Tools/Conceptual/SafariExtensionGuide/Introduction/Introduction.html](https://developer.apple.com/library/safari/#documentation/Tools/Conceptual/SafariExtensionGuide/Introduction/Introduction.html).
