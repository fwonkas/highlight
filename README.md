highlight.js
========================================

Allows for highlighting paragraphs and sentences by modifying URL's hash.  In browsers that support the "onhashchange" event, a reload of the page is not required.

Example hashes:

* \#h4 — highlights paragraph 4.
* \#h5s3 — highlights sentence 3 in paragraph 5.
* \#h2s1-4 — highlights sentences 1–4 in paragraph 2.
* \#p6 — scroll to paragraph 6.

Notes:

* Sentence detection is hard. This javascript tries to avoid some obvious pitfalls and I hope to improve it, but it's far, far from perfect.  It's not even very good, though it's better than it was.
* The <mark> tag is used to mark sentences.  If <mark> tags are already present in the text blocks, some sentence highlighting may not work right.

See highlight.html for further examples.