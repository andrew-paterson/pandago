## Config

In the consuming app, add the following in your config file.

    theme: 
      - **YOUR_CUSTOM_THEME**
      - github.com/andrew-paterson/pandago

    module:
      imports:
        - path: github.com/andrew-paterson/hugo-sundries
          disabled: false
          mounts:
            - source: partials
              target: layouts/partials/hugo-sundries
            - source: shortcodes
              target: layouts/shortcodes/hugo-sundries
            - source: js
              target: assets/js/hugo-sundries
            - source: scss
              target: assets/scss/hugo-sundries

The following site params can optionally be set in the site config

    params:
      default_open_graph_image: **PATH RELATIVE TO SITE ROOT** # Should be 1200px x 630px
      body_classes: **Classes to be added to the body element on every page
      image_dir: **PATH_TO_DIR_FOR_RESPONSIVE_IMAGES** # default /images
      responsive_image_dir: **PATH_TO_DIR_FOR_RESPONSIVE_IMAGES** # default /responsive-images

Note that you only need `- **YOUR_CUSTOM_THEME** if you intend to customise the pangado theme.
## Site Logo

Cretae a partial at `**YOUR_CUSTOM_THEME**/layouts/partials/logo.html` and add the log there. This can be an externally loaded or inline svg, or an image.

## Footer data

Create a file at `/data/footer.yml`, which will populate the footer at the very bottom of the layout.

Copyright is an object with `text` required - displays after a copyright symbol and the current year.

Items is an array of objects. 

* Each item must have `text`.
* Each item may have a url or a type
  * `type` can be either `email` or `phone`. When set it creates the corresponding type of link.
  * `url` will wrap the text in a linkt to the url specified.

```
copyright:
  text: **COPYRIGHT TEXT**
  url: // optional - links the text to this url.
items:
- text: info@example.com
  type: email
- text: +55 555 5555
  type: phone
- text: Created by Company
  url: https://company.com
```

## Social media data

Create a file at `/data/social.yml` which will gneerate the linked social media icons at the bottom of the layout.

The file must contain an array of objects, each with `platform` and `url`.

```
- platform: twitter
  url: https://twitter.com
- platform: instagram
  url: https://instagram.com
```
## General layout additions

To add layout elements of the basic site layout, without having to override the default base layout from the pandago theme, you can cretae any of the following partials:

    **YOUR_CUSTOM_THEME**/layouts/partials/body-append.html
    **YOUR_CUSTOM_THEME**/layouts/partials/body-prepend.html
    **YOUR_CUSTOM_THEME**/layouts/partials/footer-append.html
    **YOUR_CUSTOM_THEME**/layouts/partials/footer-prepend.html
    **YOUR_CUSTOM_THEME**/layouts/partials/head-append.html
    **YOUR_CUSTOM_THEME**/layouts/partials/header-append.html
    **YOUR_CUSTOM_THEME**/layouts/partials/header-prepend.html
    **YOUR_CUSTOM_THEME**/layouts/partials/panels-append.html

Below is an outline of where in the base layout they will display
   
    <head>
      ...
      {{ partial "head-append.html" . }}
    </head>
    <body>
      {{ partial "body-prepend.html" . }}
      <div id="wrapper">
        <div class='panels'>
          <header>
            <div class="container">
              {{ partial "pandago/header-prepend.html" . }}
              ...
              {{ partial "logo.html" . }}
              ...
              {{ partial "pandago/header-append.html" . }}
            </div>
          </header>
          ...
          {{ partial "home-panels-append.html" . }}
          {{ partial "panels-append.html" . }}
        </div>
        <footer>
          {{ partial "footer-prepend.html" . }}
          ...
          {{ partial "footer-append.html" . }}
        </footer>
      </div>
      {{ partial "body-append.html" . }}
    </body>

## Home page content

To customise the content on the home page, add your content to a partial at `**YOUR_CUSTOM_THEME**/layouts/partials/home-panels.html`. 

Note that this will replace the existing default home page content.

## Header classes

Note that the following classes can be added to the `body` element to set the behavious of the header.

    .header-fixed // The header will remain fixed to the top of the screen when the user scrolls, at all screen sizes.
    .desktop-header-fixed // The header will remain fixed to the top of the screen when the user scrolls, at a viewport width of 980px and above. 
    .mobile-header-fixed // The header will remain fixed to the top of the screen when the user scrolls, at a viewport width of 979px and below.
    .header-overlay // Only relevant whent he header is fixed. Causes the hader to cover the elements underneath it when the page loads. If not set, the elements will appear below the header on page load, and only slide underneath it whe the user scrolls.
    .header-bg-transparent // Forces the header to be transparent 
    .header-bg-start-transparent // Forces the header to be transparent until the user scrolls

## Header SCSS variables

### All screen widths

The following settings will be overriden if the desktop or mobile specific vars below are set.

    $dynamic-header-height: 70px; // Height of the header after user scrolls.
    $dynamic-header-initial-height: 100px; // Height of the header when the page loads.

### Desktop specific

Applies wheh the screen is 980px or wider

    $dynamic-header-desktop-height
    $dynamic-header-desktop-initial-height
    $desktop-logo-spacing-y // Space above and below the logo
### Mobile specific

Applies wheh the screen is 979 or narrower

    $dynamic-header-mobile-height
    $dynamic-header-mobile-initial-height
    $mobile-logo-spacing-y // Space above and below the logo


## Content list page params

The following settings apply to the `_index.md` page of a content section using the default `list.html` template.

`page_size` 

`sort_by` name of the param to sort items by.
`reverse_order` set to `true` to reverse the ordering.

The number of itmes per page for contet lists. Defaults to 20. 
## Content item params

These apply to any content files in the `/content` folder of the site.

`panp_page_banner`

Path to image to display in the top panel of the screen at above 600px (Recommended dimensions 1920 x 590)

`page_banner_for_small_screens`

Path to image to display in the top panel of the screen at 600px and below (Recommended dimensions 4:3)

`pageclass`

Classes to be added to the body element on this page.

`meta_description`

Added to the `head` element as the meta description for the page.

`sidebar_partials`
  
An array pf paths to partials to display in the sidebar of a page. Note that any sidebar partials listed in the `_index.md` page for a content section will also display in the single pages of that section. 

`open_graph_image`

A path to an image to use as the open graph image for the page (Should be 1200px x 630px).
## Custom JavaScript

Include custom Javascript in a file at `YOUR_CUSTOM_THEME/assets/js/site-specific.js`.
This will be appended to the basic theme JS, and will be transpiled by Babel.

## SCSS classes API
## Page panels

Adding the class `panel` to any section of a page defines the element as a full screen width panel, with the inner content vertically and horizontally centeed, and with top and bottom padding.

.min-height-100vh
.dark-bg
### Padding and margin

    .padding-sm .padding-x-sm .padding-y-sm .padding-top-sm .padding-bottom-sm .padding-left-sm .padding-right-sm 
    .padding-md .padding-x-md .padding-y-md .padding-top-md .padding-bottom-md .padding-left-md .padding-right-md 
    .padding-lg .padding-x-lg .padding-y-lg .padding-top-lg .padding-bottom-lg .padding-left-lg .padding-right-lg 
    .padding-xl .padding-x-xl .padding-y-xl .padding-top-xl .padding-bottom-xl .padding-left-xl .padding-right-xl 
    .padding-0
    .margin-sm .margin-x-sm .margin-y-sm .margin-top-sm .margin-bottom-sm .margin-left-sm .margin-right-sm 
    .margin-md .margin-x-md .margin-y-md .margin-top-md .margin-bottom-md .margin-left-md .margin-right-md 
    .margin-lg .margin-x-lg .margin-y-lg .margin-top-lg .margin-bottom-lg .margin-left-lg .margin-right-lg 
    .margin-xl .margin-x-xl .margin-y-xl .margin-top-xl .margin-bottom-xl .margin-left-xl .margin-right-xl 
    .margin-0
    .last-child-margin-bottom-0 // Sets margin-bottom to 0 if the element is the last child.

### Buttons

    .btn // Invokes the stabndard button styles. Can be used on any element, including buttons, anchor tags and inputs.
    .btn-outline // The oulined version of the button.

### Flexbox

    .d-flex // Sets an element to display:flex

The following classes can be added to any element with `display:flex`, to invoke the corresponding flexbox property.

    .justify-center 
    .justify-space-between 
    .justify-flex-start 
    .justify-flex-end 
    .align-center 
    .direction-column 
    .direction-row 
    .flex-wrap

The following classes can be applied to children of elements with `display:flex`.

    .flex-align-flex-start 
    .flex-grow-1 

### Card Box shadow

Adds box shadow and border effects based on material design.

    .card-box-shadow // Applies the basic effect at a depth of 1.

The following classes can be added to any element the class `card-box-shadow`, to adjust the depth.

    .card-box-shadow-level-2 
    .card-box-shadow-level-3
    .card-box-shadow-level-4
    .card-box-shadow-level-5

`.card-box-shadow-hover-effect` may also be added to any element the class `card-box-shadow`, which will cause an animation effect on hover.

### Object fit

`.object-fit-cover` sets an elemens
ts `object-fit` property to `cover`. Note that IE requires a Polyfill for this to work to the element must also have `data-object-fit="cover"` as an attribute, for object fit to be effective in IE.

## Body text

Adding the class `body-text` apply all body text related styles to the text within that elemnt and it's descendants.  
## SCSS utilities

### Variable overrides

In  `**YOUR_THEME**/assets/scss/variable-overrides.scss` you can override any of the varoiables in `pandago/assets/scss/variables`. 

Note that you do not have to use this file path if you have defined your own style.scss file. In this case, you can use any path, as long as your variable overrides occur before the files containing the variable being overriden, as per the SCSS convention.

### Flex grid mixin

    .selector {
      @include flex-grid(
        $cols:4,
        $margin: 10px,
        $media_queries:(
          'max-width:979px': (cols:3, margin: 5px),
          'max-width:480px': (cols:2)
        )
      );
    }

* $margin and $media_queries are optional arguments.
* Within the map of media queries, margin is an optional property.
* The media queries that are listred later will override earler ones.

To apply a grid layout to the standard content list template, add a `pageclass` in the `_index.md` file and then create a selctor with `.pageclass .content-list`.

#### Example

`/content/blog/_index.md`

    ---
    title: Blog
    pageclass: blog
    ---

SCSS

    .blog .content-list {
      @include flex-grid(
        $cols:4,
        $media_queries:(
          'max-width:979px': (cols:3),
          'max-width:480px': (cols:2)
        )
      );
    }
### Box shadow

The `box-shadow` function can be used with a list of any combination of the folowing types as the first arguemnt.

    top
    bottom
    left
    right
    topInset
    leftInset
    rightInset
    bottomRight

An opacity value between 0 and 1 can be passed as the second argument (default 0.16);

Examples

    div {
      box-shadow(bottomRight)
    }

    div {
      box-shadow((topInset, leftInset))
    }

    div {
      box-shadow((topInset, leftInset), 0.5)
    }

## Todo
  default/list.html
  layout class config

TODO Docs

  Completely overriding site JS, and including script bundles.
  Logo and other partial overrides
  Cutomising style.scss