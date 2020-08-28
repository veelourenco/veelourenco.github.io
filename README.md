# veelourenco.github.io
Public website

## Setting Up

For MacOS Catalina:

*   Ruby is already included - no need to install

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

    You can customize the content by passing tbe following parameters:

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

    You can customize the content by passing tbe following parameters:

    *   `type` (required): Content type e.g. `album`, `track`
    *   `size`: The size `compact` (default 300x80) or `large` (300x380)
    *   If you want a custom size:
        *   `width`: The width
        *   `height`: The height

*   This is a Spotify follow button, get the `artistid`:

    `{% include spotifyfollow.html artistid="6sFIWsNpZYqfjUpaCgueju" %}`

    You can customize the content by passing tbe following parameters:

    * `artistid` (required): The artistid