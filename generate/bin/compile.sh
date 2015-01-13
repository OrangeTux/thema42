#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd "$DIR/.."

mkdir .compiled/ 2> /dev/null

./node_modules/.bin/jade < chapters/cover.jade > .compiled/cover.html
./node_modules/.bin/jade --obj "{index: $(node bin/toc2json.js)}" < document.jade > .compiled/document.html

wkhtmltopdf \
	--dump-outline .compiled/toc.xml \
	--user-style-sheet assets/style.css \
	--margin-top 25mm \
	--margin-right 15mm \
	--margin-bottom 20mm \
	--margin-left 15mm \
	--header-html includes/header.html \
	--footer-html includes/footer.html \
	cover \
	.compiled/cover.html \
	.compiled/document.html \
	Document.pdf
