# Web Catechism

[Web Catechism](https://www.webcatechism.com/) is my performance-focused rebuild of the [New City Catechism](http://newcitycatechism.com/books/)'s content.

## History

This is my second version of a webapp to hold the New City Catechism's (NCC) content. I used the content freely under the very generous copyright found on the [NCC's original website](https://web-beta.archive.org/web/20161002183022/http://www.newcitycatechism.com:80/home.php) (in the "Download PDF" link).

> Copyright © 2012 by Redeemer Presbyterian Church.
> We encourage you to use and share this material freely—but please don’t charge money for it, change the wording, or remove the copyright information.

In the [first version](https://web-beta.archive.org/web/20161108165723/http://webcatechism.com/1) of Web Catechism, I built a more accessible, responsively design, offline-capable webapp for the congregation of my church as we journeyed through the NCC in a year. The source code sits at the [version 1.0.0 tag](https://github.com/benforshey/webcatechism/releases/tag/v1.0.0). Regretfully, I did not include the children's songs in that version. Having studied the NCC for a year with my family and friends, I saw a number of improvements that I could make to Web Catechism. This second version seeks to implement those improvements.

## Ideology

I'm a huge fan of The New City Catechism. Faithful study of God's word helps Christians delight in God, trust Him more, and glorify Him by the way they live. I'd like it to be available to as many people as possible—including those without reliable internet connections. I also beleive it to be a practical expression of Christ's love to build accessibly, so that those with visual impairments are not marginalized. The following goals are an aspirational expression of that ideology for Web Catechism:

* should greatly facilitate learning the NCC's content
* should be eminently usable and aesthetically pleasing
* should use current [A11Y](http://a11yproject.com/) best practices to eventually achieve [WGAC 2.0 Level AA](https://www.w3.org/WAI/WCAG20/quickref/)
* should address network frailty by using offline-first web development
* should deliver the core experience without JavaScript and deliver an enhanced experience with JavaScript
* should delive the core content without CSS3 support and deliver an enhanced experience with CSS3 support

## Contributions

I'd love to hear from you! There is most certainly something that I could be doing better. Please contact me at <hello@integrisweb.com> or [@benforshey](https://twitter.com/BenForshey). I'd hesitate to call this a road map, but my task list is below. I'll occasionaly trim old content from it.

## Task List

- [ ] address IE custom song player functionality
- [ ] set search data (search.js) and lesson titles (cta.js) up into api.webcatechism.com/; remove as import statements; expand search to scripture, commentary, and prayer
- [ ] complete captions for video files (resume at #9)
- [ ] add SC version of Alegreya for LORD (.scripture—small-caps) instead of the manual all caps that I have now
- [ ] create print stylesheet
- [x] replace answer level slider with accessible buttons (aria-label, since img)
- [x] set menu to close if document.activeElement isn't contained in menu—tabbed away from, basically
- [x] create interface for lesson list content on home page
- [x] refine search UX (result display) + accessibility (aria live, etc.)
- [x] implement keyboard navigation for lessons
- [x] set search to close conveniently
