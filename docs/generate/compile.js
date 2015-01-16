#!/usr/bin/env node

var path        = require('path');
var fs          = require('fs');
var tfm         = require('tiny-frontmatter');
var jade        = require('jade');
var slug        = require('slug');
var wkhtmltopdf = require('wkhtmltopdf');
var xml2js      = require('xml2js');
var parser      = new xml2js.Parser();
var file        = path.resolve(process.argv[2]);

if ( ! fs.existsSync(file)) {
    console.error('Invalid input file.');
    process.exit(1);
}

function toc2Index(file) {
    var pages  = [];

    if (fs.existsSync(file)) {
        var data = fs.readFileSync(file, 'ascii');

        function findItemsRecursively(holder, node) {
            if ( ! node.item) return;
            node.item.forEach(function (item) {
                if (item['$'].title) {
                    var page = {
                        title: item['$'].title,
                        page: parseInt(item['$'].page, 10),
                        subpages: []
                    };
                    holder.push(page);
                    findItemsRecursively(page.subpages, item);
                    if ( ! page.subpages.length) {
                        delete page.subpages;
                    }
                } else {
                    findItemsRecursively(holder, item);
                }
            });
        }

        parser.parseString(data, function (err, result) {
            if (err) return;
            findItemsRecursively(pages, result.outline);
        });
    }

    return pages;
}

fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    // Parse document configuraton plus data
    var parsed = tfm(data);
    var title  = parsed.attributes.title || 'Untitled Document';
    
    // Prepare
    var name         = slug(title).toLowerCase();
    var documentHTML = '';
    var options      = {};
    var config       = parsed.attributes;
    var generateDir  = path.dirname(process.argv[1]);
    var includesDir  = path.join(generateDir, 'includes');
    var compiledDir  = path.join(generateDir, '.compiled');

    // Create .compiled/ directory
    try {
        fs.mkdirSync(compiledDir);
    } catch (e) {}

    // Styling
    options.userStyleSheet = path.resolve(path.join(generateDir, 'assets', 'style.css'));
    options.marginTop      = '30mm';
    options.marginBottom   = '28mm';
    options.marginLeft     = '12mm';
    options.marginRight    = '12mm';

    // Header
    var headerFile = path.join(compiledDir, 'header.html');
    
    fs.writeFileSync(headerFile, jade.renderFile(
        path.join(includesDir, 'header.jade'),
        { config: config }
    ));

    options.headerHtml = 'file://' + headerFile;

    // Footer
    var footerFile = path.join(compiledDir, 'footer.html');
    
    fs.writeFileSync(footerFile, jade.renderFile(
        path.join(includesDir, 'footer.jade'),
        { config: config }
    ));

    options.footerHtml = 'file://' + footerFile;

    // Compile cover
    var coverFile = path.join(compiledDir, 'cover.html');

    fs.writeFileSync(coverFile, jade.renderFile(
        path.join(includesDir, 'cover.jade'),
        { config: config }
    ));

    options.cover = coverFile;
 
    // Compile index
    var tocFile = path.join(compiledDir, name + '.toc.xml');
 
    // TODO(mauvm): Concatinate multiple HTML files here. Not supported yet.
    documentHTML += jade.renderFile(
        path.join(includesDir, 'index.jade'),
        { index: toc2Index(tocFile), config: config }
    );

    options.dumpOutline = tocFile;
 
    // Compile document
    var documentFile = path.join(compiledDir, 'document.html');

    documentHTML += jade.render(
        parsed.body,
        {
            filename: file,
            basedir: path.dirname(file),
            config: config 
        }
    );

    fs.writeFileSync(documentFile, documentHTML);

    // Generate PDF
    var filename = 'Document.pdf'; // title + '.pdf'
    options.output = path.join(path.dirname(file), filename); 

    wkhtmltopdf('file://' + documentFile, options, function (code, signal) {
        if (code || signal) {
            console.error('Code: %s, signal: %s', code, signal);
            process.exit(1);
        }
    });
});

