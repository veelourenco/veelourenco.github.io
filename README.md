# veelourenco.github.io
Public website

## Setting Up

For MacOS Big Sur:

*   Ruby is out of date at v2.6. Use [HomeBrew](https://brew.sh/) to install v3.0.0 or later.

    ```
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    brew install rbenv ruby-build
    ```

    Update your `~/.zshrc` file with the following (and make sure that you aren't overriding the ruby `$PATH`):

    ```
    if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
    ```

    Install ruby:

    ```
    # Install Ruby
    rbenv install 3.0.0
    rbenv global 3.0.0
    ruby -v
    ```

*   Install Ruby gems:
    
    `gem install --user-install bundler jekyll`

*   Run bundle to set up project:
    
    `bundle`

> Note: see https://jekyllrb.com/docs/ for more information and other operating systems

## Usage

### Build

This will update files in the `_site` directory:

`bundle exec jekyll build`

> Note:
> It is sometimes necessary to run the following when bundles are changed:
> `bundle update && bundle install`

### Run

This will both **build** and serve the site at [http://localhost:4000/](http://localhost:4000/):

`bundle exec jekyll serve --incremental`

## Adding pages

Assuming we are adding a page called "My New Page":

*   Add a new file `mynewpage.markdown`

*   Use the properties:
    ```
    ---
    layout: bootstrap
    title: My New Page
    permalink: mynewpage
    ---
    ```

*   If you want a link to this page from the top navigation, add the page `title` and `permalink` to the `navigation` property in `_config.yml`

*   Restart the server and test

*   Add content to your new page

## Adding rich content to pages

There are several templates to include rich content in your pages in the `_includes` folder. Here are some examples:

*   To insert a YouTube video, get the videoid from YouTube. For example, https://www.youtube.com/watch?v=M7lc1UVf-VE:

    `{% include youtube.html videoid="M7lc1UVf-VE" %}`

    You can customize the content by passing the following parameters:

    *   `videoid` (required): The videoid from the YouTube URL
    *   `width`: The width
    *   `height`: The height
    *   `autoplay`: Whether the video will autoplay. `1` for yes (default), `0` for no

        > Note: Autoplay can be blocked by adblockers

    > Note: Leave out width and height for this to be responsive

*   To insert Spotify content, get the content link:

    ![Spotify links](https://developer.spotify.com/assets/select-track-link.png)

    `{% include spotify.html type="track" contentid="7xGfFoTpQ2E7fRF5lN10tr" %}`

    `{% include spotify.html type="album" contentid="1DFixLWuPkv3KT3TnV35m3" size="large" %}`

    You can customize the content by passing the following parameters:

    *   `type` (required): Content type e.g. `album`, `track`
    *   `contentid` (required): Content id
    *   `size`: The size `compact` (default 300x80) or `large` (300x380)
        > Note: If you want a custom size:
        > * `width`: The width
        > * `height`: The height

*   This is a Spotify follow button, get the `artistid`:

    `{% include spotifyfollow.html artistid="6sFIWsNpZYqfjUpaCgueju" %}`

    You can customize the content by passing the following parameters:

    * `artistid` (required): The artistid

*   To insert SoundCloud content, get the content link (embed):

    ![SoundCloud links]()

    `{% include soundcloud.html type="tracks" contentid="7xGfFoTpQ2E7fRF5lN10tr" %}`

    You can customize the content by passing the following parameters:

    *   `type` (required): Content type e.g. `playlist`, `tracks`
    *   `contentid` (required): Content id
    *   `autoplay`: `true` or `false` (default)
    *   `style`: `classic` or `visual`
        > Note: If you want a custom size:
        > * `width`: The width 
        > * `height`: The height

## Issues with Jekyll

If issues are run into with Jekyll, the site can be built as a static site and checked in by doing the following:

- add an empty `.nojekyll` file to the root of the repository
- remove the `_site` folder from `.gitignore`
- run `bundle exec jekyll build` (creating the _site folder), commit and push
- [configure](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) GitHub pages to point to the `_site` subdirectory

Jekyll can be reenabled by:

- delete the `.nojekyll` file to the root of the repository
- delete the `_site` folder from the root of the repository
- add the `_site` folder to `.gitignore`
- [configure](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) GitHub pages to point to the root directory