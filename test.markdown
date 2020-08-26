---
layout: bootstrap
title: Test
permalink: /test
---

# Markdown

This is a test page. You can use **bold**, *italics*, ~~strikethrough~~.

You've already seen headers, but you can have subheadings too:

## Subheading

### Subsubheading

#### Subsubsubheading

You can add [links](http://www.google.com).

You can also add images:

![alternate image text](/images/veesd.jpg)

These images can be from other sites too, just provide the full `https` URL!

* A bulletted list
- alternative syntax 1
+ alternative syntax 2
  - an indented list item

1. An
2. ordered
3. list

Inline markup styles: 

- _italics_
- **bold**
- `code()` 
 
> Blockquote
>> Nested Blockquote 

Use two trailing spaces  
on the right  
to create linebreak tags  
 
Finally, horizontal lines
 
----
****

# Rich content

This is a test video:

{% include youtube.html videoid="M7lc1UVf-VE" %}

This is a large spotify album:

{% include spotify.html type="album" contentid="1DFixLWuPkv3KT3TnV35m3" size="large" %}

This is a compact spotify song (size is optional and compact by default):

{% include spotify.html type="track" contentid="7xGfFoTpQ2E7fRF5lN10tr" %}

This is a spotify follow button:

{% include spotifyfollow.html artistid="6sFIWsNpZYqfjUpaCgueju" %}
