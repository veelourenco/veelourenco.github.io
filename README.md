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
