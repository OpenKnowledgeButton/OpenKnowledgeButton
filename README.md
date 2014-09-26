Open Knowledge Button
=====================

The Open Knowledge Button is a browser meta-extension that provides functionalities for multiple open knowledge projects.
View and contribute to the web's growing layer of open knowledge via AnnotateIt, Hypothes.is, Knownodes, PeerLibrary, and others.

How about adding your project as well? [Here's how!]() _TODO: add guidelines about how to join._

Rationale
---------

We want to create an open ecosystem to grow our communities and make life easier for the people using open knowledge browser extensions. Instead of having multiple, possibly conflicting extensions, we provide one customizable extension with a combined set of features.

Each application has the autonomy to freely and dynamically add or modify the features supported by the Open Knowledge Button. It functions as a public domain gateway for the functionality of each app.

People should have a good experience using the tool. To balance the benefit of the diverse functionalities vs. cost of being overwhelmed by them, end-users can turn on/off functionalities that are not useful for them. As extension developers from different projects, we should try our best to see how we can work in harmony, but ultimately it will be up to the end-user to decide what functionalities he or she wants. On installation we provide a concise and user-friendly explanation of the customization functions.

We hope this initiative motivates others to adopt the open knowledge standards and enjoy a powerful extension that provides a complete solution for growing a collaborative layer of open knowledge.

Credits
-------

Built using the great [BabelExt](https://github.com/honestbleeps/BabelExt) cross browser boilerplate/library for extension development, and [fancy-settings](https://github.com/altryne/fancy-settings) for the 
settings interface.

Building
--------

First, clone/download all of the source from GitHub. To update fancy-settings, run `git submodule update --init`. Then run `makelinks.sh`. Note that this will make hardlinks.

### Safari Notes ###

Safari has a "security feature" that is not documented, gives no user
feedback at all, and can be a **huge** time sink if you don't know about it!  If you have any
files in your extension directory that are symlinks, Safari will **silently** ignore them.
With Safari, a hard link will work, but a symbolic link will not.  If you made the links
yourself instead of using the batch file, and your extension is doing nothing at all in
Safari, double check that!

If the directory does not end in ".safariextension", it will not be recognized by Safari.
Don't remove that from the name!

Loading/testing the Extension in Browsers
-----------------------------------------

### Chrome ###

- Click the wrench icon and choose Tools -> Extensions.
- Check the "Developer Mode" checkbox.
- Click "load unpacked extension" and choose the Chrome directory of this repository.
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
